import React, { memo } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ImageBackground
} from 'react-native';

import Icon, { Icons } from '../Icons';
import { FS, HP, VP } from '../../utils/Responsive';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';
import { ButtonSection as Button } from '../Button';

const BannerOne: React.FunctionComponent = () => {
    return (
        <View style={{}}>
            <ImageBackground source={require(`../../assets/images/banner.png`)} style={styles.bg} imageStyle={{ borderRadius: FS(17) }}>
                <View style={styles.bannerBox}>
                    <Text style={styles.bannerTitle}>de lounge</Text>

                    <Text style={styles.bannerText}>"Refresh & Recharge – Sip on Our Freshly Squeezed Juices!"</Text>

                    <Button
                        text={'BUY NOW'}
                        onPress={() => void (0)}
                        textStyle={styles.buttonStyle}
                        mainContainerStyle={styles.buttonContainerStyle}
                        LinearGradienrColor={["#E7B800", "#E7B800"]}
                        style={styles.buttonMainStyle}
                    />

                    <View style={styles.contactBox}>
                        <Text style={styles.contactText}><Icon type={Icons.FontAwesome5} size={8} name={`globe`} color={COLORS.WHITE} /> @delounge</Text>
                        <Text style={styles.contactText}><Icon type={Icons.FontAwesome5} size={8} name={`whatsapp`} color={COLORS.WHITE} /> 1144551222</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    bg: {
        width: "100%",
        height: VP(133),
        resizeMode: "contain"
    },
    bannerBox: {
        paddingHorizontal: HP(75),
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    buttonStyle: {
        ...TextStyles.LEXEND_BOLD,
        fontSize: 10,
        color: "#451B07",
        textTransform: "uppercase",
        lineHeight: 11.1
    },
    bannerTitle: {
        ...TextStyles.CHEWY_REGULAR,
        lineHeight: 23.2,
        color: COLORS.WHITE,
        textTransform: "capitalize"
    },
    bannerText: {
        ...TextStyles.RALEWAY_MEDIUM,
        lineHeight: 12.1,
        fontSize: 9.09,
        color: "#E6BB00",
        textAlign: "center"
    },
    buttonMainStyle: {
        width: FS(72),
        height: VP(17)
    },
    buttonContainerStyle: {
        marginTop: VP(8)
    },
    contactBox: {
        flexDirection: "row",
        marginTop: VP(8),
        gap: HP(8),
    },
    contactText: {
        ...TextStyles.POPPINS_REGULAR,
        fontSize: HP(6.27),
        color: COLORS.WHITE,
        textAlign: "center"
    }
});

const BannerOneSection = memo(BannerOne);
export default BannerOneSection;