from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, EqualTo, ValidationError
from app.models import db, User


def email_exists(form, field):
    email = field.data
    user = db.session.scalar(db.select(User).where(User.email == email))

    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    username = field.data
    user = db.session.scalar(db.select(User).where(User.username == username))

    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(validators=[DataRequired(), username_exists])
    email = StringField(validators=[DataRequired(), Email(), email_exists])
    password = StringField(validators=[DataRequired()])
    confirm_password = StringField(
        validators=[DataRequired(), EqualTo('password')])
