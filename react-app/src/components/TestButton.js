import React, { useState } from 'react';

import './CSS/index.css'
import './CSS/portfolios.css'

const RefreshButton = () => {

    const [shake, setShake] = useState(false);

    const animate = () => {

        // Button begins to shake
        setShake(true);

        // Buttons stops to shake after 2 seconds
        setTimeout(() => setShake(false), 2000);

    }


    return (

        <button id='button' className={shake ? `rotate` : 'refresh-outline'} onClick={animate}>
            {/* <ion-icon name="refresh-outline" ></ion-icon> */}
            <ion-icon name="refresh-circle-outline"></ion-icon>
        </button>


    );

}

export default RefreshButton;
