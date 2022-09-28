from app.models import db
from http.cookies import _quote
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models.portfolio import Portfolio
from app.forms.portfolio_form import PortfolioForm
from app.api.auth_routes import validation_errors_to_error_messages

portfolios_routes = Blueprint('portfolios', __name__)


@portfolios_routes.route('/')
def get_all_tokens():
    portfolios = Portfolio.query.all()
    portfolios_dict = {portfolio.id: portfolio.to_dict() for portfolio in portfolios}
    return portfolios_dict

@portfolios_routes.route('/', methods=["POST"])
@login_required
def create_review():
    form = PortfolioForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    print(data)
    if form.validate_on_submit():
        portfolio = Portfolio(
            user_id=current_user.id,
            name=data['name'],
        )

        db.session.add(portfolio)
        db.session.commit()
        return portfolio.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
