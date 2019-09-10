import MobileApp from './model/MobileApp';

function getTopFreeApps(count: number = 100) {
    return fetch('https://itunes.apple.com/hk/rss/topfreeapplications/limit=' + count + '/json')
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson.feed.entry.map(item => new MobileApp(item));
        });
}

function getRecommendApps(count: number = 10) {
    return fetch('https://itunes.apple.com/hk/rss/topgrossingapplications/limit=' + count + '/json')
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson.feed.entry.map(item => new MobileApp(item));
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
