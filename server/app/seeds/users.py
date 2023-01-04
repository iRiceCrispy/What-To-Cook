from app.models import db, User
from app.util.demo import Demo


def seed_user():
    demo = User(
        username=Demo.username,
        email=Demo.email,
        password=Demo.password
    )

    db.session.add(demo)
    db.session.commit()


def unseed_user():
    db.session.execute('TRUNCATE TABLE "user" RESTART IDENTITY CASCADE;')
    db.session.commit()
