import MobileApp from '../model/MobileApp';
import StorageHelper from './StorageHelper';
import itunes from '../api/itunes';

const getTopFreeApps = async (count = 100) => {
    const response = await itunes.get(`/rss/topfreeapplications/limit=${count}/json`);
    const responseJson = response.data;

    let apps = responseJson.feed.entry.map(item => {
        return MobileApp.fromJSON(item);
    });

    StorageHelper.storeRankingApps(apps);

    return apps;
}

const getRecommendApps = async (count = 10) => {
    const response = await itunes.get(`/rss/topgrossingapplications/limit=${count}/json`);
    const responseJson = response.data;
    let apps = responseJson.feed.entry.map(item => {
        let app = new MobileApp(item);

        return app;
    });
    StorageHelper.storeRecommendApps(apps);

    return apps;
}

const getAppDetail = async (appID) => {
    const response = await itunes.get(`/lookup?id=${appID}`);
    const responseJson = response.data;

    return responseJson;
}

const NetworkHelper = {
    getTopFreeApps, getRecommendApps, getAppDetail,
};

export default NetworkHelper;
