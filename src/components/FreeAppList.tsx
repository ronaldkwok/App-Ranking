import React, { Component, createRef } from 'react'
import { View, ActivityIndicator, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { fetchFreeApps, loadNewPageApps } from '../actions/index'
import EmptyListView from '../view/EmptyListView'
import ListingAppView from '../view/ListingAppView'
import MobileApp from '../model/MobileApp'
import { FreeAppsState } from '../reducers/FreeAppReducer'

interface Props {
    fetchFreeApps: typeof fetchFreeApps
    loadNewPageApps: typeof loadNewPageApps
    freeApps: FreeAppsState
};

class FreeAppList extends Component<Props> {

    flatListRef: FlatList<MobileApp> | null = null

    componentDidUpdate(prevProps: Props) {
        if (this.props.freeApps.searchText !== prevProps.freeApps.searchText) {
            if (this.flatListRef) {
                this.flatListRef.scrollToOffset({ animated: false, offset: 0 });
            }
        }
    }

    componentDidMount() {
        this.props.fetchFreeApps()
    }

    render() {
        const { displayApps, searchText, isFetching } = this.props.freeApps;

        if (isFetching) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <FlatList
                data={displayApps}
                ref={(ref) => { this.flatListRef = ref; }}
                renderItem={({ item, index }: { item: MobileApp, index: number }) => {
                    return <ListingAppView index={index} appInfo={item} />
                }}
                keyExtractor={(item) => item.appID}
                onEndReachedThreshold={0.01}
                onEndReached={this.props.loadNewPageApps}
                ListEmptyComponent={
                    <EmptyListView searchText={searchText} />
                }
                initialNumToRender={10}
            />
        )
    }
}

const mapStateToProps = ({ freeApps }: { freeApps: FreeAppsState }) => ({ freeApps })

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        { fetchFreeApps, loadNewPageApps },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(FreeAppList);
