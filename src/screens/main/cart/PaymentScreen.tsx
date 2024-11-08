import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ImageBackground, Dimensions, Image, Platform, Appearance } from 'react-native';
import { CardField, useConfirmPayment, createPaymentMethod } from '@stripe/stripe-react-native';

import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { FS, HP, VP } from '../../../utils/Responsive';
import Icon, { Icons } from '../../../components/Icons';
import { TextStyles } from '../../../utils/TextStyles';
import { COLORS, errorMessage } from '../../../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { proflieDetails } from '../../../redux/features/profile';
import { ButtonSection as Button } from '../../../components/Button';
import { cartItemList, instructionText } from '../../../redux/features/cart';
import { appliedCouponId } from '../../../redux/features/coupon';
import { createPaymentIntent, fetchCardList } from '../../../utils/ApiCall';
import { AppDispatch } from '../../../redux/store';
import { setDialogContent } from '../../../redux/features/customDialog';
import Warning from '../../../assets/svgs/warning.svg';
import NormalLoader from '../../../components/NormalLoader';
import { CommonActions } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

// const isDarkMode = Appearance.getColorScheme() === 'dark';
const isDarkMode1 = Appearance.getColorScheme() === 'dark';
const isDarkMode = false;

const iconColor = isDarkMode ? "#FFFFFF" : "#6C6C70";

const creditCardColor = isDarkMode ? "#FFFFFF" : "#101010";

