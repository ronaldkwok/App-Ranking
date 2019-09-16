export default class MobileApp {

    initData(json) {
        this.appID = json.id.attributes['im:id'];
        this.name = json['im:name'].label;
        this.summary = json.summary.label;
        this.artist = json['im:artist'].label;
        this.imageUrl = json['im:image'][1].label;
        this.category = json.category.attributes.term;
        this.categoryName = json.category.attributes.label;
    }

    initWithLocalData(realmObject) {
        this.appID = realmObject.appID;
        this.name = realmObject.name;
        this.summary = realmObject.summary;
        this.artist = realmObject.artist;
        this.imageUrl = realmObject.imageUrl;
        this.category = realmObject.category;
        this.categoryName = realmObject.categoryName;
        this.starsNumber = realmObject.starsNumber;
        this.ratingCount = realmObject.ratingCount;
    }

    updateRating(json) {
        this.starsNumber = json.results[0].averageUserRating;
        this.ratingCount = json.results[0].userRatingCount;
    }

    filter(searchText: string) {
        const query = searchText.toLowerCase();
        const {name, summary, artist, category} = this;

        return name.toLowerCase().includes(query) || summary.toLowerCase().includes(query) || artist.toLowerCase().includes(query) || category.toLowerCase().includes(query);
    }
}

MobileApp.appType = {
    Ranking: 0,
    Recommend: 1,
};

MobileApp.schema = {
    name: 'MobileApp',
    primaryKey: 'appID',
    properties: {
        appID: 'string',
        isRankingApp: {type: 'bool', default: false},
        isRecommendApp: {type: 'bool', default: false},
        name: 'string',
        summary: 'string',
        artist: 'string',
        imageUrl: 'string',
        category: 'string',
        categoryName: 'string',
        starsNumber: 'float?',
        ratingCount: 'float?',
        ranking: 'int?',
    },
};
