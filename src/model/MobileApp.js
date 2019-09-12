export default class MobileApp {
    appID: number;
    name: string;
    summary: string;
    artist: string;
    imageUrl: string;
    category: string;
    starsNumber: number;
    ratingCount: number;

    initData(json) {
        this.appID = Number(json.id.attributes['im:id']);
        this.name = json['im:name'].label;
        this.summary = json.summary.label;
        this.artist = json['im:artist'].label;
        this.imageUrl = json['im:image'][1].label;
        this.category = json.category.attributes.label;
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

MobileApp.schema = {
    name: 'MobileApp',
    // primaryKey: 'appID',
    properties: {
        appID: 'int',
    },
};
