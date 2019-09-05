import React from 'react';
import {SafeAreaView} from 'react-native';
import ListingView from './view/ListingView';
import {SearchBar} from 'react-native-elements';

class MainScreen extends React.Component {
    state = {
        search: '',
    };

    updateSearch = search => {
        this.setState({search});
    };

    render() {
        const {search} = this.state;

        return (
            <SafeAreaView style={{flex: 1}}>

                <SearchBar lightTheme
                           round
                           onChangeText={this.updateSearch}
                           value={search}
                />
                <ListingView searchText={search}/>
            </SafeAreaView>
        );
    }
};

export default MainScreen;
