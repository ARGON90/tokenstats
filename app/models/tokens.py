from .db import db


class Token(db.Model):
    __tablename__ = "tokens"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float(precision=4), nullable=False)
    dailyVolume = db.Column(db.Float(precision=4), nullable=False)
    dailyChange = db.Column(db.Float(precision=4), nullable=False)
    marketCap = db.Column(db.Float(precision=4), nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'dailyVolume': self.dailyVolume,
            'dailyChange': self.dailyChange,
            'marketCap': self.marketCap,
        }
