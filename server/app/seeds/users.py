from app.models import db, User
from app.util.demo import Demo

demo = User(username=Demo.username, email=Demo.email, password=Demo.password)


def seed_user():
    db.session.add(demo)


def unseed_user():
    db.session.execute('TRUNCATE TABLE "user" RESTART IDENTITY CASCADE;')
