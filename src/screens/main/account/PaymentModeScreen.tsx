import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ImageBackground, Dimensions, Image } from 'react-native';
import { useStripe, CardField, createToken } from '@stripe/stripe-react-native';
import { useDispatch, useSelector } from 'react-redux';

import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { FS, HP, VP } from '../../../utils/Responsive';
import Icon, { Icons } from '../../../components/Icons';
import { TextStyles } from '../../../utils/TextStyles';
import { COLORS, errorMessage } from '../../../utils/Constants';
import CustomTextInputNoEffect from '../../../components/CustomTextInputNoEffect';
import { proflieDetails } from '../../../redux/features/profile';
import { ButtonSection as Button } from '../../../components/Button';
import { cartItemList, instructionText } from '../../../redux/features/cart';
import { appliedCouponId } from '../../../redux/features/coupon';
import { orderSubmit } from '../../../utils/ApiCall';
import { AppDispatch } from '../../../redux/store';
import { setDialogContent } from '../../../redux/features/customDialog';
import Warning from '../../../assets/svgs/warning.svg';
import NormalLoader from '../../../components/NormalLoader';

const { width, height } = Dimensions.get('window');

const errorObj = { cardholderName: { status: false, text: "" }, cardNumber: { status: false, text: "" }, cardExpiry: { status: false, text: "" }, cardCVV: { status: false, text: "" } }

function PaymentModeScreen({ navigation }: { navigation: any }): React.JSX.Element {
    const scrollViewRef = useRef<any>(null);

    const [loading, setLoading] = useState<boolean>(false);


    return (
        <OuterLayout containerStyle={{ backgroundColor: "#FFF9F9" }}>
            <NormalLoader visible={loading} />
            <InnerBlock>
                <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
                    <View style={{ paddingVertical: HP(20) }}>
                        {/* Navigation section */}
                        <View style={{ paddingHorizontal: HP(16) }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                >
                                    <Icon type={Icons.Feather} size={FS(24)} name={`chevron-left`} color={`#6C6C70`} />
                                </TouchableOpacity>
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", gap: HP(5) }}>
                                    <Text style={styles.topHeading}>Payment Modes</Text>
                                </View>
                            </View>
                        </View>

                        {/* Body section */}
                        <View style={{ marginTop: VP(26), paddingHorizontal: HP(26) }}>
                            {/* Card Image */}
                            <View style={{ borderRadius: HP(17.97), width: width }}>
                                <ImageBackground source={require(`../../../assets/images/card.png`)} style={[styles.cardBG]} resizeMode='contain'>

                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.cardBGTitle}>SoCard</Text>

                                        <Text style={styles.cardBGNo}>••••  ••••  ••••  8374</Text>
                                    </View>

                                    <View style={{ flexDirection: "row", marginTop: VP(36.27), gap: HP(26.96), flex: 1 }}>
                                        <View style={{}}>
                                            <Text style={styles.cardBGname}>Card holder name</Text>
                                            <Text style={styles.cardBGValue}>•••  •••</Text>
                                        </View>

                                        <View style={{}}>
                                            <Text style={styles.cardBGname}>Expiry date</Text>
                                            <Text style={styles.cardBGValue}>••• / •••</Text>
                                        </View>
                                    </View>

                                </ImageBackground>
                            </View>

                            {/* credit card section */}
                            <View style={{ marginTop: VP(20.96) }}>
                                <Text style={styles.cardHeading}>Credit card</Text>

                                <View style={styles.cardSection}>

                                    <View style={{ flexDirection: "row", alignItems: "center", gap: HP(21.34) }}>
                                        <Icon type={Icons.Feather} size={FS(18)} name={`credit-card`} color={`#101010`} />

                                        <View>
                                            <Text style={styles.cardText}>MasterCard</Text>
                                            <Text style={styles.cardNumber}>**** **** 0783 7873</Text>
                                        </View>
                                    </View>

                                    <Image source={require(`../../../assets/images/card-icon.png`)} style={[styles.iconImg]} />
                                </View>

                                <View style={[styles.cardSection, { borderColor: "#EDEDED" }]}>

                                    <View style={{ flexDirection: "row", alignItems: "center", gap: HP(21.34) }}>
                                        <Icon type={Icons.Feather} size={FS(18)} name={`credit-card`} color={`#101010`} />

                                        <View>
                                            <Text style={styles.cardText}>Paypal</Text>
                                            <Text style={styles.cardNumber}>**** **** 0582 4672</Text>
                                        </View>
                                    </View>

                                    <Image source={require(`../../../assets/images/paypal.png`)} style={[styles.iconImg]} />
                                </View>

                                <View style={[styles.cardSection, { borderColor: "#EDEDED" }]}>

                                    <View style={{ flexDirection: "row", alignItems: "center", gap: HP(21.34) }}>
                                        <Icon type={Icons.Feather} size={FS(18)} name={`credit-card`} color={`#101010`} />

                                        <View>
                                            <Text style={styles.cardText}>Apple Pay</Text>
                                            <Text style={styles.cardNumber}>**** **** 0582 4672</Text>
                                        </View>
                                    </View>

                                    <Image source={require(`../../../assets/images/apple-pay.png`)} style={[styles.iconImg]} />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </InnerBlock >
        </OuterLayout >
    )
}

