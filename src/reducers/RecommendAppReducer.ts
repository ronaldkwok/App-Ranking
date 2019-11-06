import * as types from '../actions/types';
import MobileApp from '../model/MobileApp';

export interface RecommendAppsState {
    apps: MobileApp[],
    displayApps: MobileApp[],
    isFetching: boolean,
    isError: boolean,
    searchText: string,
}

const INITIAL_STATE: RecommendAppsState = {
    apps: [],
    displayApps: [],
    isFetching: false,
    isError: false,
    searchText: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.REQUEST_RECOMMEND_APPS:
            return { ...state, isFetching: true, apps: [], displayApps: [] };
        case types.RECEIVE_RECOMMEND_APPS:
            return { ...state, isFetching: true, apps: action.payload };
        default:
            return state
    }
}