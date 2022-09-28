import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserHoldingsThunk } from '../store/holdings-store';


function Holdings() {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => (state?.session?.user))
    const userId = Number(currentUser.id)
    const allHoldings = useSelector((state) => Object.values(state?.holdings))
    const userHoldings = allHoldings.filter(holdings => holdings.user_id === userId)

    useEffect(() => {
        dispatch(getUserHoldingsThunk())
    }, [dispatch])

    // if (!userPortfolios) return (<div>No portfolfios</div>)
    return (
        <>
        <div>My Holdings</div>
        {userHoldings.map((holding) =>
            <div key={holding.id}>
                <div>{holding.token_amount} {holding.token_name}</div>

            </div>
        )}

        </>
    )
}

export default Holdings
