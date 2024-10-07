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
});