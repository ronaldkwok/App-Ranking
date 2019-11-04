import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../common/Colors'
import AppIconImageView from './AppIconImageView'
import MobileApp from '../model/MobileApp'
import Icon from 'react-native-vector-icons/Entypo'

type Props = {
    appInfo: MobileApp,
    index: number,
};

class ListingAppView extends Component<Props> {

    render() {
        const { appInfo, index } = this.props;
        return (
            <View style={styles.view}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={styles.rankingText}>{index + 1}</Text>
                </View>
                <AppIconImageView url={appInfo.imageUrl} round={index % 2 !== 0} />
                <View style={styles.infoView}>
                    <Text ellipsizeMode={'tail'}
                        numberOfLines={1}
                        style={styles.titleText}>{appInfo.name}</Text>
                    <Text style={styles.categoryText}>{appInfo.category}</Text>
                    {appInfo.starsNumber ?
                        <View style={styles.starView}>
                            {this.generateStars(appInfo.starsNumber)}
                            <Text style={{ fontSize: 10, color: Colors.dark }}>({appInfo.ratingCount})</Text>
                        </View> : null}
                </View>
            </View>
        );
    }

    generateStars = (starsCount: number) => {
        const starCount = Math.floor(starsCount);
        let stars = [];

        for (var i = 0; i < starCount; i++) {
            stars.push(<Icon name="star" size={10} color={Colors.yellow} key={i} />);
        }

        for (i = starCount; i < 5; i++) {
            stars.push(<Icon name="star" size={10} color={Colors.light} key={i} />);
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
