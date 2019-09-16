import React from 'react';
import {ActivityIndicator, FlatList, View, Alert} from 'react-native';
import ListingAppView from './ListingAppView';
import RecommendView from './RecommendView';
import MobileApp from '../model/MobileApp';
import NetworkHelper from '../NetworkHelper';
import EmptyListView from './EmptyListView';
import StorageHelper from '../StorageHelper';

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

    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<S>, nextContext: any): boolean {
        if (this.props.searchText !== nextProps.searchText) {
            if (nextProps.searchText) {
                this.displayDataSource = this.dataSource.filter(item => item.filter(nextProps.searchText));
            } else {
                this.displayDataSource = this.dataSource;
            }

            this.handleInitDisplay();
            return false;
        }
        return true;
    }

    componentDidMount() {
        this.handleGetAppData();
    }

    handleGetAppData() {
        NetworkHelper.getTopFreeApps()
            .then((mobileApps: [MobileApp]) => {
                this.dataSource = mobileApps;
                this.displayDataSource = this.dataSource;
                this.handleInitDisplay();
            })
            .catch((error) => {
                Alert.alert(
                    'Error',
                    'Error occur',
                    [
                        {
                            text: 'OK', onPress: () => {
                                this.dataSource = StorageHelper.getApps(MobileApp.appType.Ranking);
                                this.displayDataSource = this.dataSource;
                                this.handleInitDisplay();
                            },
                        },
                    ],
                    {cancelable: false},
                );
            });
    }

    handleInitDisplay() {
        this.setState({
            isLoading: false,
            page: 1,
            displaySource: this.displayDataSource.slice(0, 10),
            isRefreshing: false,
        }, () => {
            this.flatListRef.scrollToOffset({animated: false, offset: 0});
        });
    }

    handleLoadMore = () => {
        this.time = (new Date()).getTime();

        if (this.state.displaySource.length >= this.displayDataSource.length || this.state.onMomentumScrollEnd) {
            return;
        }

        this.setState({onMomentumScrollEnd: true});

        let appPerPage = 10;
        let currentPage = this.state.page;

        this.setState({
            page: this.state.page + 1,
            displaySource: [...this.state.displaySource, ...this.displayDataSource.slice(currentPage * appPerPage, (currentPage + 1) * appPerPage)],
        }, () => {
            this.setState({onMomentumScrollEnd: false});
        });
    };

    handleUpdateAppInfo = (appInfo: MobileApp) => {
        let objIndex = this.dataSource.findIndex((obj => obj.appID === appInfo.appID));
        if (this.dataSource.length > objIndex) {
            this.dataSource[objIndex] = appInfo;
        }
    };

    handleRefresh = () => {
        this.flatListRef.header
        this.setState({
            isRefreshing: true,
            displaySource: [],
        }, () => {
            this.handleGetAppData();
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
                ref={(ref) => {
                    this.flatListRef = ref;
                }}
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
                onEndReachedThreshold={0.01}
                onMomentumScrollBegin={() => {
                    this.state.onMomentumScrollEnd = false;
                }}
                ListEmptyComponent={<EmptyListView searchText={this.props.searchText}/>}
            />

        );
    }
}

export default ListingView;
