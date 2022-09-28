import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserPortfoliosThunk } from '../store/portfolio-store';
import CreatePortfolioModal from './CreatePortfolioModal';
import DeletePortfolioModal from './DeletePortfolioModal';
import EditPortfolioModal from './EditPortfolioModal';

function Portfolios() {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => (state?.session?.user))
    const userId = Number(currentUser.id)
    const allPortfolios = useSelector((state) => Object.values(state?.portfolios))
    const userPortfolios = allPortfolios.filter(portfolio => portfolio.user_id === userId)

    useEffect(() => {
        dispatch(getUserPortfoliosThunk())
    }, [dispatch])

    if (!userPortfolios) return (<div>No portfolfios</div>)
    return (
        <>

            <div>My Portfolios</div>
            <CreatePortfolioModal />
            <div>
                {userPortfolios.map((portfolio) =>
                    <div key={portfolio.id} className='flex-row'>
                        <div >{portfolio.name}</div>
                        <EditPortfolioModal portfolio={portfolio}/>
                        <DeletePortfolioModal portfolio={portfolio}/>
                    </div>
                )}
            </div>

        </>
    )
}

export default Portfolios
