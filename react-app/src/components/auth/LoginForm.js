import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { updateAllTokensThunk } from '../../store/all-tokens-store';

const LoginForm = ({setShowSignup}) => {
  const [errors, setErrors] = useState([]);
  const [Berrors, setBerrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const updateEmail = (e) => setEmail(e.target.value)
  const updatePassword = (e) => setPassword(e.target.value)


  useEffect(() => {
    const newErrors = {};

    if (!email.includes('@') || !email.includes('.')) newErrors.email = "Invalid Email"
    if (!email) newErrors.email = "Please enter an email"
    if (password.length < 6) newErrors.password = "Password must be atleast 6 characters"
    if (!password) newErrors.password = "Please enter a password"

    setErrors(newErrors);
  }, [email, password]);


  const onLogin = async (e) => {
    e.preventDefault();
    setBerrors([])
    dispatch(updateAllTokensThunk())
    const data = await dispatch(login(email, password));
    if (data) {
      setBerrors(data);
    }

    if (!data) {
      setShowSignup('all')
    }
  };


  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <form className='signup-form' onSubmit={onLogin}>

      <div>
        {Berrors.map((error, ind) => (
          <div className='signup-form-error-message' key={ind}>{error}</div>
        ))}
      </div>

      <label className='signup-form-label' htmlFor='email'>Email</label>
      <input
        name='email'
        type='text'
        placeholder='Email'
        value={email}
        onChange={updateEmail}
      />
      <div className="signup-form-error-message">{errors?.email}</div>


      <label className='signup-form-label' htmlFor='password'>Password</label>
      <input
        name='password'
        type='password'
        placeholder='Password'
        value={password}
        onChange={updatePassword}
      />
      <div className="signup-form-error-message">{errors?.password}</div>

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
  );
};

export default LoginForm;
