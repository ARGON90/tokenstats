import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { updateAllTokensThunk } from '../../store/all-tokens-store';

import '../CSS/index.css'

const SignUpForm = ({setShowSignup}) => {
  const [errors, setErrors] = useState([]);
  const [Berrors, setBerrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const updateUsername = (e) => setUsername(e.target.value);
  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateRepeatPassword = (e) =>setRepeatPassword(e.target.value);

  useEffect(() => {
    const newErrors = {};

    if (username.length < 6) newErrors.username = "Username must be atleast 6 characters"
    if (username.length > 255) newErrors.username = "Username must be less than 255 characters"
    if (!username) newErrors.username = "Please enter a user name"
    if (!email.includes('@') || !email.includes('.')) newErrors.email = "Invalid Email"
    if (!email) newErrors.email = "Please enter an email"
    if (password.length < 6) newErrors.password = "Password must be atleast 6 characters"
    if (!password) newErrors.password = "Please enter a password"
    if (!repeatPassword) newErrors.repeatPassword = "Please repeat your password"
    if (password !== repeatPassword) newErrors.repeatPassword = "Passwords must match"


    setErrors(newErrors);
}, [username, email, password, repeatPassword]);



  const onSignUp = async (e) => {
    e.preventDefault();
    setBerrors([])
    dispatch(updateAllTokensThunk())
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setBerrors(data)
      }

    if (!data) {
      setShowSignup('all')
    }
    }
  };



  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <form className='signup-form' onSubmit={onSignUp}>

        <div>
          {Berrors.map((error, ind) => (
            <div className='signup-form-error-message' key={ind}>{error}</div>
          ))}
        </div>

          <label className='signup-form-label'>User Name</label>
          <input
            className='signup-form-input'
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
          <div className="signup-form-error-message">{errors?.username}</div>


          <label className='signup-form-label'>Email</label>
          <input
            className='signup-form-input'
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
          <div className="signup-form-error-message">{errors?.email}</div>

          <label className='signup-form-label'>Password</label>
          <input
            className='signup-form-input'
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
          <div className="signup-form-error-message">{errors?.password}</div>



          <label className='signup-form-label'>Repeat Password</label>
          <input
            className='signup-form-input'
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
          <div className="signup-form-error-message">{errors?.repeatPassword}</div>


        <div className='splash-button-container'>
          <div className='signup-submit-container'>

          {Object.values(errors).length ?
                        <>
                            <button
                                className="create-trade-form-errors"
                                type="submit"
                                disabled={true}
                            >
                                Submit
                            </button>
                        </>
                        :
                        <button
                            className="create-trade-form-submit"
                            type="submit"
                            disabled={Object.values(errors).length}
                        >
                            Submit
                        </button>
                    }
          </div>
          <div className='splash-page-form-'>
            <button className='splash-form-cancel-here' onClick={() => setShowSignup('all')}>Cancel</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
