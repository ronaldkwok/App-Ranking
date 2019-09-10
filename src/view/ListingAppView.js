import React from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppIconImageView from './AppIconImageView';
import MobileApp from '../model/MobileApp';
import Icon from 'react-native-vector-icons/Entypo';
import NetworkHelper from '../NetworkHelper';

type Props = {
    appInfo: MobileApp,
    index: number,
    onUpdateAppInfo: (appInfo: MobileApp) => void
};

class ListingAppView extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this.state = {isLoading: true};
    }

    componentDidMount() {
        if (this.props.appInfo.starsNumber) {
            return this.setState({
                isLoading: false,
            });
        }

        console.log('specific api did call', this.props.appInfo);

        return NetworkHelper.getAppDetail(this.props.appInfo.appID)
            .then((responseJson) => {
                this.props.appInfo.updateRating(responseJson);
                this.setState({
                    isLoading: false,
                }, function () {
                    this.props.onUpdateAppInfo(this.props.appInfo);
                }).catch((error) => {
                    console.error(error);
                });
            });

    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, padding: 20, height: 90}}>
                    <ActivityIndicator/>
                </View>
            );
        }
        const {appInfo, index} = this.props;

        return (
            <View style={styles.view}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={styles.rankingText}>{index + 1}</Text>
                </View>
                <AppIconImageView url={appInfo.imageUrl} round={index % 2 !== 0}/>
                <View style={styles.infoView}>
                    <Text ellipsizeMode={'tail'}
                          numberOfLines={1}
                          style={styles.titleText}>{appInfo.name}</Text>
                    <Text style={styles.categoryText}>{appInfo.category}</Text>
                    {appInfo.starsNumber ?
                        <View style={styles.starView}>
                            {this.generateStars(appInfo)}
                            <Text style={{fontSize: 10, color: Colors.dark}}>({appInfo.ratingCount})</Text>
                        </View> : null}
                </View>
            </View>
        );
    }

    generateStars(appInfo: MobileApp) {
        const stars = [];

        let starCount = Math.floor(appInfo.starsNumber);

        for (var i = 0; i < starCount; i++) {
            stars.push(<Icon name="star" size={10} color="#FC9601" key={i}/>);
        }

        for (var i = starCount; i < 5; i++) {
            stars.push(<Icon name="star" size={10} color="#999691" key={i}/>);
        }

        return stars;
    }
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light,
        alignItems: 'center',
    },
    infoView: {
        paddingHorizontal: 10,
        flex: 1,
        flexDirection: 'column',
    },
    rankingText: {
        paddingLeft: 10,
        color: Colors.dark,
        fontSize: 20,
        width: 45,
    },
    titleText: {
        fontSize: 15,
    },
    categoryText: {
        fontSize: 12,
        paddingTop: 10,
        color: Colors.dark,
    },
    starView: {
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default ListingAppView;
