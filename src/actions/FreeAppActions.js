import * as types from './types';
import NetworkHelper from '../services/NetworkHelper';

export const requestFreeApps = () => {
    return {
        type: types.REQUEST_FREE_APPS
    };
};

export const receiveFreeApps = apps => {
    return {
        type: types.RECEIVE_FREE_APPS,
        payload: apps
    };
};

export const filterFreeApps = searchText => {
    return {
        type: types.FILTER_FREE_APPS,
        payload: searchText
    };
};

export const loadMoreFreeApps = () => {
    return {
        type: types.LOAD_MORE_FREE_APPS
    };
};

export const fetchFreeApps = () => {
    return async (dispatch) => {
        dispatch(requestFreeApps());
        const apps = await NetworkHelper.getTopFreeApps();
        dispatch(receiveFreeApps(apps));
        dispatch(loadMoreFreeApps());
    }
};