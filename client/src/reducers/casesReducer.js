import {
  FETCH_CASES_FAIL,
  FETCH_CASES_SUCCESS,
  CREATE_CASE_SUCCESS,
  CREATE_CASE_FAIL,
  REMOVE_CASE_SUCCESS,
  REMOVE_CASE_FAIL,
} from '../constants/caseConstants';
const initialState = {
  cases: [],
  error: null,
};

const casesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CASES_SUCCESS:
      return {
        cases: action.payload,
      };
    case FETCH_CASES_FAIL:
      return {
        error: action.payload,
      };
    case CREATE_CASE_SUCCESS:
      return {
        cases: [...state.cases, action.payload],
      };
    case CREATE_CASE_FAIL:
      return {
        error: action.payload,
      };
    case REMOVE_CASE_SUCCESS:
      return {
        cases: [...state.cases.filter(c => c._id !== action.payload._id)],
      };
    case REMOVE_CASE_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export default casesReducer;
