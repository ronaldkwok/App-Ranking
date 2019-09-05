import React from 'react';
import {Image, StyleSheet} from 'react-native';

const AppIconImageView = ({url, round = false}) => {
    return <Image source={{uri: url}}
                  style={round ? styles.roundAppIconImage : styles.appIconImage}/>;
};

const styles = StyleSheet.create({
    roundAppIconImage: {
        borderRadius: 35,
        width: 70,
        height: 70,
    },
    appIconImage: {
        borderRadius: 15,
        width: 70,
        height: 70,
    },
});

export default AppIconImageView;
