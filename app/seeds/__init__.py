from flask.cli import AppGroup
from .users import seed_users, undo_users
from .tokens import seed_tokens, undo_tokens
from .portfolios_seed import seed_portfolios, undo_portfolios
from .holdings_seed import seed_holdings, undo_holdings
from .trades_seed import seed_trades, undo_trades
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_tokens()
    seed_portfolios()
    seed_holdings()
    seed_trades()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_tokens()
    undo_portfolios()
    undo_holdings()
    undo_trades
    # Add other undo functions here
