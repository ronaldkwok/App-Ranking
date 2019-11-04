import * as types from './types';
import NetworkHelper from '../services/NetworkHelper';
import MobileApp from '../model/MobileApp';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';

export const requestFreeApps = () => {
    return {
        type: types.REQUEST_FREE_APPS
    };
};

export const receiveFreeApps = (apps: [MobileApp]) => {
    return {
        type: types.RECEIVE_FREE_APPS,
        payload: apps
    };
};

export const filterFreeApps = (searchText: string) => {
    return {
        type: types.FILTER_FREE_APPS,
        payload: searchText
    };
};

export const loadMoreFreeApps = (newPageApps: [MobileApp]) => {
    return {
        type: types.LOAD_MORE_FREE_APPS,
        payload: newPageApps
    };
};

export const fetchFreeApps = () => {
    return async (dispatch: any) => {
        dispatch(requestFreeApps());
        const apps = await NetworkHelper.getTopFreeApps();
        dispatch(receiveFreeApps(apps));
        dispatch(loadNewPageApps());
    }
};

export const requestAppUpdate = (appID: string) => {
    return {
        type: types.REQUEST_APP_UPDATE,
        payload: appID
    }
}

export const receiveAppUpdate = (updatedApp: MobileApp) => {
    return {
        type: types.RECEIVE_APP_UPDATE,
        payload: updatedApp
    }
}

export const fetchAppUpdate = (app: MobileApp) => {
    return async (dispatch: any) => {
        dispatch(requestAppUpdate(app.appID));
        const appData = await NetworkHelper.getAppDetail(app.appID);
        app.updateRating(appData);
        dispatch(receiveAppUpdate(app));
    }
}

export const loadNewPageApps = () => {
    return async (dispatch: any, getState: any) => {
        const { apps, displayApps, searchText, page } = getState().freeApps;

        const filterdApps = searchText ? apps.filter((app: MobileApp) =>
            app.filter(searchText),
        ) : apps;

        if (displayApps.length >= filterdApps.length) {
            return;
        }

        const appPerPage = 10;
        const newPage = page + 1;

        const newPageApps = filterdApps.slice(page * appPerPage, newPage * appPerPage);
        dispatch(loadMoreFreeApps(newPageApps))

        newPageApps.forEach((app: MobileApp) => {
            if (!app.starsNumber) {
                dispatch(fetchAppUpdate(app))
            }
        });
    }
}