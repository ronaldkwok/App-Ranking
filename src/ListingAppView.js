import React from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

class ListingAppView extends React.Component {

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

        let appInfo = this.props.appInfo
        return (
            <View style={styles.view}>
                <View style={{justifyContent: 'center',
                    alignItems: 'center'}}>
                    <Text style={styles.rankingText}>{this.props.index+1}</Text>
                </View>
                <Image source={{uri: appInfo["im:image"][1].label}}
                       style={ styles.appIconImage}/>
                <View style={styles.infoView}>
                    <Text ellipsizeMode={"tail"}
                          numberOfLines={1}
                          style={styles.titleText}>{appInfo["im:name"].label}</Text>
                    <Text style={styles.titleText}>{appInfo.category.attributes.label}</Text>
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
        borderBottomColor: Colors.light
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

export default ListingAppView
