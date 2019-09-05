import React from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppIconImageView from './AppIconImageView';

class ListingAppView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isLoading: false};
    }

    // componentDidMount(){
    //     console.log(this.props.appID)
    //     return fetch('https://itunes.apple.com/hk/lookup?id='+this.props.appID)
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             this.setState({
    //                 isLoading: false,
    //                 appDetail: responseJson.results[0],
    //             }, function(){
    //             });
    //
    //         })
    //         .catch((error) =>{
    //             console.error(error);
    //         });
    // }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, padding: 20}}>
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
                <AppIconImageView url={appInfo.imageUrl} round={index % 2 != 0}/>
                <View style={styles.infoView}>
                    <Text ellipsizeMode={'tail'}
                          numberOfLines={1}
                          style={styles.titleText}>{appInfo.name}</Text>
                    <Text style={styles.titleText}>{appInfo.category}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light,
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
        fontSize: 15,
    },
});

export default ListingAppView;
