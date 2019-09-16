# App-Ranking

An [React Native](https://facebook.github.io/react-native/) sample app .

## Details

This is a simple app of displaying iOS app ranking.
Basic app information demostratiion of table scroll with RESTful API.
Seach bar for searching app(s) with keyword.

## Setup instructions

Please follow the [React Native tutorial](https://getstream.io/react-native-activity-feed/tutorial/) first if you hanev't install React Native.

```
git clone https://github.com/ronaldkwok/App-Ranking
cd App-Ranking
npm install
```

### iOS
```
cd ios
pod install
```

### Android
- [SDK location not found](https://stackoverflow.com/a/32640154)
- [Keystore file not found for signing config 'debug'](https://github.com/facebook/react-native/issues/25629)

## Built With

* [React Native Elements](https://react-native-training.github.io/react-native-elements/) - Search bar for searching 
* [Vector Icons](https://github.com/oblador/react-native-vector-icons) - Ranking star is for display
* [Realm](https://realm.io/) - Store the API response data locally
