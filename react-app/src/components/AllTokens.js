import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllTokensThunk, updateAllTokensThunk } from '../store/all-tokens-store';
import Portfolios from './Portfolios';


import "./CSS/index.css"

// trades: submitting trade sometimes doesn't autoupdate?
// trades: disable browser auto-fill
// delete trade: console error
// trades: switching side-bar selector takes two clicks
// trades: TVLs do not update on switching portfolios

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

      {/* <button onClick={refreshPrice}>Refresh Price</button>
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
