import React from 'react';
import {SafeAreaView, ScrollView, ActivityIndicator, FlatList, StyleSheet, Text, View, Image} from 'react-native';
import {Colors, DebugInstructions, ReloadInstructions} from 'react-native/Libraries/NewAppScreen';
import ListingAppView from './ListingAppView';

class ListingView extends React.Component {

    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    componentDidMount(){
        return fetch('https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json')
            .then((response) => response.json())
            .then((responseJson) => {

                let idAry = []

                for (item in responseJson.feed.entry) {
                    idAry.push(responseJson.feed.entry[item]["id"].attributes["im:id"])
                }

                this.setState({
                    isLoading: false,
                    dataSource: idAry,
                }, function(){
                });

            })
            .catch((error) =>{
                console.error(error);
            });
    }

    render(){
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return(
                <FlatList
                    style = {{backgroundColor: Colors.white}}
                    contentContainerStyle={{ flexGrow: 1 }}
                    data={this.state.dataSource}
                    renderItem={({item, index}) =>
                        <ListingAppView
                            appID={item}
                            index={index}
                        />

                    }
                    keyExtractor={({id}, index) => id}
                />
        );
    }
}

// const styles = StyleSheet.create({
//     scrollView: {
//         backgroundColor: Colors.white,
//     },
//     engine: {
//         position: 'absolute',
//         right: 0,
//     },
//     body: {
//         backgroundColor: Colors.white,
//     },
//     sectionContainer: {
//         marginTop: 32,
//         paddingHorizontal: 24,
//     },
//     sectionTitle: {
//         fontSize: 24,
//         fontWeight: '600',
//         color: Colors.black,
//     },
//     sectionDescription: {
//         marginTop: 8,
//         fontSize: 18,
//         fontWeight: '400',
//         color: Colors.dark,
//     },
//     highlight: {
//         fontWeight: '700',
//     },
//     footer: {
//         color: Colors.dark,
//         fontSize: 12,
//         fontWeight: '600',
//         padding: 4,
//         paddingRight: 12,
//         textAlign: 'right',
//     },
// });

export default ListingView;

