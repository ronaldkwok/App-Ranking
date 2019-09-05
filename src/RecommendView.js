import React from 'react';
import {SafeAreaView, ScrollView, ActivityIndicator, FlatList, StyleSheet, Text, View, Image} from 'react-native';
import {Colors, DebugInstructions, ReloadInstructions} from 'react-native/Libraries/NewAppScreen';
import RecommendAppView from './RecommendAppView';

class RecommendView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isLoading: true};
    }

    componentDidMount() {
        return fetch('https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json')
            .then((response) => response.json())
            .then((responseJson) => {

                let idAry = [];

                for (item in responseJson.feed.entry) {
                    idAry.push(responseJson.feed.entry[item]['id'].attributes['im:id']);
                }

                this.setState({
                    isLoading: false,
                    dataSource: idAry,
                }, function () {
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }

        return (
            <View>
                <Text>Recommend</Text>
                <FlatList
                    style={{backgroundColor: Colors.white}}
                    data={this.state.dataSource}
                    renderItem={({item, index}) =>
                        <RecommendAppView
                            appID={item}
                            index={index}
                        />

                    }
                    horizontal={true}
                    keyExtractor={({id}, index) => id}
                    initialNumToRender={10}
                />

            </View>
        );
    }
}

export default RecommendView;

