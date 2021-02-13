import {
  FETCH_SOLUTIONS_SUCCESS,
  FETCH_SOLUTIONS_FAIL,
  CREATE_SOLUTION_SUCCESS,
  CREATE_SOLUTION_FAIL,
} from '../constants/solutionsConstants';

const initialState = {
  solutions: [],
  error: null,
};

const solutionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SOLUTIONS_SUCCESS:
      return {
        solutions: action.payload,
      };
    case FETCH_SOLUTIONS_FAIL:
      return {
        error: action.payload,
      };
    case CREATE_SOLUTION_SUCCESS:
      return {
        solutions: [...state.solutions, action.payload],
      };
    case CREATE_SOLUTION_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export default solutionsReducer;
