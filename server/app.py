from flask import Flask, request, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_socketio import SocketIO, join_room, leave_room, send, emit
from passlib.hash import sha256_crypt
from model import Users, Games, db
from game import Game
from random import choices, randint
import string

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///base.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app, cors_allowed_origins="*")
app.debug = True
app.host = 'localhost'

db.init_app(app)
with app.app_context():
    db.create_all()
    for i in range(5):
        i = str(i)
        u = Users(username=('user' + i), password='pass' + i, email=('user' + i + '@mail.com'), 
            elo=randint(500, 1500), highest=randint(1500, 2000), won=randint(0, 100), lost=randint(0, 100), stalemate=randint(0, 100))
        db.session.add(u)
    db.session.commit()

rooms = {}

@app.route('/login', methods=['POST'])
def login():
    print('Login', request.json)
    email = request.json['email']
    password = request.json['password']

    u = Users.query.filter_by(email=email).first()

    if not u:
        print('No user in db')
        return redirect('/')
    
    if not sha256_crypt.verify(password, u.password):
        print('Wrong password')
        return redirect('/')

    return jsonify(u.show()), 200


@app.route('/register', methods=['POST'])
def register():
    print('Register', request)
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']
    print(username, email, password)

    if Users.query.filter_by(email=email).first():
        print('User in db')
        return redirect('/')
    
    hashed = sha256_crypt.hash(password)
    u = Users(username=username, password=hashed, email=email, elo=1000, highest=1000, won=0, lost=0, stalemate=0)
    db.session.add(u)
    db.session.commit()
    print('User registered')
    return jsonify(u.show()), 200


@app.route('/create', methods=['POST'])
def create_room():
    print('Creating room', request)
    new_id = ''.join(choices(string.ascii_lowercase + string.digits, k=6))
    rooms[str(new_id)] = Game(new_id)
    print(rooms)
    return jsonify({'room': new_id}), 200


@app.route('/user', methods=['POST'])
def get_user():
    print('Request user', request)
    username = request.json['username']
    print(username)
    u = Users.query.filter_by(username=username).first()
    if not u:
        print('User not in db')
        return redirect('/')
    g = Games.query.filter_by(player1=username).all() + Games.query.filter_by(player2=username).all()
    print(g)
    return jsonify({'user': u.show(), 'games': g}), 200


@app.route('/users', methods=['GET'])
def get_users():
    print('Request users', request)
    users = [u.show() for u in Users.query.all()]
    users = sorted(users, key=lambda x: x['elo'], reverse=True)[:501]
    for i, y in enumerate(users):
        y['rank'] = i+1
    return jsonify(users), 200


@socketio.on('join')
def handleJoin(data):
    print(data, 'join')
    room = data['room']
    game = rooms[str(room)]
    if game.started:
        emit('reject', {}, room=room)
    u = game.addPlayer(data['username'])
    if u is not None:
        join_room(room)
        emit('rejoin', {'room': room, 'color': u.color}, room=room)
        if game.started:
            emit('start', {'playerW': game.p1.username, 'playerB': game.p2.username}, room=room)


@socketio.on('leave')
def handleLeave(data):
    print(data, 'leave')
    room = data['room']
    leave_room(room)   
    emit('left', {}, room=room)


@socketio.on('move')
def handleMove(data):
    print(data, 'move')
    room = data['room']
    game = rooms[str(room)]
    game.makeMove(data['from'] + data['to'] + data['promo'])
    if game.isFinished():
        emit('finished', {'win_type': game.win_type, 'winner': game.winner.username}, room=room)
        g = Games(player1=game.p1.username, player2=game.p2.username, moves=str(game.moves), winner=game.winner.username, 
                before1=game.p1.before, before2=game.p2.before, after1=game.p1.after, after2=game.p2.after)
        db.session.add(g)
        db.session.commit()
    else:
        emit('moved', game.show(), room=room)


if __name__ == "__main__":
    socketio.run(app)