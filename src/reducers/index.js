import { combineReducers } from 'redux';
import FreeAppReducer from './FreeAppReducer';

export default combineReducers({
    freeApps: FreeAppReducer
});