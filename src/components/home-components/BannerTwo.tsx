import React, { useRef, useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
    StyleSheet,
    ActivityIndicator,
    TextStyle,
    Text,
    TextInput,
    Image,
    FlatList,
    ImageBackground
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Icon, { Icons } from '../Icons';
import { FS, HP, VP } from '../../utils/Responsive';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';
import { Button } from '../Button';

export const BannerTwo: React.FunctionComponent = () => {
    return (
        <TouchableOpacity
            onPress={() => void (0)}
            style={{}}
        >
            <ImageBackground source={require(`../../assets/images/banner-1.png`)} style={styles.bg}>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    bg: {
        width: "100%",
        height: VP(194),
        resizeMode: "contain",
    },
});
