
from flask_wtf import FlaskForm
from wtforms.fields import (
    TextAreaField, DateTimeField, IntegerField, StringField
)
from wtforms.validators import DataRequired
from datetime import datetime


class UpdateToken(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    price = IntegerField("Book Id", validators=[DataRequired()])
