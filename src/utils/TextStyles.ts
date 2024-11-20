import { TextStyle, Platform } from 'react-native';

import { COLORS } from './Constants';

const isIOS = () => {
    return Platform.OS === 'ios';
};

export const TextStyles: Record<string, TextStyle> = {
    RALEWAY_SEMI_BOLD: {
        fontFamily: isIOS() ? 'Raleway-SemiBold' : 'RalewaySemiBold',
        color: COLORS.BLACK,
        fontSize: 16,
    },
    RALEWAY_BOLD: {
        fontFamily: isIOS() ? 'Raleway-Bold' : 'RalewayBold',
        color: COLORS.BLACK,
        fontSize: 16,
    },
    RALEWAY_EXTRA_BOLD: {
        fontFamily: isIOS() ? 'Raleway-ExtraBold' : 'RalewayExtraBold',
        color: COLORS.BLACK,
        fontSize: 16,
    },
    RALEWAY_REGULAR: {
        fontFamily: isIOS() ? 'Raleway-Regular' : 'RalewayRegular',
        color: COLORS.BLACK,
        fontSize: 14,
    },
    RALEWAY_MEDIUM: {
        fontFamily: isIOS() ? 'Raleway-Medium' : 'RalewayMedium',
        color: COLORS.BLACK,
        fontSize: 16,
    },
    ARCHITECTS_DAUGHTER_REGULAR: {
        fontFamily: isIOS() ? 'ArchitectsDaughter-Regular' : 'ArchitectsDaughterRegular',
        color: COLORS.BLACK,
        fontSize: 14,
    },
    LEXEND_REGULAR: {
        fontFamily: isIOS() ? 'Lexend-Regular' : 'LexendRegular',
        color: COLORS.BLACK,
        fontSize: 14,
    },
    LEXEND_BOLD: {
        fontFamily: isIOS() ? 'Lexend-Bold' : 'LexendBold',
        color: COLORS.BLACK,
        fontSize: 14,
    },
    LEXEND_SEMI_BOLD: {
        fontFamily: isIOS() ? 'Lexend-SemiBold' : 'LexendSemiBold',
        color: COLORS.BLACK,
        fontSize: 14,
    },
    LEXEND_MEDIUM: {
        fontFamily: isIOS() ? 'Lexend-Medium' : 'LexendMedium',
        color: COLORS.BLACK,
        fontSize: 14,
    },
    ROBOTO_REGULAR: {
        fontFamily: isIOS() ? 'Roboto-Regular' : 'RobotoRegular',
        color: COLORS.BLACK,
        fontSize: 14
    },
    KANIT_REGULAR: {
        fontFamily: isIOS() ? 'Kanit-Regular' : 'KanitRegular',
        color: COLORS.BLACK,
        fontSize: 14
    },
    CHEWY_REGULAR: {
        fontFamily: isIOS() ? 'Chewy-Regular' : 'ChewyRegular',
        color: COLORS.BLACK,
        fontSize: 16
    },
    POPPINS_REGULAR: {
        fontFamily: isIOS() ? 'Poppins-Regular' : 'PoppinsRegular',
        color: COLORS.BLACK,
        fontSize: 16
    },
    POPPINS_BOLD: {
        fontFamily: isIOS() ? 'Poppins-Bold' : 'PoppinsBold',
        color: COLORS.BLACK,
        fontSize: 16
    },
    POPPINS_MEDIUM: {
        fontFamily: isIOS() ? 'Poppins-Medium' : 'PoppinsMedium',
        color: COLORS.BLACK,
        fontSize: 16
    },
    POPPINS_LIGHT: {
        fontFamily: isIOS() ? 'Poppins-Light' : 'PoppinsLight',
        color: COLORS.BLACK,
        fontSize: 16
    },
    INTER_MEDIUM: {
        fontFamily: isIOS() ? 'Inter-Medium' : 'InterMedium',
        color: COLORS.BLACK,
        fontSize: 14,
    },
    INTER_SEMI_BOLD: {
        fontFamily: isIOS() ? 'Inter-SemiBold' : 'InterSemiBold',
        color: COLORS.BLACK,
        fontSize: 14,
    },
    INTER_REGULAR: {
        fontFamily: isIOS() ? 'Inter-Regular' : 'InterRegular',
        color: COLORS.BLACK,
        fontSize: 14,
    },
    LATO_REGULAR: {
        fontFamily: isIOS() ? 'Lato-Regular' : 'LatoRegular',
        color: COLORS.BLACK,
        fontSize: 14
    },
};
