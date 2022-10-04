
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar';

import './CSS/index.css'

const NavBar = () => {

  const currentUser = useSelector((state) => (state?.session?.user))


  return (
    <div className='nav-page'>
      <div className='nav-container'>

        {currentUser ?

          <div className='nav-logged-in'>
            <div className='nav-left-panel'>
              <NavLink className={'home-button-container'} to='/home' exact={true} activeClassName='active'>
                <div className='token'>Token</div>
                <div className='stats'>Stats</div>
              </NavLink>

              <NavLink className={'portfolio-tracker'} to='/home' exact={true} activeClassName='active'>
                <div className='tracker-div'>Portfolio Tracker</div>
              </NavLink>
            </div>

            <div className='nav-right-panel'>
              <div className='logout-button-div'>
                <LogoutButton />
              </div>
            </div>
          </div>
          :

          <div className='nav-logged-out'>

            <NavLink className='home-button-container' to='/home' exact={true} activeClassName='active'>
              <div className='token'>Token</div>
              <div className='stats'>Stats</div>
            </NavLink>


            <NavLink className={'signup-login-buttons'} to='/sign-up' exact={true} activeClassName='active'>
              SIGN UP
            </NavLink>

            <NavLink className={'signup-login-buttons'} to='/login' exact={true} activeClassName='active'>
              LOG IN
            </NavLink>

          </div>

        }




        {/* <NavLink to='/users' exact={true} activeClassName='active'>
          Users
        </NavLink> */}



      </div>
    </div >
  );
}

export default NavBar;
