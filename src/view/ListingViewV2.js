import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { FETCH_FREE_APPS } from '../actions/index';
import { connect } from 'react-redux';
import ListingAppView from './ListingAppView';
import { bindActionCreators } from "redux";
import EmptyListView from './EmptyListView';
import NetworkHelper from '../services/NetworkHelper';

class ListingViewV2 extends Component {

    constructor(props: Props) {
        super(props);
        NetworkHelper.getTopFreeApps().then((mobileApps: [MobileApp]) => {
            this.props.FETCH_FREE_APPS(mobileApps);
        });
    }

    render() {
        return (
            <FlatList
                data={this.props.freeApps.apps}
                renderItem={({ item, index }) => (
                    <ListingAppView
                        index={index}
                        appInfo={item}
                    />
                )}
                keyExtractor={(item) => item.appID.toString()}
                onEndReachedThreshold={0.01}
                ListEmptyComponent={
                    <EmptyListView searchText={this.props.searchText} />
                }
            />
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ FETCH_FREE_APPS }, dispatch);
}

function mapStateToProps({ freeApps }) {
    return { freeApps };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingViewV2);