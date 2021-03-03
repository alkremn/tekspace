import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,
  ADD_ACTIVE_USERS,
} from '../constants/userConstants';

const initialState = {
  users: [],
  activeUsers: [],
  error: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case FETCH_USERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_ACTIVE_USERS:
      return {
        ...state,
        activeUsers: [...action.payload],
      };
    default:
      return state;
  }
};

export default usersReducer;
