import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ListingAppView from './ListingAppView';
import RecommendView from './RecommendView';
import MobileApp from '../model/MobileApp';

type Props = {
    searchText: String,
};

class ListingView extends React.Component<Props> {

    constructor(props) {
        super(props);
        this.state = {isLoading: true, page: 1, isRefreshing: false};
    }

    componentDidMount() {
        return fetch('https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json')
            .then((response) => response.json())
            .then((responseJson) => {

                console.log("api did call")
                let appAry = responseJson.feed.entry.map(item => new MobileApp(item));

                this.setState({
                    isLoading: false,
                    dataSource: appAry,
                    displaySource: appAry.slice(0,10)
                }, function () {
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    handleLoadMore = () => {
        if (this.state.displaySource.length >= this.state.dataSource.length || this.state.isRefreshing) {
            return
        }

        console.log("Start reload")

        this.setState( {isRefreshing: true})

        let appPerPage = 10;
        let currentPage = this.state.page;

        this.setState({
            isRefreshing: false,
            page: this.state.page + 1,
            displaySource: [...this.state.displaySource, ...this.state.dataSource.slice(currentPage*appPerPage,currentPage*appPerPage + 10)]
        });
    };

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }

        return (
            <FlatList
                ListHeaderComponent={<RecommendView searchText={this.props.searchText}/>}
                style={{backgroundColor: Colors.white}}
                contentContainerStyle={{flexGrow: 1}}
                data={this.state.displaySource.filter(item => item.filter(this.props.searchText))}
                renderItem={({item, index}) => <ListingAppView index={index} appInfo={item}/>}
                keyExtractor={(item, index) => item.appID.toString()}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={0.5}
                initialNumToRender={10}
            />

        );
    }
}

export default ListingView;

