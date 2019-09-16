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

type State = {
    isLoading: boolean,
    page: number,
    isRefreshing: boolean,
    displaySource: [MobileApp],
}

class ListingView extends React.Component<Props, State> {

    dataSource: [MobileApp] = [];
    displayDataSource: [MobileApp] = [];

    constructor(props) {
        super(props);
        this.state = {isLoading: true, page: 0, isRefreshing: false, displaySource: []};
    }

    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean {
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
            .catch(() => {
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
        if (this.state.displaySource.length >= this.displayDataSource.length) {
            return;
        }

        let appPerPage = 10;
        let currentPage = this.state.page;

        this.setState({
            page: this.state.page + 1,
            displaySource: [...this.state.displaySource, ...this.displayDataSource.slice(currentPage * appPerPage, (currentPage + 1) * appPerPage)],
        });
    };

    handleUpdateAppInfo = (appInfo: MobileApp) => {
        let objIndex = this.dataSource.findIndex((obj => obj.appID === appInfo.appID));
        if (this.dataSource.length > objIndex) {
            this.dataSource[objIndex] = appInfo;
        }
    };

    handleRefresh = () => {
        this.recommendViewRef.refresh();
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
                ListHeaderComponent={
                    <RecommendView ref={(ref) => {
                        this.recommendViewRef = ref;
                    }} searchText={this.props.searchText}/>
                }
                ref={(ref) => {
                    this.flatListRef = ref;
                }}
                contentContainerStyle={{flexGrow: 1}}
                data={this.state.displaySource}
                renderItem={({item, index}) =>
                    <ListingAppView index={index}
                                    appInfo={item}
                                    onUpdateAppInfo={this.handleUpdateAppInfo}/>}
                keyExtractor={(item, _) => item.appID.toString()}
                refreshing={this.state.isRefreshing}
                onRefresh={this.handleRefresh}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={0.01}
                ListEmptyComponent={<EmptyListView searchText={this.props.searchText}/>}
            />

        );
    }
}

export default ListingView;
