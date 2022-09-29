from flask_wtf import FlaskForm
from wtforms.fields import (
     IntegerField, StringField, BooleanField, DecimalField
)
from wtforms.validators import DataRequired



class TradeForm(FlaskForm):
    portfolio_id = IntegerField("port id", validators=[DataRequired()])
    user_id = IntegerField("user id", validators=[DataRequired()])
    token_id = IntegerField("token id", validators=[DataRequired()])
    token_name = StringField("token name", validators=[DataRequired()])
    trade_price = DecimalField("trade price", validators=[DataRequired()])
    amount_traded = DecimalField("amt traded", validators=[DataRequired()])
    buy = StringField("buy", validators=[DataRequired()])
