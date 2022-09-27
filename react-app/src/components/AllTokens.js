import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllTokensThunk, updateAllTokensThunk } from '../store/all-tokens-store';

import "./index.css"

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
    console.log('ALL TOKENS USE EFFECT')
    dispatch(updateAllTokensThunk())
  }

  useEffect(() => {
    console.log('ALL TOKENS USE EFFECT')
    dispatch(getAllTokensThunk())
  }, [dispatch])

  return (
    <>
       {allTokens.map((token) =>
        <div key={token.id} className='flex-row col-gap-5'>
          <div>{token.name}</div>
          <div>${getDecimals(token.price)}</div>
          <div>{getDecimals(token.dailyChange)}</div>
          <div>{getDecimals(token.dailyVolume)}</div>
          <div>{getDecimals(token.marketCap)}</div>
        </div>
      )}
      <button onClick={refreshPrice}>Refresh Price</button>
    </>
  );
}
export default AllTokens;
