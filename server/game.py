import chess

class Player:
    def __init__(self, username, color):
        self.username = username
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

    def makeMove(self, move):
        m = chess.Move.from_uci(str(move))
        self.board.push(m)
        self.moves.append(m)

    def addPlayer(self, user):
        u = None
        if self.p1 is None:
            self.p1 = u = Player(user, 'white')
        elif self.p2 is None:
            self.p2 = u = Player(user, 'black')
            self.started = True
        return u