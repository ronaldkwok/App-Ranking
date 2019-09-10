export default class MobileApp {
    appID: Number;
    name: String;
    summary: String;
    artist: String;
    imageUrl: String;
    category: String;
    starsNumber: Number;
    ratingCount: Number;

    constructor(json) {
        this.appID = json.id.attributes['im:id'];
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

    filter(searchText) {
        if (searchText) {
            return this.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
        }
        return true;
    }
}
