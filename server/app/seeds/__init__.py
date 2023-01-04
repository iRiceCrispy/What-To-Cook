from flask.cli import AppGroup
from app.models import db
from .ingredients import seed_ingredient, unseed_ingredient
from .users import seed_user, unseed_user

seed_commands = AppGroup('seed')


@seed_commands.command('all')
def seed():
    seed_user()
    seed_ingredient()
    db.session.commit()


@seed_commands.command('undo')
def unseed():
    unseed_user()
    unseed_ingredient()
    db.session.commit()
