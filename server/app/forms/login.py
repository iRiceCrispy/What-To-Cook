from flask_wtf import FlaskForm
from wtforms import HiddenField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import db, User


def validate_login(form, field):
    credential = form.data.get('credential')
    password = form.data.get('password')

    if credential and password:
        user = db.session.scalar(db.select(User).where(
            db.or_(User.email == credential, User.username == credential)))

        if not user or not user.check_password(password):
            raise ValidationError('The provided credentials were invalid.')


class LoginForm(FlaskForm):
    credential = StringField(validators=[DataRequired()])
    password = StringField(validators=[DataRequired()])
    login = HiddenField(validators=[validate_login])
