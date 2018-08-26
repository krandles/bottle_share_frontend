import { combineReducers } from 'redux';
import beerReducer from './beerReducer';
import eventReducer from './eventReducer';
import userReducer from './userReducer';

// TODO: get rid of duplicate user info in state
const rootReducer = combineReducers({
  beer: beerReducer,
  event: eventReducer,
  user: userReducer
});

export default rootReducer;
