import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllTokensThunk, updateAllTokensThunk } from '../store/all-tokens-store';
import Portfolios from './Portfolios';


import "./CSS/index.css"

//  FUNCTIONALITY
// add number constraint to forms?
// cap the amount to two decimal places

// STYLING
// search: clear dropdown on clickoff
// Trades: where to put total P/L?
// Trades: should list most recent one first?
// Holdings: make message saying "no holdings/tokens when they're empty"
// Trade: remove default trade information in the create trade form
// Edit/Delete buttons: change to ionicons, add hover
// change caret color to white for forms
// number constraint to trade forms

// TESTING
// trades: submitting trade sometimes doesn't autoupdate?
// race condition upon portfolio creation - check that out!
// dropdown menu is buggy, takes time to load
// double clicking on modals can create two trades?

// Scorecard
// DONE- Feature 4
// DONE- Auth: Deadlink when I click sign up button on the navbar, then try to click the login button on the navbar, nothing happens. This should redirect back to login form.
// ??? - Deadlink on the "New User? Sign up!" button.
// ??? - Deadlink on the "Already a User? Login!".
// ??? - Change the of "sign up" to be "login" on the login form.
// ??? - ReadMe Not Present.

// Feature 2:
// When I try to sell all my Token, it does not delete it off the portfolio.
// When I try to sell all the same Token again, it runs into an error saying I have "0 Leo Token".
// But, I can still see that I have it on my portfolio.
// Should have max constraints for large integer fields.

function AllTokens() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllTokensThunk())
  }, [dispatch])

  return (
    <>

      <div >
        <Portfolios />
      </div>

      {/* <br></br>
      {allTokens.map((token) =>
        <div key={token.id} className='flex-row col-gap-5'>
          <div>{token.name}</div>
          <div>${getDecimals(token.price)}</div>
          <div>{getDecimals(token.dailyChange)}</div>
          <div>{getDecimals(token.dailyVolume)}</div>
          <div>{getDecimals(token.marketCap)}</div>
        </div>
      )} */}
    </>
  );
}
export default AllTokens;
