import {
  FETCH_SOLUTIONS_SUCCESS,
  FETCH_SOLUTIONS_FAIL,
  CREATE_SOLUTION_SUCCESS,
  CREATE_SOLUTION_FAIL,
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
    case CREATE_SOLUTION_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, action.payload.category],
        solutions: [...state.solutions, action.payload.solution],
      };
    case CREATE_SOLUTION_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default solutionsReducer;
