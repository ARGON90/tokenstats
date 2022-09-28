from app.models import db
from app.models.portfolio import Portfolio

def seed_portfolios():

    demo_one = Portfolio(
        user_id=1, name='Test Portfolio'
    )
    demo_two = Portfolio(
        user_id=1, name='My Second Portfolio'
    )

    db.session.add(demo_one)
    db.session.add(demo_two)

    db.session.commit()


def undo_portfolios():
  db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
  db.session.commit()