const styles = StyleSheet.create({
    topHeading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 18,
        textTransform: "capitalize",
        top: VP(-2),
        textAlign: "center"
    },
    boxText: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 14,
        textTransform: "capitalize"
    },
    buttonText: {
        ...TextStyles.RALEWAY_MEDIUM,
        color: COLORS.BUTTON,
        fontSize: 14,
        textTransform: "uppercase"
    },
    cardBG: {
        width: "100%",
        padding: HP(26.95)
    },
    cardBGTitle: {
        ...TextStyles.INTER_SEMI_BOLD,
        fontSize: 20.22,
        lineHeight: HP(29.2),
        color: COLORS.WHITE
    },
    cardBGNo: {
        ...TextStyles.INTER_MEDIUM,
        fontSize: 24.96,
        lineHeight: HP(35.9),
        color: COLORS.WHITE,
        marginTop: VP(36.27)
    },
    cardBGname: {
        ...TextStyles.INTER_REGULAR,
        fontSize: 11.23,
        lineHeight: HP(18),
        color: COLORS.WHITE
    },
    cardBGValue: {
        ...TextStyles.INTER_MEDIUM,
        fontSize: 15.72,
        lineHeight: HP(22.5),
        color: COLORS.WHITE,
        marginTop: VP(4.49)
    },
    cardHeading: {
        ...TextStyles.INTER_MEDIUM,
        fontSize: 17.97,
        lineHeight: HP(27),
        color: "#101010"
    },
    cardText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 15.72,
        lineHeight: HP(22.5),
        color: "#101010"
    },
    cardNumber: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 13.48,
        lineHeight: HP(18),
        color: "#878787"
    },
    iconImg: {
        width: FS(35.94),
        height: VP(35.94),
        resizeMode: "contain",
    },
    cardSection: {
        borderRadius: HP(17.97),
        borderWidth: 1,
        borderColor: COLORS.BUTTON,
        marginTop: VP(17.93),
        flexDirection: "row",
        paddingVertical: VP(17.97),
        paddingHorizontal: HP(21.34),
        justifyContent: "space-between",
        alignItems: "center"
    },
    label: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 14,
        textTransform: "capitalize"
    },
    styleInput: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 14,
        borderRadius: HP(7),
        padding: HP(16),
        borderWidth: 1,
        borderColor: "#C0C0C0"
    },
    buttonStyle: {
        ...TextStyles.LEXEND_SEMI_BOLD,
        fontSize: 20,
        color: COLORS.WHITE,
        textTransform: "uppercase"
    },
    cardContainer: {
        height: 50,
        marginVertical: 30,
    },
});

export default PaymentModeScreen;