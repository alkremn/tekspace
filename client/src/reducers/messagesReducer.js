import {
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAIL,
  ADD_MESSAGE,
} from '../constants/messageConstants';

const initialState = {
  messages: [],
  error: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MESSAGES_SUCCESS:
      return {
        messages: action.payload,
      };
    case FETCH_MESSAGES_FAIL:
      return {
        error: action.payload,
      };
    case ADD_MESSAGE:
      return {
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};

export default usersReducer;
