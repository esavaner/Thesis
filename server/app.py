from flask import Flask, request, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from passlib.hash import sha256_crypt
from model import User, db

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///base.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
with app.app_context():
    db.create_all()

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

    return jsonify({'accessToken': '123'}), 200


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
    return jsonify({'accessToken': '123'}), 200

if __name__ == "__main__":
    app.run(debug=True)