from .db import db
from datetime import datetime


class Portfolio(db.Model):
    __tablename__ = "portfolios"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
    name = db.Column(db.String(255), nullable=False)

    user = db.relationship("User",back_populates="portfolios")
    trades = db.relationship("Trade",back_populates="portfolio", cascade="all, delete")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name
        }
