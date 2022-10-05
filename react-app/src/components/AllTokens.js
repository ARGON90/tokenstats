import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllTokensThunk, updateAllTokensThunk } from '../store/all-tokens-store';
import Portfolios from './Portfolios';


import "./CSS/index.css"

// FUNCTIONALITY
// readme
// update wiki
// delete portfolio doesn't work on heroku
// search: clear dropdown on clickoff
// add a 404
// double clicking on modals can create two trades - disable that!
// for enter a trade: change the prompt or place holder to let user know to type
// current value for trades will require localestring
// dropdown menu is buggy, takes time to load
// submitting invalid token

// STYLING
//Navbar - put tokens at the top?
//Trades: where to put total P/L?
//Trades: should list most recent one first?
//Holdings: make message saying "no holdings/tokens when they're empty"
//Trade: remove default trade information in the create trade form
//Edit/Delete buttons: change to ionicons, add hover
// change caret color to white for forms
// amount should be comma-separated
// show error handling on login
// add message for select one portfolio if not selectedset
// set default to splash to render all 3 buttons
// number constraint to trade forms




// TESTING
// trades: submitting trade sometimes doesn't autoupdate?
// race condition upon portfolio creation - check that out!



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
