import { createStore, applyMiddleware,combineReducers } from 'redux';
import login from './redux/reducers/loginReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import cart from './redux/reducers/productCartReducer';

export default createStore(
  combineReducers({
    login,
    cart
  }),  
  applyMiddleware(thunk,logger)
);  