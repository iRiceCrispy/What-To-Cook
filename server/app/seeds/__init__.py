from flask.cli import AppGroup
from .users import seed_user, unseed_user

seed_commands = AppGroup('seed')


@seed_commands.command('all')
def seed():
    seed_user()


@seed_commands.command('undo')
def unseed():
    unseed_user()
