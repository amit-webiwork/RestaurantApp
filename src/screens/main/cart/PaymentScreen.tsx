import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ImageBackground, Dimensions, Image } from 'react-native';

import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { FS, HP, VP } from '../../../utils/Responsive';
import Icon, { Icons } from '../../../components/Icons';
import { TextStyles } from '../../../utils/TextStyles';
import { COLORS, errorMessage } from '../../../utils/Constants';
import CustomTextInputNoEffect from '../../../components/CustomTextInputNoEffect';
import { useDispatch, useSelector } from 'react-redux';
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

function PaymentScreen({ navigation }: { navigation: any }): React.JSX.Element {
    const dispatch: AppDispatch = useDispatch();

    const CartItemList = useSelector(cartItemList);
    const InstructionText = useSelector(instructionText);
    const AppliedCouponId = useSelector(appliedCouponId);
    const ProflieDetails = useSelector(proflieDetails);

    const scrollViewRef = useRef<any>(null);

    const { user } = ProflieDetails;

    const [error, setError] = useState(errorObj);
    const [cardholderName, setCardholderName] = useState(user?.name);
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCVV, setCardCVV] = useState("");
    const [addCard, setAddCard] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleExpiryDateChange = (text: string) => {
        // Remove any non-numeric characters
        const cleanedText = text.replace(/[^0-9]/g, '');

        // Format as MM/YY
        if (cleanedText.length <= 2) {
            setCardExpiry(cleanedText);
        } else if (cleanedText.length <= 6) {
            setCardExpiry(`${cleanedText.slice(0, 2)}/${cleanedText.slice(2)}`);
        }
    }

    // Scroll to the bottom of the ScrollView when add card is pressed
    const handleAddCardPress = () => {
        setAddCard(prev => !prev);
        if (!addCard) {
            setTimeout(() => {
                scrollViewRef.current?.scrollTo({
                    y: 600,
                    animated: true
                });
            }, 300);
        }
    };

    const handleClick = async () => {
        setLoading(true);
        try {
            // now call order API
            const dataPayload = {
                extraNote: InstructionText,
                items: CartItemList.map((d: { itemId: number; qty: number; }) => { return { itemId: d.itemId, qty: d.qty, customizations: {} } }),
                couponId: AppliedCouponId
            };

            const response: any = await orderSubmit(dataPayload);

            navigation.navigate(`OrderPlacedScreen`, {
                ...response.data
            })

            setLoading(false);
        } catch (err: any) {
            setLoading(false);
            console.log(err?.message, '---err');
            dispatch(setDialogContent({ title: <Warning width={FS(40)} height={VP(40)} />, message: err?.response?.data?.message || err?.message || errorMessage?.commonMessage }));
        }
    }

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
                                    <Text style={styles.topHeading1}>bill total:</Text>
                                    <Text style={styles.topHeading2}>$25.00</Text>
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

                            {/* Add new card section */}
                            <View style={{ marginTop: VP(26) }}>
                                <Text style={styles.cardHeading}>Add new card</Text>

                                {!addCard && (
                                    <View style={{ borderRadius: HP(7), borderWidth: 1, borderColor: "#C0C0C0", justifyContent: "space-between", flexDirection: "row", paddingHorizontal: HP(14), paddingVertical: HP(18), marginTop: VP(17.93) }}>
                                        <Text style={styles.boxText}>credit card</Text>
                                        <TouchableOpacity
                                            onPress={handleAddCardPress}
                                            style={{}}
                                        >
                                            <Text style={styles.buttonText}>add</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}

                                {addCard && (
                                    <View style={{ marginTop: VP(17.93), gap: HP(16) }}>
                                        <Text style={styles.label}>cardholder name</Text>

                                        <CustomTextInputNoEffect
                                            formProps={{ text: cardholderName, setText: setCardholderName, error: error.cardholderName }}
                                            placeholder={``}
                                            maxLength={200}
                                            styleInput={styles.styleInput}
                                            placeholderTextColor={`#595959`}
                                        />

                                        <Text style={styles.label}>card number</Text>

                                        <CustomTextInputNoEffect
                                            formProps={{ text: cardNumber, setText: setCardNumber, error: error.cardNumber }}
                                            placeholder={`**** **** **** **66 `}
                                            maxLength={50}
                                            styleInput={styles.styleInput}
                                            placeholderTextColor={`#595959`}
                                            keyboardType='numeric'
                                        />

                                        <Text style={styles.label}>expiry date</Text>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: '100%' }}>
                                            <View style={{ flex: 1, marginRight: 10 }}>
                                                <CustomTextInputNoEffect
                                                    formProps={{ text: cardExpiry, setText: handleExpiryDateChange, error: error.cardExpiry }}
                                                    placeholder="MM/YY"
                                                    styleInput={styles.styleInput}
                                                    placeholderTextColor={`#595959`}
                                                    maxLength={7}
                                                    keyboardType="numeric"
                                                />
                                            </View>

                                            <View style={{ flex: 1 }}>
                                                <CustomTextInputNoEffect
                                                    formProps={{ text: cardCVV, setText: setCardCVV, error: error.cardCVV }}
                                                    placeholder={`***`}
                                                    maxLength={3}
                                                    styleInput={[styles.styleInput, { textAlign: 'center' }]}
                                                    placeholderTextColor={`#595959`}
                                                    keyboardType='numeric'
                                                    secureTextEntry={true}
                                                />
                                            </View>
                                        </View>

                                        <View style={{ marginTop: VP(26) }}>
                                            <Button
                                                text={'pay now'}
                                                onPress={handleClick}
                                                textStyle={styles.buttonStyle}
                                                isLoading={false}
                                                activeButtonText={{ opacity: .65 }}
                                                mainContainerStyle={{ borderRadius: HP(8) }}
                                                LinearGradienrColor={["#FF00E2", "#FF00E2"]}
                                                contentContainerStyle={{ top: -2 }}
                                            />
                                        </View>
                                    </View>
                                )}

                            </View>
                        </View>
                    </View>
                </ScrollView>
            </InnerBlock >
        </OuterLayout >
    )
}

const styles = StyleSheet.create({
    topHeading1: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 18,
        textTransform: "capitalize",
        top: VP(-2),
        textAlign: "center"
    },
    topHeading2: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 18,
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
    }
});

export default PaymentScreen;