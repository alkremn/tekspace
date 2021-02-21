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
    case UPDATE_SOLUTION_SUCCESS:
      return {
        solutions: [
          ...state.solutions.filter(s => s._id !== action.payload._id),
          action.payload,
        ],
      };
    case UPDATE_SOLUTION_FAIL:
      return {
        error: action.payload,
      };
    case REMOVE_SOLUTION_SUCCESS:
      return {
        solutions: [
          ...state.solutions.filter(s => s._id !== action.payload.solutionId),
        ],
      };
    case REMOVE_SOLUTION_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export default solutionsReducer;
