import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import RecommendAppView from '../view/RecommendAppView'
import Colors from '../common/Colors';
import { bindActionCreators } from "redux"
import { RecommendAppsState } from '../reducers/RecommendAppReducer'

interface Props {
    recommendApps: RecommendAppsState
};

class RecommendAppList extends Component<Props> {

    render() {
        const { displayApps, searchText, isFetching } = this.props.recommendApps;

        return (
            <View>
                {displayApps.length ? <Text style={styles.recommendText}>推介</Text> : null}
                <FlatList
                    style={{
                        backgroundColor: Colors.white,
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.light,
                    }}
                    data={displayApps}
                    renderItem={({ item }) => <RecommendAppView appInfo={item} />}
                    horizontal={true}
                    keyExtractor={(item) => item.appID}
                    initialNumToRender={10}
                />
            </View>
        )
    }
}

const mapStateToProps = ({ recommendApps }: { recommendApps: RecommendAppsState }) => ({
    recommendApps
})

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {},
        dispatch
    );

const styles = StyleSheet.create({
    recommendText: {
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(RecommendAppList);
