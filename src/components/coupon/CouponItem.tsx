import React, { memo } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground
} from 'react-native';

import { FS, HP, VP } from '../../utils/Responsive';
import { TextStyles } from '../../utils/TextStyles';
import { COLORS } from '../../utils/Constants';

interface Props {
    data: any;
}

const CouponItem: React.FunctionComponent<Props> = ({ data }) => {

    return (
        <View style={styles.boxContainer}>
            <View style={{}}>
                <ImageBackground source={require(`../../assets/images/coupon-card.png`)} style={styles.cardBG} resizeMode='stretch'>
                    <Text style={styles.leftText}>off</Text>
                    <Text style={styles.leftText}>flat</Text>
                </ImageBackground>
            </View>
            <View style={styles.boxSubContainer}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.title}>AXIS120</Text>
                    <TouchableOpacity
                        onPress={() => void (0)}
                        style={{}}
                    >
                        <Text style={styles.link}>apply</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.subTitle}>add $260 more to avail this offer</Text>

                    <Text style={styles.info}>get flat &120 discount using axis bank MY ZONE credit cards</Text>

                    <Image source={require(`../../assets/images/line.png`)} style={{ height: VP(1), width: "100%", marginTop: VP(14) }} />

                    <Text style={styles.bottomInfo}>flat $120 discount on orders above $700</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    boxContainer: {
        flexDirection: "row"
    },
    boxSubContainer: {
        backgroundColor: COLORS.WHITE,
        paddingVertical: HP(15),
        paddingHorizontal: HP(20),
        flex: 1,
        borderTopRightRadius: HP(20),
        borderBottomRightRadius: HP(20)
    },
    cardBG: {
        width: FS(47.79),
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        gap: HP(20)
    },
    leftText: {
        ...TextStyles.RALEWAY_BOLD,
        color: COLORS.WHITE,
        fontSize: 20,
        textTransform: "uppercase",
        transform: [{ rotate: '270deg' }]
    },
    title: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 20,
    },
    link: {
        ...TextStyles.RALEWAY_BOLD,
        color: COLORS.BUTTON,
        fontSize: 16,
        textTransform: "uppercase",
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
    },
    subTitle: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: "#7E7E7E",
        fontSize: 16,
        textTransform: "capitalize",
        marginTop: VP(6)
    },
    info: {
        ...TextStyles.RALEWAY_MEDIUM,
        color: "#8E8F91",
        fontSize: 14,
        textTransform: "capitalize",
        marginTop: VP(20)
    },
    bottomInfo: {
        ...TextStyles.RALEWAY_BOLD,
        color: "#656565",
        fontSize: 16,
        textTransform: "capitalize",
        marginTop: VP(14.96)
    }
});

const CouponItemSection = memo(CouponItem);
export default CouponItemSection;