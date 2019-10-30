import React, { Component } from 'react'
import { View, ActivityIndicator, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { fetchFreeApps, loadMoreFreeApps } from '../actions/index'
import EmptyListView from '../view/EmptyListView'
import ListingAppView from '../view/ListingAppView'

class FreeAppList extends Component {

    componentDidMount() {
        this.props.fetchFreeApps();
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
                renderItem={({ item, index }) => (
                    <ListingAppView index={index} appInfo={item} />
                )}
                keyExtractor={(item) => item.name}
                onEndReachedThreshold={0.01}
                onEndReached={this.props.loadMoreFreeApps}
                ListEmptyComponent={
                    <EmptyListView searchText={searchText} />
                }
            />
        )
    }
}

const mapStateToProps = ({ freeApps }) => {
    return { freeApps };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchFreeApps, loadMoreFreeApps }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(FreeAppList);
