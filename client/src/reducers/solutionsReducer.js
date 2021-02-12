import {
  FETCH_SOLUTIONS_SUCCESS,
  FETCH_SOLUTIONS_FAIL,
} from '../constants/solutionsConstants';

const initialState = {
  categories: [],
  solutions: [],
  error: null,
};

const solutionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SOLUTIONS_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories,
        solutions: action.payload.solutions,
      };
    case FETCH_SOLUTIONS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default solutionsReducer;
