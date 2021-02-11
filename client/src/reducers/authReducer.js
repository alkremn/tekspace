import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
} from '../constants/authConstants';

const initialState = {
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case AUTH_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
