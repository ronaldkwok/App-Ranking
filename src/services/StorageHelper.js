// import MobileApp from '../model/MobileApp';
// import Realm from 'realm';

// storeRankingApps = (apps) => {
//     let appIDs = apps.map(app => app.appID);
//     let realm = new Realm({ schema: [MobileApp.schema] });
//     let unwantedAppIDs = realm.objects(MobileApp.schema.name).filtered('isRankingApp = true').map(item => item.appID).filter(appID => !appIDs.includes(appID));

//     realm.write(() => {
//         unwantedAppIDs.forEach((appID) => {
//             realm.create(MobileApp.schema.name, {
//                 appID: appID,
//                 isRankingApp: false,
//                 ranking: null,
//             }, Realm.UpdateMode.Modified);
//         })

//         apps.forEach((app, index) => {
//             realm.create(MobileApp.schema.name, {
//                 appID: app.appID,
//                 isRankingApp: true,
//                 name: app.name,
//                 summary: app.summary,
//                 artist: app.artist,
//                 imageUrl: app.imageUrl,
//                 category: app.category,
//                 categoryName: app.categoryName,
//                 ranking: index + 1,
//             }, Realm.UpdateMode.Modified);
//         })
//     });
// }

// storeRecommendApps = (apps) => {
//     let appIDs = apps.map(app => app.appID);
//     let realm = new Realm({ schema: [MobileApp] });
//     let unwantedAppIDs = realm.objects(MobileApp.schema.name).filtered('isRecommendApp = true').map(item => item.appID).filter(x => !appIDs.includes(x));

//     realm.write(() => {
//         unwantedAppIDs.forEach((appID) => {
//             realm.create(MobileApp.schema.name, {
//                 appID: appID,
//                 isRecommendApp: false,
//             }, Realm.UpdateMode.Modified);
//         })

//         apps.forEach((app) => {
//             realm.create(MobileApp.schema.name, {
//                 appID: app.appID,
//                 isRecommendApp: true,
//                 name: app.name,
//                 summary: app.summary,
//                 artist: app.artist,
//                 imageUrl: app.imageUrl,
//                 category: app.category,
//                 categoryName: app.categoryName,
//             }, Realm.UpdateMode.Modified);
//         })
//     });
// }

// updateAppInfo = (app) => {
//     let realm = new Realm({ schema: [MobileApp] });
//     realm.write(() => {
//         realm.create(MobileApp.schema.name, {
//             appID: app.appID,
//             starsNumber: app.starsNumber,
//             ratingCount: app.ratingCount,
//         }, Realm.UpdateMode.Modified);
//     });
// }

// getApps = (appType) => {
//     let apps;
//     let realm = new Realm({ schema: [MobileApp] });
//     let localApps;

//     switch (appType) {
//         case MobileApp.appType.Recommend:
//             localApps = realm.objects(MobileApp.schema.name).filtered('isRecommendApp = true');
//             break;

//         case MobileApp.appType.Ranking:
//             localApps = realm.objects(MobileApp.schema.name).filtered('isRankingApp = true').sorted('ranking');
//             break;
//     }

//     apps = localApps.map(item => {
//         let app = new MobileApp();
//         app.initWithLocalData(item);
//         return app;
//     });

//     return apps;
// }

// const StorageHelper = {
//     storeRankingApps, storeRecommendApps, getApps, updateAppInfo,
// };

// export default StorageHelper;
