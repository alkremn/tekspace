import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import logoIcon from '../../assets/logo.svg';
import { FcGoogle } from 'react-icons/fc';
import Button from '../components/common/Button';
import { motion } from 'framer-motion';
import { loginAction } from '../../actions/authActions';
import { FormControl, TextField, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

// Validation
import * as yup from 'yup';
import { useFormik } from 'formik';

// Validation Schema
const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginPage = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.auth);

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

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

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
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <MuiAlert elevation={6} variant='filled' severity='error'>
          {error?.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default LoginPage;
