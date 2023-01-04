from os import environ


class Config:
    SECRET_KEY = environ.get('SECRET_KEY') or 'supersecretkey'
    SQLALCHEMY_DATABASE_URI = f"postgresql://{environ.get('DB_USERNAME')}:{environ.get('DB_PASSWORD')}@localhost/{environ.get('DB_DATABASE')}"
    SQLALCHEMY_ECHO = environ.get('SQLALCHEMY_ECHO') or False
