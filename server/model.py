from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    elo = db.Column(db.Integer, nullable=False)
    highest = db.Column(db.Integer, nullable=False)
    won = db.Column(db.Integer, nullable=True)
    lost = db.Column(db.Integer, nullable=True)
    stalemate = db.Column(db.Integer, nullable=True)

    def show(self):
        wr = (self.won*100)/(self.won + self.lost) if self.won + self.lost != 0 else 0
        return {'id': self.id, 'rank': None, 'username': self.username, 'elo': self.elo, 'highest': self.highest, 
                'won': self.won, 'lost': self.lost, 'stalemate': self.stalemate, 'win_ratio': wr, 'total': self.won + self.lost + self.stalemate}

class Games(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    player1 = db.Column(db.String(30), nullable=True)
    player2 = db.Column(db.String(30), nullable=True)
    moves = db.Column(db.String(10000), nullable=True)
    winner = db.Column(db.String(30), nullable=True)
    before1 = db.Column(db.Integer, nullable=True)
    before2 = db.Column(db.Integer, nullable=True)
    after1 = db.Column(db.Integer, nullable=True)
    after2 = db.Column(db.Integer, nullable=True)
    played = db.Column(db.String(30), nullable=True)

    def show(self):
        return {'id': self.id, 'player1': self.player1, 'player2': self.player2, 'moves': self.moves, 'winner': self.winner, 
        'before1': self.before1, 'before2': self.before2, 'after1': self.after1, 'after2': self.after2, 'played': self.played}