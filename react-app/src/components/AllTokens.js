import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllTokensThunk, updateAllTokensThunk } from '../store/all-tokens-store';
import Portfolios from './Portfolios';


import "./index.css"
// todo: add refresh function on the login confirmation and signup confirmation buttons

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
