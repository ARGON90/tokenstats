import React, { useEffect } from 'react';
import { useDispatch} from 'react-redux';

import { updateAllTokensThunk } from '../store/all-tokens-store';


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
