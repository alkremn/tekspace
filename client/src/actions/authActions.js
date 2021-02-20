import { LOADING_START, LOADING_FINISH } from '../constants/asyncConstants';
import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
} from '../constants/authConstants';
import axios from 'axios';

export const loginAction = credentials => async dispatch => {
  dispatch({ type: LOADING_START });
  try {
    const response = await axios.post('api/auth/login', credentials);
    dispatch({ type: AUTH_SUCCESS, payload: response.data });
    localStorage.setItem('userInfo', JSON.stringify(response.data));
    dispatch({ type: LOADING_FINISH });
  } catch (error) {
    dispatch({
      type: AUTH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch({ type: LOADING_FINISH });
  }
};

export const loginWithGoogleAction = googleData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  dispatch({ type: LOADING_START });
  try {
    const response = await axios.post(
      'api/auth/google',
      {
        token: googleData.tokenId,
      },
      config
    );
    dispatch({ type: AUTH_SUCCESS, payload: response.data });
    localStorage.setItem('userInfo', JSON.stringify(response.data));
    dispatch({ type: LOADING_FINISH });
  } catch (error) {
    dispatch({
      type: AUTH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch({ type: LOADING_FINISH });
  }
};

export const logoutAction = () => async dispatch => {
  dispatch({ type: AUTH_LOGOUT });
  localStorage.removeItem('userInfo');
};
