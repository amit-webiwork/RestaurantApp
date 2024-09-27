import React, { memo } from 'react';
import {
    View,
    StyleSheet,
    Text,
    StyleProp,
    TextStyle
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { TextStyles } from '../utils/TextStyles';

interface Props {
    title: string;
    textStyle?: StyleProp<TextStyle>;
}

const Heading: React.FunctionComponent<Props> = ({ title, textStyle }) => {
    return (
        <View style={styles.main}>
            <Text style={[styles.textStyle, textStyle]}>{title}</Text>

            <LinearGradient
                colors={['#B20C79', '#E2E2E2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.line}
            >
            </LinearGradient>
        </View >
    );
};

const styles = StyleSheet.create({
    main: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    },
    textStyle: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 14
    },
    line: {
        height: 1,
        width: "100%",
        flex: 1,
        flexGrow: 1
    },
});

const HeadingSection = memo(Heading);
export default HeadingSection;