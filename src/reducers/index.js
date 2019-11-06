import { combineReducers } from 'redux';
import FreeAppReducer from './FreeAppReducer';
import RecommendAppReducer from './RecommendAppReducer';


export default combineReducers({
    freeApps: FreeAppReducer,
    recommendApps: RecommendAppReducer
});