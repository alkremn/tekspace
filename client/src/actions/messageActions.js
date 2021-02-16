import { LOADING_START, LOADING_FINISH } from '../constants/asyncConstants';
import {
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAIL,
  ADD_MESSAGE,
} from '../constants/messageConstants';

import { axiosInstance } from '../api/axios';

export const fetchMessages = () => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getState().auth.user.token}`,
    },
  };
  dispatch({ type: LOADING_START });
  try {
    const { data } = await axiosInstance.get('/api/messages', config);
    dispatch({ type: FETCH_MESSAGES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_MESSAGES_FAIL, payload: error });
  }
  dispatch({ type: LOADING_FINISH });
};

export const addMessage = message => dispatch => {
  dispatch({ type: ADD_MESSAGE, payload: message });
};
