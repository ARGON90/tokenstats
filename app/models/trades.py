from .db import db


class Trade(db.Model):
    __tablename__ = "trades"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
    portfolio_id = db.Column(db.Integer, db.ForeignKey("portfolios.id", ondelete='CASCADE'), nullable=False)
    token_id = db.Column(db.Integer, db.ForeignKey("tokens.id", ondelete='CASCADE'), nullable=False)
    token_name = db.Column(db.String(255), nullable=False)
    trade_price = db.Column(db.Float(precision=4), nullable=False)
    amount_traded= db.Column(db.Float(precision=4), nullable=False)
    total_cost= db.Column(db.Float(precision=4), nullable=False)
    buy = db.Column(db.String, nullable=False)

    user = db.relationship("User",back_populates="trades")
    portfolio = db.relationship("Portfolio",back_populates="trades")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'portfolio_id': self.portfolio_id,
            'token_id': self.token_id,
            'token_name': self.token_name,
            'trade_price': self.trade_price,
            'amount_traded': self.amount_traded,
            'buy': self.buy,
            'total_cost': self.total_cost
        }
