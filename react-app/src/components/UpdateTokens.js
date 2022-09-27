import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllTokensThunk, updateAllTokensThunk } from '../store/all-tokens-store';


import "./index.css"

function UpdateTokens() {
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('ALL TOKENS USE EFFECT')
        dispatch(updateAllTokensThunk())
      }, [dispatch])

    return (
        <h1>hi</h1>
    )

}

export default UpdateTokens;
