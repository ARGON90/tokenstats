from app.models import db
from app.models.trades import Trade


def seed_trades():

    demo_one = Trade(
        user_id=1, portfolio_id=1, token_id=1, token_name='bitcoin', trade_price=20000, amount_traded=0.5, buy='buy', total_cost=10000
    )
    demo_two = Trade(
        user_id=1, portfolio_id=2, token_id=2, token_name='ethereum', trade_price=1500, amount_traded=0.5, buy='sell', total_cost=750
    )


    db.session.add(demo_one)
    db.session.add(demo_two)

    db.session.commit()


def undo_trades():
  db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
  db.session.commit()
