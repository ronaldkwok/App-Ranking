export default class MobileApp {

    public starsNumber?: number
    public ratingCount?: number

    constructor(
        readonly appID: string,
        public name: string,
        public summary: string,
        public artist: string,
        public imageUrl: string,
        public category: string,
        public categoryName: string,
    ) {
    }

    public static schema: Realm.ObjectSchema = {
        name: 'MobileApp',
        primaryKey: 'appID',
        properties: {
            appID: 'string',
            isRankingApp: { type: 'bool', default: false },
            isRecommendApp: { type: 'bool', default: false },
            name: 'string',
            summary: 'string',
            artist: 'string',
            imageUrl: 'string',
            category: 'string',
            categoryName: 'string',
            starsNumber: 'float?',
            ratingCount: 'float?',
            ranking: 'int?',
        }
    }

    static fromJSON(json: any) {
        const appID = json.id.attributes['im:id'];
        const name = json['im:name'].label;
        const summary = json.summary.label;
        const artist = json['im:artist'].label;
        const imageUrl = json['im:image'][1].label;
        const category = json.category.attributes.term;
        const categoryName = json.category.attributes.label;

        return new MobileApp(appID, name, summary, artist, imageUrl, category, categoryName);
    }

    updateRating(json: any) {
        this.starsNumber = json.results[0].averageUserRating;
        this.ratingCount = json.results[0].userRatingCount;
    }

    filter(searchText: string) {
        const query = searchText.toLowerCase();
        const { name, summary, artist, category } = this;

        return name.toLowerCase().includes(query) ||
            summary.toLowerCase().includes(query) ||
            artist.toLowerCase().includes(query) ||
            category.toLowerCase().includes(query);
    }
}
