import React from 'react';
import { SafeAreaView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Provider } from 'react-redux';
import { filterFreeApps, loadMoreFreeApps } from '../actions/FreeAppActions';

import mainStore from '../stores/mainStore';
import FreeAppList from '../components/FreeAppList';

class MainScreen extends React.Component {
    state = { search: '' };

    updateSearch = search => {
        this.setState({ search }, () => {
            mainStore.dispatch(filterFreeApps(search));
            mainStore.dispatch(loadMoreFreeApps());
        });
    };

    render() {
        const { search } = this.state;

        return (
            <Provider store={mainStore}>
                <SafeAreaView style={{ flex: 1 }}>
                    <SearchBar
                        lightTheme
                        round
                        onChangeText={this.updateSearch}
                        value={search}
                    />
                    <FreeAppList />
                </SafeAreaView>
            </Provider>
        );
    }
}

export default MainScreen;
