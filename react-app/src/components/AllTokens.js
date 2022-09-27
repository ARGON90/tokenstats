import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllTokensThunk } from '../store/all-tokens-store';

import "./index.css"

function AllTokens() {
  const dispatch = useDispatch()

  const allTokens = useSelector((state) => (state?.tokens))

  let allTokensArr = []
  for (let token in allTokens) {
    let obj = {}
    console.log(allTokens[token].usd)
    obj.name = token
    obj.price = allTokens[token].usd
    obj.dailyChange = allTokens[token].usd_24h_change
    obj.dailyVolume = allTokens[token].usd_24h_vol
    obj.marketCap = allTokens[token].usd_market_cap
    allTokensArr.push(obj)
  }

  const getDecimals = (num) => {
    let str = num.toString()
    let array = str.split('.')
    if (array[0].length > 3) {
      return array[0]
    } else {
      return num.toFixed(2)
    }
  }

  useEffect(() => {
    console.log('ALL TOKENS USE EFFECT')
    dispatch(getAllTokensThunk())
  }, [dispatch])

  return (
    <>
      {allTokensArr.map((token) =>
        <div key={token.name} className='flex-row col-gap-5'>
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
