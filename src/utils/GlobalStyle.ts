import { StyleSheet } from 'react-native';

import { COLORS } from './Constants';
import { TextStyles } from './TextStyles';

export const globalStyle = StyleSheet.create({
    containerStyle: {
        backgroundColor: COLORS.BACKGROUND,
    },
    error: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: COLORS.RED,
        fontSize: 10,
        alignSelf: "flex-start",
        textTransform: "capitalize"
    }
});