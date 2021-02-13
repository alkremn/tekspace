import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import asyncReducer from './reducers/asyncReducer';
import authReducer from './reducers/authReducer';
import categoriesReducer from './reducers/categoriesReducer';
import solutionsReducer from './reducers/solutionsReducer';
import usersReducer from './reducers/usersReducer';
import messagesReducer from './reducers/messagesReducer';

const rootReducer = combineReducers({
  async: asyncReducer,
  auth: authReducer,
  categories: categoriesReducer,
  solutions: solutionsReducer,
  users: usersReducer,
  messages: messagesReducer,
});

const initialState = {
  auth: {
    user: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
