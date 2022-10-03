import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Holdings from './Holdings';
import Trades from './Trades';
import Portfolios from './Portfolios';


function Home() {

    return (
        <>
            <div>HOME</div>
            <Holdings />


        </>


    )
}

export default Home;
