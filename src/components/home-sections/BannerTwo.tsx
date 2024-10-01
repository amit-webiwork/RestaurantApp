import React, { memo } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ImageBackground
} from 'react-native';

import { VP } from '../../utils/Responsive';

const BannerTwo: React.FunctionComponent = () => {
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

const BannerTwoSection = memo(BannerTwo);
export default BannerTwoSection;
