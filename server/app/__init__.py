from os import environ
from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_wtf.csrf import generate_csrf
from .api import ingredients, recipes, session, users
from .config import Config
from .models import db, User
from .seeds import seed_commands

app = Flask(__name__)

app.config.from_object(Config)
app.cli.add_command(seed_commands)
app.register_blueprint(ingredients, url_prefix='/api/ingredients')
app.register_blueprint(recipes, url_prefix='/api/recipes')
app.register_blueprint(session, url_prefix='/api/session')
app.register_blueprint(users, url_prefix='/api/users')

login = LoginManager(app)
db.init_app(app)
Migrate(app, db)
CORS(app)


@login.user_loader
def load_user(id):
    return db.session.get(User, int(id))


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True
    )

    return response
