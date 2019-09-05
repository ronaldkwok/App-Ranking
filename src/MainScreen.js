import React from 'react';
import {SafeAreaView, View} from 'react-native';
import ListingView from './ListingView';
import RecommendView from './RecommendView';


const MainScreen = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
                <RecommendView/>
                <ListingView/>
        </SafeAreaView>
        );
};

export default MainScreen;
