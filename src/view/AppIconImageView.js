import React from 'react';
import {Image} from 'react-native';
import Colors from '../Colors';

const AppIconImageView = ({url, round = false, size = 70}) => {
    return <Image source={{uri: url}}
                  style={{
                      borderRadius: round ? size / 2 : size * 0.2,
                      width: size,
                      height: size,
                      borderWidth: 1,
                      borderColor: Colors.light,
                  }}/>;
};

export default AppIconImageView;
