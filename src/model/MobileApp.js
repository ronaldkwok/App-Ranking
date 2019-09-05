export default class MobileApp {
    appID: BigInteger;
    name: String;
    imageUrl: String;
    category: String;

    constructor(json) {
        this.appID = json.id.attributes['im:id'];
        this.name = json['im:name'].label;
        this.imageUrl = json['im:image'][1].label;
        this.category = json.category.attributes.label;
    }

    filter(searchText) {
        if (searchText) {
            return this.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
        }
        return true;
    }
}
