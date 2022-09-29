from app.models import db
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models.trades import Trade
from app.forms.trade_form import TradeForm
from app.api.auth_routes import validation_errors_to_error_messages

trades_routes = Blueprint('trades', __name__)


@trades_routes.route('/')
def get_all_trades():
    trades = Trade.query.all()
    trades_dict = {trade.id: trade.to_dict() for trade in trades}
    return trades_dict

@trades_routes.route('/', methods=["POST"])
@login_required
def create_portfolio():
    form = TradeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    print(data)
    if form.validate_on_submit():
        trade = Trade(
            user_id=current_user.id,
            buy=data['buy'],
            token_id=data['token_id'],
            portfolio_id=data['portfolio_id'],
            token_name=data['token_name'],
            trade_price=data['trade_price'],
            amount_traded=data['amount_traded']
        )

        db.session.add(trade)
        db.session.commit()
        return trade.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
