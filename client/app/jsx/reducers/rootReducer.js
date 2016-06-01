import { combineReducers } from 'redux';
import MainReducer from './reducer_main';

const rootReducer = combineReducers({
  main: MainReducer,
});

export default rootReducer;