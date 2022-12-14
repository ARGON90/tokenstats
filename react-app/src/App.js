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
import SplashPage from './components/SplashPage';
import Tokens from './components/Tokens'
import Footer from './components/Footer';
import NotFound from './components/NotFound';

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
      <Footer />
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
        <ProtectedRoute path='/tokens' exact={true}>
          <Tokens />
        </ProtectedRoute>
        <ProtectedRoute>
          <NotFound />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
