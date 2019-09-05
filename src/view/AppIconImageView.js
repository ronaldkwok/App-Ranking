import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const AppIconImageView = ({url, round = false}) => {
    return <Image source={{uri: url}}
                  style={{
                      borderRadius: round? 35:15,
                      width: 70,
                      height: 70,
                      borderWidth: 1,
                      borderColor: Colors.light
                  }}/>;
};

export default AppIconImageView;
