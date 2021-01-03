import FilterReducer from './filter';
import OperationRouter from './operations';
import { combineReducers } from 'redux';

// won't be using redux-thunk here
export default combineReducers({filter: FilterReducer, opr: OperationRouter});
