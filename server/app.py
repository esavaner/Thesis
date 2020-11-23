from flask import Flask, request, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_socketio import SocketIO, join_room, leave_room, send, emit
from passlib.hash import sha256_crypt
from model import User, db
from game import Game
import random
import string

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///base.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app, cors_allowed_origins="*")
app.debug = True
app.host = 'localhost'

db.init_app(app)
with app.app_context():
    db.create_all()

CORS(app)
rooms = {}

@app.route('/login', methods=['POST'])
def login():
    print('Login', request.json)
    email = request.json['email']
    password = request.json['password']

    user = User.query.filter_by(email=email).first()

    if not user:
        print('No user in db')
        return redirect('/')
    
    if not sha256_crypt.verify(password, user.password):
        print('Wrong password')
        return redirect('/')

    return jsonify({'accessToken': '123', 'username': user.username}), 200


@app.route('/register', methods=['POST'])
def register():
    print('Register', request)
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']
    print(username, email, password)

    if User.query.filter_by(email=email).first():
        print('User in db')
        return redirect('/')
    
    hashed = sha256_crypt.hash(password)
    user = User(username=username, password=hashed, email=email)
    db.session.add(user)
    db.session.commit()
    print('User registered')
    return jsonify({'accessToken': '123', 'username': user.username}), 200


@app.route('/create', methods=['POST'])
def create_room():
    print('Creating room', request)
    new_id = ''.join(random.choices(string.ascii_lowercase + string.digits, k=6))
    rooms[str(new_id)] = Game(new_id)
    print(rooms)
    return jsonify({'room': new_id}), 200


@socketio.on('join')
def handleJoin(data):
    print(data, 'join')
    room = data['room']
    game = rooms[str(room)]
    u = game.addPlayer(data['username'])
    join_room(room)
    if u is not None:
        emit('rejoin', {'room': room, 'color': u.color}, room=room)
        if game.started:
            emit('start', {}, room=room)


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
    game.makeMove()
    if game.is_finished():
        emit('finished', {}, room=room)
    elif game.is_stalemate():
        emit('stalemate', {}, room=room)
    elif game.is_insufficient():
        emit('insufficient', {}, room=room)
    else:
        emit('moved', {board: game.}, room=room)


if __name__ == "__main__":
    socketio.run(app)