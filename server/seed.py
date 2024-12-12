from app import app 
from models import db, User
from faker import Faker
from random import randint
faker = Faker()
with app.app_context():
    print("Deleting Customers")
    User.query.delete()

    memo = User(username="Memo", password="password")
    db.session.add(memo)
    db.session.commit()