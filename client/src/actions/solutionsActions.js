import { LOADING_START, LOADING_FINISH } from '../constants/asyncConstants';
import {
  FETCH_SOLUTIONS_SUCCESS,
  FETCH_SOLUTIONS_FAIL,
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
