import chess
import math
from model import Users, db

class Player:
    def __init__(self, username, color):
        u = Users.query.filter_by(username = username).first()
        if u:
            self.before = u.elo
        else:
            self.before = 1000
        self.username = username
        self.after = None
        self.color = color

class Game:
    def __init__(self, room):
        self.room = room
        self.board = chess.Board()
        self.moves = []
        self.p1 = None
        self.p2 = None
        self.started = False
        self.finished = False
        self.turn = 'white'
        self.winner = None
        self.looser = None
        self.win_type = None

    def show(self):
        return {'board': str(self.board).replace('↵', '\n'), 'turn': self.turn, 'moves': self.moves }

    def makeMove(self, move):
        if self.started:
            m = chess.Move.from_uci(str(move))
            if m in self.board.legal_moves:
                self.board.push(m)
                self.moves.append(str(move))
                self.turn = 'black' if self.turn == 'white' else 'white'
        return self.board

    def addPlayer(self, username):
        u = None
        if self.p1 is None:
            self.p1 = u = Player(username, 'white')
        elif self.p2 is None:
            self.p2 = u = Player(username, 'black')
            self.started = True
        return u

    def isFinished(self):
        if self.board.is_game_over() or self.board.is_stalemate() or self.board.is_insufficient_material():
            u1 = Users.query.filter_by(username=self.p1.username).first();
            u2 = Users.query.filter_by(username=self.p2.username).first();
            K = 32
            r1 = pow(10, self.p1.before/400)
            r2 = pow(10, self.p2.before/400)
            e1 = r1 / (r1 + r2)
            e2 = r2 / (r1 + r2)
            if self.board.is_game_over():
                self.win_type = 'normal'
                s1 = 1 if self.turn == 'black' else 0
                s2 = 1 if self.turn == 'white' else 0
                self.winner = u1 if self.turn == 'black' else u2
                self.looser = u1 if self.turn == 'white' else u2
                if self.winner:
                    self.winner.won = self.winner.won + 1
                if self.looser:
                    self.looser.lost = self.looser.lost + 1
            elif self.board.is_stalemate() or self.board.is_insufficient_material():
                self.win_type = 'stalemate'
                s1 = 0.5
                s2 = 0.5
                if u1:
                    u1.stalemate = u1.stalemate + 1
                if u2:
                    u2.stalemate = u2.stalemate + 1
            if u1:
                u1.elo = math.floor(self.p1.before + K*(s1 - e1))
                self.p1.after = u1.elo
                if u1.highest < u1.elo:
                    u1.highest = u1.elo
            if u2:
                u2.elo = math.floor(self.p2.before + K*(s2 - e2))
                self.p2.after = u2.elo
                if u2.highest < u2.elo:
                    u2.highest = u2.elo

            db.session.commit()
            return True
        return False