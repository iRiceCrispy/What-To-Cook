from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user
from app.models import db, User
from app.forms import DemoForm, LoginForm, SignUpForm
from app.util.demo import Demo

session = Blueprint('session', __name__)


@session.route('')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return {'user': current_user.to_dict()}
    else:
        return {'user': None}


@session.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    form.csrf_token.data = request.cookies.get('csrf_token')

    if form.validate_on_submit():
        credential = form.data.get('credential')

        user = db.session.scalar(db.select(User).where(
            db.or_(User.username == credential, User.email == credential)))

        login_user(user)

        return {'user': user.to_dict()}
    else:
        return {'errors': form.errors}, 401


@session.route('/demo', methods=['POST'])
def demo():
    """
    Logs in as demo user
    """
    form = DemoForm()
    form.csrf_token.data = request.cookies.get('csrf_token')

    if form.validate_on_submit():
        user = db.session.scalar(db.select(User).where(
            db.and_(User.email == Demo.email, User.username == Demo.username)))

        login_user(user)

        return {'user': user.to_dict()}
    else:
        return {'errors': form.errors}, 401


@session.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form.csrf_token.data = request.cookies.get('csrf_token')

    if form.validate_on_submit():
        user = User(
            username=form.data.get('username'),
            email=form.data.get('email'),
            password=form.data.get('password')
        )

        db.session.add(user)
        db.session.commit()

        login_user(user)

        return {'user': user.to_dict()}
    else:
        return {'errors': form.errors}, 401


@session.route('', methods=['DELETE'])
def logout():
    """
    Logs a user out
    """
    logout_user()

    return {'message': 'User logged out'}
