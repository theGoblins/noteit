import { combineReducers } from 'redux';
import appReducer from '../modules/App';

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;