import { LOADING_FINISH, LOADING_START } from '../constants/asyncConstants';
import {
  FETCH_REPORT_SUCCESS,
  FETCH_REPORT_FAIL,
} from '../constants/reportConstants.js';
import axios from 'axios';

export const fetchReportAction = () => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getState().auth.user.token}`,
    },
  };
  dispatch({ type: LOADING_START });
  try {
    const { data } = await axios.get('/api/reports', config);
    dispatch({ type: FETCH_REPORT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_REPORT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
  dispatch({ type: LOADING_FINISH });
};
