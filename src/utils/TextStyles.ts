import { TextStyle } from 'react-native';

import { FS } from './Responsive';
import { COLORS } from './Constants';

export const TextStyles: Record<string, TextStyle> = {
    RALEWAY_SEMI_BOLD: {
        fontFamily: 'RalewaySemiBold',
        color: COLORS.BLACK,
        fontSize: 16,
    },
    RALEWAY_BOLD: {
        fontFamily: 'RalewayBold',
        color: COLORS.BLACK,
        fontSize: 16,
    },
    RALEWAY_EXTRA_BOLD: {
        fontFamily: 'RalewayExtraBold',
        color: COLORS.BLACK,
        fontSize: 16,
    },
    RALEWAY_REGULAR: {
        fontFamily: 'RalewayRegular',
        color: COLORS.BLACK,
        fontSize: 14,
    },
    RALEWAY_MEDIUM: {
        fontFamily: 'RalewayMedium',
        color: COLORS.BLACK,
        fontSize: 16,
    },
    ARCHITECTS_DAUGHTER_REGULAR: {
        fontFamily: 'ArchitectsDaughterRegular',
        color: COLORS.BLACK,
        fontSize: 14,
    },
    LEXEND_REGULAR: {
        fontFamily: 'LexendRegular',
        color: COLORS.BLACK,
        fontSize: 14,
    },
    ROBOTO_REGULAR: {
        fontFamily: 'RobotoRegular',
        color: COLORS.BLACK,
        fontSize: 14
    },
    KANIT_REGULAR: {
        fontFamily: 'KanitRegular',
        color: COLORS.BLACK,
        fontSize: 14
    },
};
