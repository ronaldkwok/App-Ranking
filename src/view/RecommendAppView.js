import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppIconImageView from './AppIconImageView';
import MobileApp from '../model/MobileApp';

type Props = {
    appInfo: MobileApp,
};

class RecommendAppView extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this.state = {isLoading: false};
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }

        const {appInfo} = this.props;

        return (
            <View style={styles.view}>
                <AppIconImageView url={appInfo.imageUrl}/>
                <Text ellipsizeMode={'tail'}
                      numberOfLines={2}
                      style={styles.titleText}>{appInfo.name}</Text>
                <Text style={styles.categoryText}>{appInfo.category}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 25,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light,
        width: 90,

    },
    infoView: {
        padding: 5,
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
        fontSize: 12,
    },
    categoryText: {
        fontSize: 12,
        paddingTop: 5,
        color: Colors.dark,
        textAlign: 'left',
    }
});

export default RecommendAppView;
