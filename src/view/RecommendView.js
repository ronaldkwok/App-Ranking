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

    dataSource: [MobileApp] = [];

    constructor(props) {
        super(props);
        this.state = {isLoading: true};
    }

    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<S>, nextContext: any): boolean {
        if (this.props.searchText !== nextProps.searchText) {
            this.setState({
                displaySource: this.dataSource.filter(item => item.filter(nextProps.searchText)),
            });

            return false;
        }
        return true;
    }

    componentDidMount() {
        return NetworkHelper.getRecommendApps()
            .then((mobileApps: [MobileApp]) => {
                this.dataSource = mobileApps;
                this.setState({
                    isLoading: false,
                    displaySource: mobileApps,
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
                {this.state.displaySource.length ? <Text style={styles.recommendText}>推介</Text> : null}
                <FlatList
                    style={{
                        backgroundColor: Colors.white,
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.light,
                    }}
                    data={this.state.displaySource}
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

