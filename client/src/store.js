import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { asyncReducer } from './reducers/asyncReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  async: asyncReducer,
  auth: authReducer,
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
