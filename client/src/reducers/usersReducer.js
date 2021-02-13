import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,
} from '../constants/usersConstants';

const initialState = {
  users: [],
  error: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        users: action.payload,
      };
    case FETCH_USERS_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
