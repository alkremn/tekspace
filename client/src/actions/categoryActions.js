import { axiosInstance } from '../api/axios';
import { LOADING_FINISH, LOADING_START } from '../constants/asyncConstants';
import {
  FETCH_CATEGORIES_FAIL,
  FETCH_CATEGORIES_SUCCESS,
} from '../constants/categoryConstants';

export const fetchCategories = () => async (dispatch, getState) => {
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
  dispatch({ type: LOADING_FINISH });
};
