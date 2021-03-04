import {
  FETCH_REPORT_SUCCESS,
  FETCH_REPORT_FAIL,
} from '../constants/reportConstants';

const initialState = {
  report: null,
  error: null,
};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REPORT_SUCCESS:
      return {
        ...state,
        report: action.payload,
      };
    case FETCH_REPORT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reportReducer;
