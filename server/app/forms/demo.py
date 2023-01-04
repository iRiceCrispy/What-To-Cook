from flask_wtf import FlaskForm
from wtforms import HiddenField
from wtforms.validators import ValidationError
from app.models import db, User
from app.util.demo import Demo


def validate_login(form, field):
    user = db.session.scalar(db.select(User).where(
        db.and_(User.email == Demo.email, User.username == Demo.username)))

    if not user:
        raise ValidationError('Demo user got lost in the void...')


class DemoForm(FlaskForm):
    login = HiddenField(validators=[validate_login])
