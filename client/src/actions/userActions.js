import { LOADING_START, LOADING_FINISH } from '../constants/asyncConstants';
import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,
  ADD_ACTIVE_USERS,
} from '../constants/userConstants';

import axios from 'axios';

export const fetchUsersAction = () => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getState().auth.user.token}`,
    },
  };
  dispatch({ type: LOADING_START });
  try {
    const { data } = await axios.get('/api/users', config);
    dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
  dispatch({ type: LOADING_FINISH });
};

export const addConnectedUsersAction = users => dispatch => {
  dispatch({
    type: ADD_ACTIVE_USERS,
    payload: users,
  });
};
