import {
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAIL,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  REMOVE_CATEGORY_SUCCESS,
  REMOVE_CATEGORY_FAIL,
} from '../constants/categoryConstants';

const initialState = {
  categories: [],
  error: null,
};

const solutionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      return {
        categories: action.payload,
      };
    case FETCH_CATEGORIES_FAIL:
      return {
        error: action.payload,
      };
    case CREATE_CATEGORY_SUCCESS:
      return {
        categories: [...state.categories, action.payload],
      };
    case CREATE_CATEGORY_FAIL:
      return {
        error: action.payload,
      };
    case REMOVE_CATEGORY_SUCCESS:
      return {
        categories: [
          ...state.categories.filter(c => c._id !== action.payload.categoryId),
        ],
      };
    case REMOVE_CATEGORY_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export default solutionsReducer;
