import { LOADING_START, LOADING_FINISH } from '../constants/asyncConstants';
import {
  FETCH_SOLUTIONS_SUCCESS,
  FETCH_SOLUTIONS_FAIL,
  CREATE_SOLUTION_SUCCESS,
  CREATE_SOLUTION_FAIL,
  REMOVE_SOLUTION_SUCCESS,
  REMOVE_SOLUTION_FAIL,
} from '../constants/solutionConstants';

import { axiosInstance } from '../api/axios';

export const fetchSolutions = () => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getState().auth.user.token}`,
    },
  };
  dispatch({ type: LOADING_START });
  try {
    const { data } = await axiosInstance.get('/api/solutions', config);
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

export const createSolution = solution => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getState().auth.user.token}`,
    },
  };
  dispatch({ type: LOADING_START });

  try {
    const { data } = await axiosInstance.post(
      '/api/solutions',
      solution,
      config
    );
    dispatch({ type: CREATE_SOLUTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_SOLUTION_FAIL, payload: error });
  }
  dispatch({ type: LOADING_FINISH });
};

export const removeSolution = solutionId => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getState().auth.user.token}`,
    },
  };

  dispatch({ type: LOADING_START });
  try {
    const { data } = await axiosInstance.delete(
      `api/solutions/${solutionId}`,
      config
    );
    dispatch({ type: REMOVE_SOLUTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REMOVE_SOLUTION_FAIL, payload: error });
  }
  dispatch({ type: LOADING_FINISH });
};
