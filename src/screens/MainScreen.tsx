import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { filterFreeApps, loadNewPageApps } from '../actions/FreeAppActions'
import FreeAppList from '../components/FreeAppList'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"

interface Props {
    filterFreeApps: typeof filterFreeApps
    loadNewPageApps: typeof loadNewPageApps
};

class MainScreen extends Component<Props> {
    state = { search: '' };

    updateSearch = (search: string) => {
        this.setState({ search }, () => {
            this.props.filterFreeApps(search);
            this.props.loadNewPageApps();
        });
    };

    render() {
        const { search } = this.state;

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <SearchBar
                    lightTheme
                    round
                    onChangeText={this.updateSearch}
                    value={search}
                />
                <FreeAppList />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        { filterFreeApps, loadNewPageApps },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
