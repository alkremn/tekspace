import { LOADING_START, LOADING_FINISH } from '../constants/asyncConstants';
import {
  FETCH_SOLUTIONS_SUCCESS,
  FETCH_SOLUTIONS_FAIL,
  CREATE_SOLUTION_SUCCESS,
  CREATE_SOLUTION_FAIL,
} from '../constants/solutionsConstants';

import { axiosInstance } from '../api/axios';

export const fetchSolutions = () => async (dispatch, getState) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getState().auth.user.token}`,
    },
  };
  try {
    dispatch({ type: LOADING_START });
    const response = await axiosInstance.get('/api/solutions', config);
    dispatch({ type: FETCH_SOLUTIONS_SUCCESS, payload: response.data });
    dispatch({ type: LOADING_FINISH });
  } catch (error) {
    console.log(error);
    dispatch({ type: FETCH_SOLUTIONS_FAIL, payload: error });
    dispatch({ type: LOADING_FINISH });
  }
};

export const createSolution = solution => async (dispatch, getState) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getState().auth.user.token}`,
    },
  };
  console.log(solution);
  let createdCategory;
  try {
    dispatch({ type: LOADING_START });
    if (solution.categoryTite) {
      const response = await axiosInstance.post(
        '/api/categories',
        solution.categoryTite,
        config
      );
      createdCategory = response.data;
      solution.categoryId = createdCategory._id;
    }
    const response = await axiosInstance.post(
      '/api/solutions',
      solution,
      config
    );
    console.log(response.data);

    const payload = {
      solution: response.data,
    };
    if (createdCategory) {
      payload.category = createdCategory;
    }
    dispatch({ type: CREATE_SOLUTION_SUCCESS, payload });
    dispatch({ type: LOADING_FINISH });
  } catch (error) {
    console.log(error);
    dispatch({ type: CREATE_SOLUTION_FAIL, payload: error });
    dispatch({ type: LOADING_FINISH });
  }
};
