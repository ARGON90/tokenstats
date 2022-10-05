import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
// import { useSelector } from 'react-redux';

import AllTokens from './components/AllTokens'
import UpdateTokens from './components/UpdateTokens';
import SplashPage from './components/SplashPage';
import Home from './components/Home'
import Portfolios from './components/Portfolios';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  // const currentUser = useSelector(state => state?.session?.user)
  const [showSignup, setShowSignup] = useState('all')
  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar setShowSignup={setShowSignup}/>
      <Switch>
        <Route path='/' exact={true} >
          <SplashPage showSignup={showSignup} setShowSignup={setShowSignup} />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/home' exact={true}>
          <AllTokens />
        </ProtectedRoute>
        <ProtectedRoute path='/homes' exact={true}>
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path='/tokens/refresh' exact={true}>
          <UpdateTokens />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
