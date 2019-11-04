import React from 'react';
import { Image } from 'react-native';
import Colors from '../common/Colors';

const AppIconImageView = ({ url, round = false, size = 70 }: { url: string, round: boolean, size: number }) => {
    return <Image source={{ uri: url }}
        style={{
            borderRadius: round ? size / 2 : size * 0.2,
            width: size,
            height: size,
            borderWidth: 1,
            borderColor: Colors.light,
        }} />;
};

export default AppIconImageView;
