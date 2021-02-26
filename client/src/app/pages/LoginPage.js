import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
// Redux
import { useSelector, useDispatch } from 'react-redux';
// Icons
import logoIcon from '../../assets/Logo.svg';
import { FcGoogle } from 'react-icons/fc';
// Components
import Button from '../components/common/Button';
import { motion } from 'framer-motion';
import { FormControl, TextField, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import GoogleLogin from 'react-google-login';
// Actions
import { loginAction, loginWithGoogleAction } from '../../actions/authActions';

// Validation
import * as yup from 'yup';
import { useFormik } from 'formik';

// Validation Schema
const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginPage = ({ history }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { error, user } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.async);

  // Formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      dispatch(loginAction(values));
    },
  });

  //Google login handler
  const responseGoogle = response => {
    console.log(response);
    if (response.googleId) {
      dispatch(loginWithGoogleAction(response));
    }
  };

  useEffect(() => {
    if (user) {
      history.pushState('/overview');
    }
    if (error) {
      setOpen(true);
    }
  }, [error, history, user]);

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
        {error && (
          <Alert severity='error' style={{ width: '80%' }}>
            {error}
          </Alert>
        )}
        <form className='login__form' onSubmit={formik.handleSubmit}>
          <FormControl style={{ width: '100%' }}>
            <TextField
              id='email'
              name='email'
              size='small'
              variant='outlined'
              className='login__input'
              placeholder='email'
              type='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </FormControl>
          <FormControl style={{ width: '100%' }}>
            <TextField
              id='password'
              name='password'
              size='small'
              variant='outlined'
              className='login__input'
              placeholder='password'
              type='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </FormControl>
          <Button
            className='login__button'
            primary
            width='320'
            height='45'
            type='submit'
            loading={loading}
          >
            Log In
          </Button>
        </form>
        <div className='login__form-divider'>
          <span>or</span>
        </div>

        <GoogleLogin
          render={renderProps => (
            <Button
              onClick={renderProps.onClick}
              className='login__google-button'
              height='40'
              width='320'
              primary
              disabled={renderProps.disabled}
            >
              <FcGoogle className='login__google-icon' />
              Log In With Google
            </Button>
          )}
          buttonText='Log in with Google'
          clientId='495665474154-8djmc77mse373v6huk96kfd7dsl0brvg.apps.googleusercontent.com'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </motion.div>
    </div>
  );
};

export default withRouter(LoginPage);
