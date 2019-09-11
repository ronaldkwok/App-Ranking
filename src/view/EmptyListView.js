import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const EmptyListView = ({ searchText }) => {
    return (
        <View style={{flex: 1,
            justifyContent: 'center',
            alignItems: 'center'}}>
            <Text style={styles.text}>沒有結果</Text>
            <Text style={styles.searchText}>「{searchText}」</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        padding: 5
    },
    searchText: {
        fontSize: 18,
        padding: 5
    }
});

export default EmptyListView;
