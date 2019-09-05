import React from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import RecommendAppView from './RecommendAppView';
import MobileApp from './MobileApp';

class RecommendView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isLoading: true};
    }

    componentDidMount() {
        return fetch('https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json')
            .then((response) => response.json())
            .then((responseJson) => {
                let appAry = [];
                for (let item in responseJson.feed.entry) {
                    appAry.push(new MobileApp(responseJson.feed.entry[item]));
                }
                this.setState({
                    isLoading: false,
                    dataSource: appAry,
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
                    data={this.state.dataSource.filter(item => item.filter(this.props.searchText))}
                    renderItem={({item, index}) => <RecommendAppView appInfo={item}/>}
                    horizontal={true}
                    keyExtractor={(item, index) => item.appID.toString()}
                    initialNumToRender={10}
                />
            </View>
        );
    }
}

export default RecommendView;

