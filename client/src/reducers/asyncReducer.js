import { LOADING_START, LOADING_FINISH } from '../constants/asyncConstants';

const initialState = {
  loading: false,
};

export const asyncReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_START:
      return {
        ...state,
        loading: true,
      };
    case LOADING_FINISH:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
