from flask import Flask, request, redirect
from flask_sqlalchemy import SQLAlchemy
from passlib.hash import sha256_crypt
from model import db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///base.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

@app.route('/login', methods=['POST'])
def login():
    print('Login', request.json)
    username = request.json['username']
    email = request.json['email']
    password = request.json['username']

    user = User.query.filter_by(email=email).first()

    if not user:
        print('No user in db')
        return redirect('/')
    
    if not sha256_crypt.verify(password, user.password):
        print('Wrong password')
        return redirect('/')

    return redirect('/')


@app.route('/register', methods=['POST'])
def register():
    print('Register', request)
    username = request.json['username']
    email = request.json['email']
    password = request.json['username']
    print(username, email, password)

    if User.query.filter_by(email=email).first():
        print('User in db')
        return redirect('/')
    
    hashed = sha256_crypt.hash(password)
    user = User(username=username, password=hashed, email=email)
    db.session.add(user)
    db.session.commit()
    print('User registered')
    return redirect('/')

@app.teardown_appcontext
def shutdown_session(exception=None):
    db.remove()

if __name__ == "__main__":
    app.run(debug=True)