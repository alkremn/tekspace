import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginAction } from '../actions/authActions';
import logoIcon from '../../assets/logo.svg';
import { FcGoogle } from 'react-icons/fc';
import Button from '../components/common/Button';
import { motion } from 'framer-motion';
import { TextField } from '@material-ui/core';

const LoginPage = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const dispatch = useDispatch();
  // const { loading, user } = useSelector(state => state.auth);

  // useEffect(() => {
  //   if (user) {
  //     history.push('/dashboard');
  //   }
  // }, [history, user]);

  const loginHandler = e => {
    // e.preventDefault();
    // dispatch(loginAction(email, password));
  };

  return (
    <div className='login'>
      <motion.div
        key='loginDiv'
        className='login__container'
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ scale: 0.3, opacity: 0 }}
      >
        <img className='login__icon' src={logoIcon} alt='logo' />
        <form className='login__form' action='/api/login' method='POST'>
          <TextField
            id='email'
            value={email}
            size='small'
            variant='outlined'
            className='login__input'
            placeholder='email'
            type='email'
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            id='password'
            size='small'
            variant='outlined'
            value={password}
            className='login__input'
            placeholder='password'
            onChange={e => setPassword(e.target.value)}
            type='password'
          />
          <Button
            className='login__button'
            primary
            width='320'
            height='45'
            onClick={e => loginHandler(e)}
          >
            Log In
          </Button>
        </form>
        <div className='login__form-divider'>
          <span>or</span>
        </div>
        <form
          className='login__google-form'
          action='http://localhost:5000/api/v1/auth/google'
          method='GET'
        >
          <Button
            className='login__google-button'
            height='40'
            width='320'
            primary
          >
            <FcGoogle className='login__google-icon' />
            Log In With Google
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
