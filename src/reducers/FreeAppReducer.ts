import * as types from '../actions/types';
import MobileApp from '../model/MobileApp';

export interface FreeAppsState {
    apps: MobileApp[],
    displayApps: MobileApp[],
    isFetching: boolean,
    isError: boolean,
    searchText: string,
    page: number,
}

const INITIAL_STATE: FreeAppsState = {
    apps: [],
    displayApps: [],
    isFetching: false,
    isError: false,
    searchText: '',
    page: 0,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.REQUEST_FREE_APPS:
            return { ...state, isFetching: true, page: 0, apps: [], displayApps: [] };
        case types.RECEIVE_FREE_APPS:
            return { ...state, isFetching: false, apps: action.payload };
        case types.LOAD_MORE_FREE_APPS: {
            const newPage = state.page + 1;

            const displayApps = [
                ...state.displayApps,
                ...action.payload
            ];

            return { ...state, displayApps: displayApps, page: newPage };
        }
        case types.FILTER_FREE_APPS:
            return { ...state, searchText: action.payload, page: 0, displayApps: [] };
        case types.RECEIVE_APP_UPDATE: {
            const updatedApp = action.payload;
            const { apps, displayApps } = state;

            const foundIndex = apps.findIndex(x => x.appID == updatedApp.appID);
            apps[foundIndex] = updatedApp

            const displayIndex = displayApps.findIndex(x => x.appID == updatedApp.appID);
            displayApps[displayIndex] = updatedApp
            return { ...state, apps: apps, displayApps: displayApps };
        }
        default:
            return state;
    }
};