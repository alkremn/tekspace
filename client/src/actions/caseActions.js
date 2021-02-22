import axios from 'axios';
import { LOADING_FINISH, LOADING_START } from '../constants/asyncConstants';
import {
  CREATE_CASE_FAIL,
  CREATE_CASE_SUCCESS,
  FETCH_CASES_FAIL,
  FETCH_CASES_SUCCESS,
  REMOVE_CASE_FAIL,
  REMOVE_CASE_SUCCESS,
} from '../constants/caseConstants';

export const fetchCasesAction = () => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getState().auth.user.token}`,
    },
  };
  try {
    dispatch({ type: LOADING_START });
    const { data } = await axios.get('/api/cases', config);
    dispatch({ type: FETCH_CASES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_CASES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch({ type: LOADING_FINISH });
  }
};

export const createCaseAction = newCase => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getState().auth.user.token}`,
    },
  };
  try {
    dispatch({ type: LOADING_START });
    const { data } = await axios.post('/api/cases', newCase, config);
    dispatch({ type: CREATE_CASE_SUCCESS, payload: data });
    dispatch({ type: LOADING_FINISH });
  } catch (error) {
    dispatch({
      type: CREATE_CASE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch({ type: LOADING_FINISH });
  }
};

export const updateCaseAction = updateStatus => async (dispatch, getState) => {
  console.log(updateStatus);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getState().auth.user.token}`,
    },
  };
  try {
    await axios.put(`/api/cases`, updateStatus, config);
  } catch (error) {
    // dispatch({
    //   type: UP,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
};

export const removeCaseAction = caseId => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getState().auth.user.token}`,
    },
  };
  try {
    dispatch({ type: LOADING_START });
    const { data } = await axios.delete(`/api/cases/${caseId}`, config);
    dispatch({ type: REMOVE_CASE_SUCCESS, payload: data });
    dispatch({ type: LOADING_FINISH });
  } catch (error) {
    dispatch({
      type: REMOVE_CASE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch({ type: LOADING_FINISH });
  }
};