function PaymentScreen({ route, navigation }: { route: any; navigation: any }): React.JSX.Element {
    const { total } = route.params;

    const { confirmPayment, loading } = useConfirmPayment();

    const dispatch: AppDispatch = useDispatch();

    const CartItemList = useSelector(cartItemList);
    const InstructionText = useSelector(instructionText);
    const AppliedCouponId = useSelector(appliedCouponId);
    const ProflieDetails = useSelector(proflieDetails);

    const scrollViewRef = useRef<any>(null);

    const { user } = ProflieDetails;

    const [addCard, setAddCard] = useState(false);
    const [loader, setLoader] = useState(false);
    const [cardLoading, setCardLoading] = useState(false);
    const [error, setError] = useState("");
    const [cardList, setCardList] = useState<any[]>([]);
    const [selectedCard, setSelectedCard] = useState<number>(0);
    const [savePaymentMethod, setSavePaymentMethod] = useState<boolean>(false);

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

    const getCardList = async () => {
        setCardLoading(true);
        try {
            const response = await fetchCardList();

            setCardList(response?.map((d: { card: any; id: string }) => { return { ...d?.card, ...{ methodId: d?.id || "" } } }));
            setSelectedCard(0);
            setCardLoading(false);
        } catch (err: any) {
            setCardLoading(false);
            console.log(err?.message, '---err');
        }
    }

    const handleClick = async () => {
        setLoader(true);
        try {
            const dataPayload = {
                extraNote: InstructionText,
                items: CartItemList.map((d: { itemId: number; qty: number; }) => { return { itemId: d.itemId, qty: d.qty, customizations: {} } }),
                couponId: AppliedCouponId,
                savePaymentMethod
            };

            const response: any = await createPaymentIntent(dataPayload);

            const { client_secret } = response.data.paymentIntent;

            const billingDetails = {
                email: user?.email,
                name: user?.name,
            };

            let paymentMethodData: any = {
                billingDetails,
            };

            // Check if using saved card or adding a new card
            if (!addCard && cardList[selectedCard]) {
                // Use selected saved card
                paymentMethodData = {
                    ...paymentMethodData,
                    paymentMethodId: cardList[selectedCard].methodId, // Stripe's saved card ID
                };
            }

            // Confirm the payment with the card details
            const { paymentIntent, error } = await confirmPayment(client_secret, {
                paymentMethodType: 'Card',
                paymentMethodData
            });

            if (error) {
                console.log('Payment confirmation error', error);
                setError(error?.message || errorMessage?.commonMessage);
                setLoader(false);
            } else if (paymentIntent) {
                setError("");
                navigation.navigate(`OrderPlacedScreen`, {
                    orderId: paymentIntent.id,
                    message: "your order is placed sucessfully"
                })

                // navigation.reset({
                //     index: 0,
                //     routes: [
                //         {
                //             name: 'OrderPlacedScreen',
                //             params: {
                //                 orderId: paymentIntent.id,
                //                 message: "Your order is placed successfully",
                //             },
                //         },
                //     ],
                // });

                setLoader(false);
            }
        } catch (err: any) {
            setLoader(false);
            console.log(err?.message, '---err');
            dispatch(setDialogContent({ title: <Warning width={FS(40)} height={VP(40)} />, message: err?.response?.data?.message || err?.message || errorMessage?.commonMessage }));
        }
    }

    useEffect(() => {
        getCardList()
    }, [])

    return (
        <OuterLayout containerStyle={styles.containerStyle}>
            <NormalLoader visible={loading || cardLoading} />
            <InnerBlock>
                <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
                    <View style={{ paddingVertical: HP(20) }}>
                        {/* Navigation section */}
                        <View style={{ paddingHorizontal: HP(16) }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                >
                                    <Icon type={Icons.Feather} size={FS(24)} name={`chevron-left`} color={iconColor} />
                                </TouchableOpacity>
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", gap: HP(5) }}>
                                    <Text style={styles.topHeading1}>bill total:</Text>
                                    <Text style={styles.topHeading2}>${total.toFixed(2)}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Body section */}
                        <View style={{ marginTop: VP(26), paddingHorizontal: HP(26) }}>
                            {/* Card Image */}
                            {cardList.length > 0 && (
                                <View style={{ borderRadius: HP(17.97), width: width }}>
                                    <ImageBackground source={require(`../../../assets/images/card.png`)} style={[styles.cardBG]} resizeMode='contain'>

                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.cardBGTitle}>{cardList[selectedCard]?.display_brand || ""}</Text>

                                            <Text style={styles.cardBGNo}>••••  ••••  ••••  {cardList[selectedCard]?.last4 || "****"}</Text>
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
                            )}

                            {/* credit card section */}
                            <View style={{ marginTop: VP(20.96) }}>
                                <Text style={styles.cardHeading}>Credit card</Text>

                                {cardList.length > 0 && (
                                    <>
                                        {cardList?.map((d, i) => (
                                            <TouchableOpacity
                                                onPress={() => setSelectedCard(i)}
                                                style={[styles.cardSection, { borderColor: selectedCard === i ? COLORS.BUTTON : "#EDEDED" }]}
                                                key={`card-${i}`}
                                            >
                                                <View style={{ flexDirection: "row", alignItems: "center", gap: HP(21.34) }}>
                                                    <Icon type={Icons.Feather} size={FS(18)} name={`credit-card`} color={creditCardColor} />

                                                    <View>
                                                        <Text style={styles.cardText}>{d?.display_brand || ""}Card</Text>
                                                        <Text style={styles.cardNumber}>**** **** **** {d?.last4 || ""}</Text>
                                                    </View>
                                                </View>

                                                <Image source={require(`../../../assets/images/card-icon-1.png`)} style={[styles.iconImg]} />
                                            </TouchableOpacity>
                                        ))}
                                    </>
                                )}
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

                                        <CardField
                                            postalCodeEnabled={false}
                                            placeholders={{
                                                number: '4242 4242 4242 4242',
                                            }}
                                            cardStyle={
                                                Platform.OS === 'android'
                                                    ? styles.cardStyleAndroid
                                                    : styles.cardStyleLight
                                            }
                                            style={styles.cardField}
                                        />

                                        <TouchableOpacity
                                            onPress={() => setSavePaymentMethod(pre => !pre)}
                                            style={[styles.checkboxContainer]}
                                        >
                                            <View style={[styles.checkbox]}>
                                                {savePaymentMethod && (
                                                    <View style={styles.checkedBox}>
                                                        <Icon type={Icons.Feather} size={FS(12)} name={`check`} color={COLORS.WHITE} />
                                                    </View>
                                                )}
                                            </View>
                                            <Text style={[styles.labelStyle]}>Save payment information to my account for future payments.</Text>
                                        </TouchableOpacity>

                                        <View style={{ marginTop: VP(10), flexDirection: "row", gap: HP(7) }}>
                                            <Button
                                                text={'Close'}
                                                onPress={handleAddCardPress}
                                                textStyle={styles.closeButtonStyle}
                                                disabled={loading || loader}
                                                activeButtonText={{ opacity: .65 }}
                                                mainContainerStyle={{ flex: 1, borderColor: COLORS.BUTTON, borderWidth: 1, borderRadius: HP(8) }}
                                                LinearGradienrColor={["#F5F5F5", "#F5F5F5"]}
                                                contentContainerStyle={{ top: -2 }}
                                            />

                                            <Button
                                                text={'pay now'}
                                                onPress={handleClick}
                                                textStyle={styles.buttonStyle}
                                                isLoading={loading || loader}
                                                activeButtonText={{ opacity: .65 }}
                                                mainContainerStyle={{ borderRadius: HP(8), flex: 1 }}
                                                LinearGradienrColor={["#FF00E2", "#FF00E2"]}
                                                contentContainerStyle={{ top: -2 }}
                                            />
                                        </View>
                                    </View>
                                )}
                                <Text style={styles.errorMessage}>{error}</Text>
                                {(!addCard && cardList.length > 0) && (
                                    <View style={{ marginTop: VP(10) }}>
                                        <Button
                                            text={'pay now'}
                                            onPress={handleClick}
                                            textStyle={styles.buttonStyle}
                                            isLoading={loading || loader}
                                            activeButtonText={{ opacity: .65 }}
                                            mainContainerStyle={{ borderRadius: HP(8), flex: 1 }}
                                            LinearGradienrColor={["#FF00E2", "#FF00E2"]}
                                            contentContainerStyle={{ top: -2 }}
                                        />
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
        textAlign: "center",
        color: isDarkMode ? COLORS.WHITE : COLORS.BLACK
    },
    topHeading2: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 18,
        top: VP(-2),
        textAlign: "center",
        color: isDarkMode ? COLORS.WHITE : COLORS.BLACK
    },
    boxText: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 14,
        textTransform: "capitalize",
        color: isDarkMode ? COLORS.WHITE : COLORS.BLACK
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
        color: COLORS.WHITE,
        textTransform: "uppercase"
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
        // color: "#101010",
        color: isDarkMode ? COLORS.WHITE : "#101010"
    },
    cardText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 15.72,
        lineHeight: HP(22.5),
        // color: "#101010",
        textTransform: "capitalize",
        color: isDarkMode ? COLORS.WHITE : "#101010"
    },
    cardNumber: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 13.48,
        lineHeight: HP(18),
        // color: "#878787"
        color: isDarkMode ? COLORS.WHITE : "#878787"
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
    buttonStyle: {
        ...TextStyles.LEXEND_SEMI_BOLD,
        fontSize: 18,
        color: COLORS.WHITE,
        textTransform: "uppercase"
    },
    closeButtonStyle: {
        ...TextStyles.LEXEND_REGULAR,
        fontSize: 18,
        color: COLORS.BLACK,
        textTransform: "uppercase"
    },
    errorMessage: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 14,
        textTransform: "capitalize",
        color: COLORS.RED,
        marginTop: VP(10)
    },
    checkboxContainer: {
        flexBasis: "50%",
        paddingBottom: HP(11),
        flexDirection: 'row',
        alignItems: 'center',
        // flexWrap: "wrap"
    },
    checkbox: {
        width: FS(15.11),
        height: FS(15.11),
        borderWidth: 1,
        borderColor: '#FFAFF6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: HP(6.11),
        borderRadius: HP(2.96)
    },
    checkedBox: {
        width: FS(15.11),
        height: FS(15.11),
        backgroundColor: COLORS.BUTTON,
        justifyContent: "center",
        alignItems: "center"
    },
    labelStyle: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 10.17,
        color: isDarkMode ? COLORS.WHITE : COLORS.BLACK
    },
    cardStyleAndroid: {
        borderWidth: 1,
        borderColor: COLORS.ICON_DEFAULT,
        borderRadius: HP(10),
        color: isDarkMode1 ? COLORS.WHITE : COLORS.BLACK,
        textColor: isDarkMode1 ? COLORS.WHITE : COLORS.BLACK,
        backgroundColor: isDarkMode1 ? "#333333" : COLORS.WHITE
        // backgroundColor: "#333333"
    },
    cardStyleLight: {
        backgroundColor: COLORS.WHITE,
        textColor: COLORS.BLACK,
        color: COLORS.BLACK,
        borderColor: COLORS.ICON_DEFAULT,
    },
    cardField: {
        height: VP(40),
        borderWidth: 1,
        borderColor: COLORS.ICON_DEFAULT,
        padding: 0,
        margin: 0,
        borderRadius: HP(10),
        backgroundColor: isDarkMode ? COLORS.BLACK : COLORS.WHITE,
    },
    containerStyle: {
        backgroundColor: isDarkMode ? "#000000" : "#FFF9F9"
    }
});

export default PaymentScreen;