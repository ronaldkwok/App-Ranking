import * as types from '../actions/types';

const INITIAL_STATE = {
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
        case types.LOAD_MORE_FREE_APPS:
            const apps = state.searchText ? state.apps.filter(item =>
                item.filter(state.searchText),
            ) : state.apps;

            if (state.displayApps.length >= apps.length) {
                return state;
            }

            const appPerPage = 10;
            const newPage = state.page + 1;

            const displayApps = [
                ...state.displayApps,
                ...apps.slice(state.page * appPerPage, newPage * appPerPage)
            ];

            return { ...state, displayApps: displayApps, page: newPage };
        case types.FILTER_FREE_APPS:
            return { ...state, searchText: action.payload, page: 0, displayApps: [] };
        default:
            return state;
    }
};