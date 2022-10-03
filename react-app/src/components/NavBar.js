
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar';

const NavBar = () => {

  const currentUser = useSelector((state) => (state?.session?.user))


  return (
    <nav>
      <div className='flex-row col-gap-5'>

        {currentUser ?

          <div className='flex-row col-gap-5'>
            <NavLink to='/home' exact={true} activeClassName='active'>
              Home
            </NavLink>

            <br></br>

            <LogoutButton />
          </div>
          :

          <div className='flex-row col-gap-5'>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>

            <br></br>

            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>

            <br></br>

            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>


            <br></br>


          </div>

        }




        {/* <NavLink to='/users' exact={true} activeClassName='active'>
          Users
        </NavLink> */}



      </div>
    </nav>
  );
}

export default NavBar;
