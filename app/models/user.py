from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    holdings = db.relationship("Holdings",back_populates="user")
    portfolios = db.relationship("Portfolio",back_populates="user")
    trades = db.relationship("Trade",back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        holdingsList = [holding.to_dict() for holding in self.holdings]
        portfoliosList = [portfolio.to_dict() for portfolio in self.portfolios]
        tradesList = [trade.to_dict() for trade in self.trades]
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'holdings': holdingsList,
            'portfolios': portfoliosList,
            'trades': tradesList
        }
