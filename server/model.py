from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)

class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    player1 = db.Column(db.String(30), nullable=True)
    player2 = db.Column(db.String(30), nullable=True)
    moves = db.Column(db.String(10000), nullable=False)
    winner = db.Column(db.String(30), nullable=False)