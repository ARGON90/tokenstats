from app.models import db
from app.models.holdings import Holdings


def seed_holdings():

    # demo_one = Holdings(
    #     user_id=1, portfolio_id=1, token_id=1, token_name='bitcoin', token_amount=1
    # )
    # demo_two = Holdings(
    #     user_id=1, portfolio_id=2, token_id=2, token_name='ethereum', token_amount=2
    # )


    # db.session.add(demo_one)
    # db.session.add(demo_two)

    db.session.commit()


def undo_holdings():
  db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
  db.session.commit()
