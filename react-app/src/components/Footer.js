
import React from 'react';
// import { useSelector } from 'react-redux';

import './CSS/index.css'

const Footer = () => {

    // const currentUser = useSelector((state) => (state?.session?.user))


    return (
        <div className='footer-page'>
            <div className='nav-container'>



                <div className='nav-logged-in'>
                    <div className='nav-left-panel'>
                        <div className='home-button-container'>
                            <div className='token'>Connect with the Dev →</div>

                            <div className='footer-spacer'></div>
                            <a className='git-linked-container' href='https://www.linkedin.com/in/alex-gonglach/' target='_blank' rel='noreferrer'>
                                <div className='tracker-div'>LinkedIn</div>
                                <ion-icon name="logo-linkedin"></ion-icon>
                            </a>

                            <div className='footer-spacer'></div>
                            <a className='git-linked-container' href='https://github.com/ARGON90' target='_blank' rel='noreferrer'>
                                <div className='tracker-div'>GitHub</div>
                                <ion-icon name="logo-github"></ion-icon>
                            </a>

                        </div>

                        <div className='nav-right-panel'>
                            <div className='logout-button-div'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Footer;
