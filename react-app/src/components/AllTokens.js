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

// STYLING
//Navbar - put tokens at the top?
//Trades: where to put total P/L?
//Trades: should list most recent one first?
//Holdings: make message saying "no holdings/tokens when they're empty"
//Trade: remove default trade information in the create trade form
//Edit/Delete buttons: change to ionicons, add hover






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
