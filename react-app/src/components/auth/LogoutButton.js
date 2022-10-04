import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

import '../CSS/index.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <div className='logout-button' onClick={onLogout}>SIGN OUT</div>;
};

export default LogoutButton;
