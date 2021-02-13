import { LOADING_START, LOADING_FINISH } from '../constants/asyncConstants';
import {
  FETCH_SOLUTIONS_SUCCESS,
  FETCH_SOLUTIONS_FAIL,
  CREATE_SOLUTION_SUCCESS,
  CREATE_SOLUTION_FAIL,
} from '../constants/solutionsConstants';

import {
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAIL,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
} from '../constants/categoriesConstants';

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
    const { data } = await axiosInstance.get('/api/categories', config);
    dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_CATEGORIES_FAIL, payload: error });
  }
  try {
    const { data } = await axiosInstance.get('/api/solutions', config);
    dispatch({ type: FETCH_SOLUTIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_SOLUTIONS_FAIL, payload: error });
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

  // create new Category
  if (solution.categoryTitle) {
    try {
      const { data } = await axiosInstance.post(
        '/api/categories',
        { title: solution.categoryTitle },
        config
      );
      solution.categoryId = data._id;
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CREATE_CATEGORY_FAIL, payload: error });
    }
  }

  // Creating new solution
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
  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${getState().auth.user.token}`,
  //   },
  // };
  // dispatch({ type: LOADING_START });
  // try {
  //   const { data } = await axiosInstance.delete(
  //     `api/solutions/${solutionId}`,
  //     config
  //   );
  //   console.log(data);
  // } catch (error) {
  //   dispatch({ type: REMOVE_SOLUTION_FAIL, payload: error });
  // }
  // dispatch({ type: LOADING_FINISH });
};
