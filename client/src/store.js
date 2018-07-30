import { createStore, applyMiddleware } from 'redux';
import loginReducer from './redux/reducers/loginReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export default createStore(
  loginReducer,
  applyMiddleware(thunk,logger)
);