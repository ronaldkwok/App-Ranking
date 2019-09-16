import MobileApp from '../model/MobileApp';
import Realm from 'realm';

function storeRankingApps(apps: [MobileApp]) {
    let appIDs = apps.map(app => app.appID);
    let realm = new Realm({schema: [MobileApp]});
    let unwantedAppIDs = realm.objects(MobileApp.schema.name).filtered('isRankingApp = true').map(item => item.appID).filter(x => !appIDs.includes(x));

    realm.write(() => {
        for (let x in unwantedAppIDs) {
            realm.create(MobileApp.schema.name, {
                appID: unwantedAppIDs[x],
                isRankingApp: false,
                ranking: null,
            }, Realm.UpdateMode.Modified);
        }
        for (let i = 0; i < apps.length; i++) {
            let app = apps[i];
            realm.create(MobileApp.schema.name, {
                appID: app.appID,
                isRankingApp: true,
                name: app.name,
                summary: app.summary,
                artist: app.artist,
                imageUrl: app.imageUrl,
                category: app.category,
                categoryName: app.categoryName,
                ranking: i + 1,
            }, Realm.UpdateMode.Modified);
        }
    });
}

function storeRecommendApps(apps: [MobileApp]) {
    let appIDs = apps.map(app => app.appID);
    let realm = new Realm({schema: [MobileApp]});
    let unwantedAppIDs = realm.objects(MobileApp.schema.name).filtered('isRecommendApp = true').map(item => item.appID).filter(x => !appIDs.includes(x));

    realm.write(() => {
        for (let x in unwantedAppIDs) {
            realm.create(MobileApp.schema.name, {
                appID: unwantedAppIDs[x],
                isRecommendApp: false,
            }, Realm.UpdateMode.Modified);
        }
        for (let app of apps) {
            realm.create(MobileApp.schema.name, {
                appID: app.appID,
                isRecommendApp: true,
                name: app.name,
                summary: app.summary,
                artist: app.artist,
                imageUrl: app.imageUrl,
                category: app.category,
                categoryName: app.categoryName,
            }, Realm.UpdateMode.Modified);
        }
    });
}

function updateAppInfo(app: MobileApp) {
    let realm = new Realm({schema: [MobileApp]});
    realm.write(() => {
        realm.create(MobileApp.schema.name, {
            appID: app.appID,
            starsNumber: app.starsNumber,
            ratingCount: app.ratingCount,
        }, Realm.UpdateMode.Modified);
    });
}

function getApps(appType: MobileApp.appType): [MobileApp] {
    let apps: [MobileApp];
    let realm = new Realm({schema: [MobileApp]});
    let localApps: [];

    switch (appType) {
        case MobileApp.appType.Recommend:
            localApps = realm.objects(MobileApp.schema.name).filtered('isRecommendApp = true');
            break;

        case MobileApp.appType.Ranking:
            localApps = realm.objects(MobileApp.schema.name).filtered('isRankingApp = true').sorted('ranking');
            break;
    }

    apps = localApps.map(item => {
        let app = new MobileApp();
        app.initWithLocalData(item);
        return app;
    });

    return apps;
}

const StorageHelper = {
    storeRankingApps, storeRecommendApps, getApps, updateAppInfo,
};

export default StorageHelper;
