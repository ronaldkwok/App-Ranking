import MobileApp from './model/MobileApp';
import Realm from 'realm';

function getTopFreeApps(count: number = 100) {
    return fetch('https://itunes.apple.com/hk/rss/topfreeapplications/limit=' + count + '/json')
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson.feed.entry.map(item => {
                let app = new MobileApp();
                app.initData(item);
                return app;
            });
        });
}

function getRecommendApps(count: number = 10) {
    return fetch('https://itunes.apple.com/hk/rss/topgrossingapplications/limit=' + count + '/json')
        .then((response) => response.json())
        .then((responseJson) => {
            //console.log("Realm.defaultPath", Realm.defaultPath);
            let realm = new Realm({schema: [MobileApp]});

            let apps = responseJson.feed.entry.map(item => {
                let app = new MobileApp();
                app.initData(item);
                return app;
            });

            realm.write(() => {

                for (let app of apps) {
                    realm.create(MobileApp.schema.name, app);
                }
            });

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
