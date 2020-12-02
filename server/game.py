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
        self.turn = 'white'

    def makeMove(self, move):
        m = chess.Move.from_uci(str(move))
        if m in self.board.legal_moves:
            self.board.push(m)
            self.moves.append(str(move))
            self.turn = 'black' if self.turn == 'white' else 'white'
        return self.board

    def addPlayer(self, user):
        u = None
        if self.p1 is None:
            self.p1 = u = Player(user, 'white')
        elif self.p2 is None:
            self.p2 = u = Player(user, 'black')
            self.started = True
        return u

    def getBoard(self):
        return str(self.board).replace('↵', '\n')

    def isFinished(self):
        return self.board.is_game_over()

    def isStalemate(self):
        return self.board.is_stalemate()

    def isInsufficient(self):
        return self.board.is_insufficient_material()