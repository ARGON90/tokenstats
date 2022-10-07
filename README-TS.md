# Welcome to TokenStats! 

![image](https://user-images.githubusercontent.com/54010874/194219531-7832e756-d86d-42e3-b22d-c5e9cd75a2b8.png)


## Application Description

TokenStats is inspired by [CoinStats](https://coinstats.app/). This app allows users to keep track of their cryptocurrency tokens and trades. It provides real-time price information and up-to-date calculations regarding a user's crypto holdings.
</br>
Check out the app by clicking [here](https://argon90-token-stats.herokuapp.com/).

## Technologies Used

* Backend
   * Python, Flask, WTForms, SQLAlchemy, Alembic

*  Frontend 
   * Javascript, React, Redux

## Useful Links:

* [TokenStats Wiki](https://github.com/ARGON90/tokenstats/wiki)
* [How-to Guide](https://github.com/ARGON90/tokenstats/wiki/How-To-Use-TokenStats)
* [Database Schema](https://github.com/ARGON90/tokenstats/wiki/Database-Schema)




## TokenStats Feature List

To get more information about the features of this app, click [here](https://github.com/ARGON90/tokenstats/wiki/Feature-List/)


### User Authentication 
* Allows users to create an account, log in to an existing account, or continue as a "Demo User" for easy access to the app.


### Portfolios
* A user's holdings and trades are filed into a portfolio. 
* Each portfolio's holdings and trades can be viewed separately, or information related to all of a user's portfolios can be found under the "All Assets" tab


### Trades
* A user's trades are listed under the 'trades' tab.
* Profit and Loss of each trade is calculated and a total profit/loss is displayed at the bottom of the page


### Tokens
* All token price information is listed on the sign in page for a user who is not logged in/
* For a logged-in user, Token Price information can be found be clicking "See All Tokens" in the Navigation Bar.


### Real-Time Price Information
* Price information is retrieved [CoinGecko](https://coingecko.com), which provides a free API.


### Search
* In the "Add a Transaction" form, a search bar is implented for finding a token that a user wants to trade 


