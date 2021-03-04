import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import asyncReducer from './reducers/asyncReducer';
import authReducer from './reducers/authReducer';
import solutionsReducer from './reducers/solutionsReducer';
import usersReducer from './reducers/usersReducer';
import messagesReducer from './reducers/messagesReducer';
import casesReducer from './reducers/casesReducer';
import reportReducer from './reducers/reportReducer';

const rootReducer = combineReducers({
  async: asyncReducer,
  auth: authReducer,
  solutions: solutionsReducer,
  users: usersReducer,
  messages: messagesReducer,
  cases: casesReducer,
  report: reportReducer,
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
