# from .db import db
# from datetime import datetime


# class Holdings(db.Model):
#     __tablename__ = "holdings"

#     id = db.Column(db.Integer, primary_key=True, nullable=False)
#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
#     portfolio_id = db.Column(db.Integer, db.ForeignKey("portfolios.id"), nullable=False)
#     token_id = db.Column(db.Integer, nullable=False)
#     token_name = db.Column(db.String(255), nullable=False)
#     token_amount = db.Column(db.Integer, nullable=False)


#     def to_dict(self):
#         return {
#             'id': self.id,
#             'user_id': self.user_id,
#             'portfolio_id': self.portfolio_id,
#             'token_id': self.token_id,
#             'token_name': self.token_name,
#             'token_amount': self.token_amount
#         }
