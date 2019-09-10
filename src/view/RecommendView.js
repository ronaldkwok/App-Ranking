import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import RecommendAppView from './RecommendAppView';
import MobileApp from '../model/MobileApp';
import NetworkHelper from '../NetworkHelper';

type Props = {
    searchText: String,
};

class RecommendView extends React.Component<Props> {

    constructor(props) {
        super(props);
        this.state = {isLoading: true};
    }

    componentDidMount() {

        return NetworkHelper.getRecommendApps()
            .then((mobileApps: [MobileApp]) => {
                this.setState({
                    isLoading: false,
                    dataSource: mobileApps,
                });
            })
            .catch((error) => {
                console.error(error);
            });

    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }

        return (
            <View>
                <Text style={styles.recommendText}>推介</Text>
                <FlatList
                    style={{backgroundColor: Colors.white}}
                    data={this.state.dataSource.filter(item => item.filter(this.props.searchText))}
                    renderItem={({item, index}) => <RecommendAppView appInfo={item}/>}
                    horizontal={true}
                    keyExtractor={(item, index) => item.appID.toString()}
                    initialNumToRender={10}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    recommendText: {
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default RecommendView;

