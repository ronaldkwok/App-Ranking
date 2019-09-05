import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ListingAppView from './ListingAppView';
import RecommendView from './RecommendView';
import MobileApp from './MobileApp';

class ListingView extends React.Component {

    constructor(props){
        super(props);
        this.state ={ isLoading: true }
    }

    componentDidMount(){
        return fetch('https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json')
            .then((response) => response.json())
            .then((responseJson) => {

                let appAry = [];

                for (let item in responseJson.feed.entry) {
                    appAry.push(new MobileApp(responseJson.feed.entry[item]))
                }

                this.setState({
                    isLoading: false,
                    dataSource: appAry,
                }, function(){
                });

            })
            .catch((error) =>{
                console.error(error);
            });
    }

    render(){
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return(
                <FlatList
                    ListHeaderComponent={<RecommendView searchText={this.props.searchText}></RecommendView>}
                    style = {{backgroundColor: Colors.white}}
                    contentContainerStyle={{ flexGrow: 1 }}
                    data={this.state.dataSource.filter(item => item.filter(this.props.searchText) )}
                    renderItem={({item, index}) =>
                        <ListingAppView
                            appInfo={item}
                            index={index}
                        />

                    }
                    keyExtractor={({id}, index) => id}
                />
        );
    }
}

// const styles = StyleSheet.create({
//     scrollView: {
//         backgroundColor: Colors.white,
//     },
//     engine: {
//         position: 'absolute',
//         right: 0,
//     },
//     body: {
//         backgroundColor: Colors.white,
//     },
//     sectionContainer: {
//         marginTop: 32,
//         paddingHorizontal: 24,
//     },
//     sectionTitle: {
//         fontSize: 24,
//         fontWeight: '600',
//         color: Colors.black,
//     },
//     sectionDescription: {
//         marginTop: 8,
//         fontSize: 18,
//         fontWeight: '400',
//         color: Colors.dark,
//     },
//     highlight: {
//         fontWeight: '700',
//     },
//     footer: {
//         color: Colors.dark,
//         fontSize: 12,
//         fontWeight: '600',
//         padding: 4,
//         paddingRight: 12,
//         textAlign: 'right',
//     },
// });

export default ListingView;

