from model import db

db.reflect()
db.drop_all()
db.create_all()

print('DB clear')