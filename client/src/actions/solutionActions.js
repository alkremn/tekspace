import { LOADING_START, LOADING_FINISH } from '../constants/asyncConstants';
import {
  FETCH_SOLUTIONS_SUCCESS,
  FETCH_SOLUTIONS_FAIL,
  CREATE_SOLUTION_SUCCESS,
  CREATE_SOLUTION_FAIL,
  UPDATE_SOLUTION_SUCCESS,
  UPDATE_SOLUTION_FAIL,
  REMOVE_SOLUTION_SUCCESS,
  REMOVE_SOLUTION_FAIL,
} from '../constants/solutionConstants';

import axios from 'axios';

export const fetchSolutionsAction = () => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getState().auth.user.token}`,
    },
  };
  dispatch({ type: LOADING_START });
  try {
    const { data } = await axios.get('/api/solutions', config);
    dispatch({ type: FETCH_SOLUTIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_SOLUTIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
  dispatch({ type: LOADING_FINISH });
};

export const createSolutionAction = solution => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getState().auth.user.token}`,
    },
  };
  dispatch({ type: LOADING_START });

  try {
    const { data } = await axios.post('/api/solutions', solution, config);
    dispatch({ type: CREATE_SOLUTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_SOLUTION_FAIL, payload: error });
  }
  dispatch({ type: LOADING_FINISH });
};

export const updateSolutionAction = solution => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getState().auth.user.token}`,
    },
  };
  dispatch({ type: LOADING_START });

  try {
    const { data } = await axios.put('/api/solutions', solution, config);
    dispatch({ type: UPDATE_SOLUTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_SOLUTION_FAIL, payload: error });
  }
  dispatch({ type: LOADING_FINISH });
};

export const removeSolutionAction = solutionId => async (
  dispatch,
  getState
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getState().auth.user.token}`,
    },
  };

  dispatch({ type: LOADING_START });
  try {
    const { data } = await axios.delete(`api/solutions/${solutionId}`, config);
    dispatch({ type: REMOVE_SOLUTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REMOVE_SOLUTION_FAIL, payload: error });
  }
  dispatch({ type: LOADING_FINISH });
};
