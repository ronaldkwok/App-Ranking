import React from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MobileApp from './MobileApp';

class RecommendAppView extends React.Component {

    constructor(props){
        super(props);
        this.state ={ isLoading: false}
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

    render(){
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        let app : MobileApp = this.props.appInfo

        return (
            <View style={styles.view}>
                <Image source={{uri: app.imageUrl}}
                       style={ styles.appIconImage}/>
                    <Text ellipsizeMode={"tail"}
                          numberOfLines={2}
                          style={styles.titleText}>{app.name}</Text>
                    <Text style={styles.titleText}>{app.category}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light,
        width: 120
    },
    infoView: {
        padding: 5,
        flex:1,
        flexDirection:'column',
    },
    rankingText: {
        paddingLeft: 10,
        color: Colors.dark,
        fontSize: 20,
        width: 45
    },
    titleText: {
        fontSize: 15,
    },
    appIconImage: {
        borderRadius: 15,
        width: 70,
        height: 70
    }
});

export default RecommendAppView
