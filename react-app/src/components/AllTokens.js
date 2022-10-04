import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllTokensThunk, updateAllTokensThunk } from '../store/all-tokens-store';
import Portfolios from './Portfolios';


import "./CSS/index.css"

// trades: submitting trade sometimes doesn't autoupdate?
// trades: disable browser auto-fill
// delete trade: still getting console error for state update on unmounted component
// trades: should list most recent one first?
// favicons
// readme
// error handling
// javascript method for to localstring us (1 arg, other arg would be style, USD)
// delete portfolio doesn't work on heroku
// delete trade not working for on cascade deleting a portfio
// add trade not working with small decimals
// remove 'required' from forms
// race condition upon portfolio creation - check that out!
// tokens and holdings: make message saying "no holdings/tokens when they're empty"
// search - clear dropdown on clickoff
// trades current value on refresh: too many decimals (try bitcoin to see it)

function AllTokens() {
  const dispatch = useDispatch()
  const allTokens = useSelector((state) => Object.values(state?.tokens))

  const getDecimals = (num) => {
    let str = num.toString()
    let array = str.split('.')
    if (array[0].length > 3) {
      return array[0]
    } else {
      return num.toFixed(2)
    }
  }

  function refreshPrice() {
    dispatch(updateAllTokensThunk())
  }

  useEffect(() => {
    dispatch(getAllTokensThunk())
  }, [dispatch])

  return (
    <>

      <br></br>

      <div>
        <Portfolios />
      </div>

      <br></br>

      <button onClick={refreshPrice}>Refresh Price</button>
      {allTokens.map((token) =>
        <div key={token.id} className='flex-row col-gap-5'>
          <div>{token.name}</div>
          <div>${getDecimals(token.price)}</div>
          <div>{getDecimals(token.dailyChange)}</div>
          <div>{getDecimals(token.dailyVolume)}</div>
          <div>{getDecimals(token.marketCap)}</div>
        </div>
      )}
    </>
  );
}
export default AllTokens;
