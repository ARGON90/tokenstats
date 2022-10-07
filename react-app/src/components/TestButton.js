import React, { useState } from 'react';

import './CSS/index.css'
import './CSS/portfolios.css'

const RefreshButton = () => {

    const [rotate, setRotate] = useState(false);

    const animate = () => {
        setRotate(true);
        setTimeout(() => setRotate(false), 2000);

    }


    return (

        <button id='button' className={rotate ? `rotate` : 'refresh-outline'} onClick={animate}>
            <ion-icon name="refresh-circle-outline"></ion-icon>
        </button>


    );

}

export default RefreshButton;
