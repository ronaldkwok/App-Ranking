import MobileApp from './model/MobileApp';
import Realm from 'realm';
import StorageHelper from './StorageHelper';

function getTopFreeApps(count: number = 100) {
    return fetch('https://itunes.apple.com/hk/rss/topfreeapplications/limit=' + count + '/json')
        .then((response) => response.json())
        .then((responseJson) => {
            let apps = responseJson.feed.entry.map(item => {
                let app = new MobileApp();
                app.initData(item);
                return app;
            });

            StorageHelper.storeRankingApps(apps);

            return apps;
        }).catch((error) => {
            console.log(error);
        });
}

function getRecommendApps(count: number = 10) {
    return fetch('https://itunes.apple.com/hk/rss/topgrossingapplications/limit=' + count + '/json')
        .then((response) => response.json())
        .then((responseJson) => {
            // console.log("realm.path", realm.path);

            let apps = responseJson.feed.entry.map(item => {
                let app = new MobileApp();
                app.initData(item, MobileApp.appType.Recommend);
                return app;
            });

            StorageHelper.storeRecommendApps(apps)

            return apps;
        });
}

function getAppDetail(appID: number) {
    return fetch('https://itunes.apple.com/hk/lookup?id=' + appID)
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        });
}

const NetworkHelper = {
    getTopFreeApps, getRecommendApps, getAppDetail,
};

export default NetworkHelper;
