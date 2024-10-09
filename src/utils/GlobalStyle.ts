import { StyleSheet } from 'react-native';

import { COLORS } from './Constants';
import { TextStyles } from './TextStyles';
import { FS, HP, VP } from './Responsive';

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
    },
    filterIconContainer: {
        backgroundColor: COLORS.HOME_ICONS,
        width: FS(36),
        height: FS(36),
        borderRadius: HP(6),
        alignItems: 'center',
        justifyContent: 'center'
    },
    filterIconRight: {
        width: FS(16.67),
        height: VP(15),
        resizeMode: 'contain'
    },
    outOfStockBg: {
        opacity: 0.8,
    },
    outOfStockContainer: {
        opacity: 0.5,
    },
    outOfStockLabel: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 0, 0, 1)', // Red label background
        padding: HP(6),
        alignItems: 'center',
        borderBottomLeftRadius: FS(16.42),
        borderBottomRightRadius: FS(16.42),
    },
    outOfStockText: {
        ...TextStyles.RALEWAY_BOLD,
        color: COLORS.WHITE,
        fontSize: 14,
    },
});