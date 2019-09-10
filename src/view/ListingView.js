import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ListingAppView from './ListingAppView';
import RecommendView from './RecommendView';
import MobileApp from '../model/MobileApp';
import NetworkHelper from '../NetworkHelper';

type Props = {
    searchText: string,
};

class ListingView extends React.Component<Props> {

    dataSource: [MobileApp] = [];
    displayDataSource: [MobileApp] = [];

    constructor(props) {
        super(props);
        this.state = {isLoading: true, page: 0, isRefreshing: false, displaySource: []};
    }

    componentDidUpdate(prevProps: Readonly<Props>) {
        if (this.props.searchText != prevProps.searchText) {

            if (this.props.searchText) {
                this.displayDataSource = this.dataSource.filter(item => item.filter(this.props.searchText));
            } else {
                this.displayDataSource = this.dataSource;
            }

            this.flatListRef.scrollToOffset({animated: false, offset: 0});
            this.setState({
                page: 0,
                displaySource: [],
                isRefreshing: false,
            }, this.handleLoadMore);
        }
    }

    componentDidMount() {
        return NetworkHelper.getTopFreeApps()
            .then((mobileApps: [MobileApp]) => {
                console.log('api did call');
                this.dataSource = mobileApps;
                this.displayDataSource = this.dataSource;

                this.setState({
                    isLoading: false,
                }, this.handleLoadMore);

            }).catch((error) => {
                console.error(error);
            });
    }

    handleLoadMore = () => {
        console.log('enter reload');

        if (this.state.displaySource.length >= this.displayDataSource.length || this.state.isRefreshing) {
            return;
        }

        console.log('Start reload');

        this.setState({isRefreshing: true});

        let appPerPage = 10;
        let currentPage = this.state.page;

        this.setState({
            page: this.state.page + 1,
            displaySource: [...this.state.displaySource, ...this.displayDataSource.slice(currentPage * appPerPage, currentPage * appPerPage + 10)],
        }, () => {
            this.setState({isRefreshing: false});
        });
    };

    handleUpdateAppInfo = (appInfo: MobileApp) => {
        console.log('Update app');
        let objIndex = this.dataSource.findIndex((obj => obj.appID == appInfo.appID));
        if (this.dataSource.length > objIndex) {
            this.dataSource[objIndex] = appInfo;
        }
    };

    handleRefresh = () => {
        console.log('Pull to refresh');
        this.setState({
            page: 0,
            displaySource: [],
        }, this.handleLoadMore);
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
                ref={(ref) => {
                    this.flatListRef = ref;
                }}
                style={{backgroundColor: Colors.white}}
                contentContainerStyle={{flexGrow: 1}}
                data={this.state.displaySource}
                renderItem={({item, index}) =>
                    <ListingAppView index={index}
                                    appInfo={item}
                                    onUpdateAppInfo={this.handleUpdateAppInfo}/>}
                keyExtractor={(item, index) => item.appID.toString()}
                refreshing={this.state.isRefreshing}
                onRefresh={this.handleRefresh}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={1}
            />

        );
    }
}

export default ListingView;

