import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ImageBackground, Dimensions, Image } from 'react-native';
import { useDispatch } from 'react-redux';

import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { FS, HP, VP } from '../../../utils/Responsive';
import Icon, { Icons } from '../../../components/Icons';
import { TextStyles } from '../../../utils/TextStyles';
import { COLORS, errorMessage } from '../../../utils/Constants';
import { deleteCard, fetchCardList } from '../../../utils/ApiCall';
import { AppDispatch } from '../../../redux/store';
import { setDialogContent } from '../../../redux/features/customDialog';
import Warning from '../../../assets/svgs/warning.svg';
import NormalLoader from '../../../components/NormalLoader';
import { globalStyle } from '../../../utils/GlobalStyle';

const { width, height } = Dimensions.get('window');

function PaymentModeScreen({ navigation }: { navigation: any }): React.JSX.Element {
    const dispatch: AppDispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false);
    const [cardList, setCardList] = useState<any[]>([]);
    const [selectedCard, setSelectedCard] = useState<number>(0);

    const getCardList = async () => {
        setLoading(true);
        try {
            const response = await fetchCardList();

            setCardList(response?.map((d: { card: any; id: string }) => { return { ...d?.card, ...{ methodId: d?.id || "" } } }));
            setSelectedCard(0);
            setLoading(false);
        } catch (err: any) {
            setLoading(false);
            console.log(err?.message, '---err');
            dispatch(setDialogContent({ title: <Warning width={FS(40)} height={VP(40)} />, message: err?.response?.data?.message || err?.message || errorMessage?.commonMessage }));
        }
    }

    const cardDeleteActionHandler = async () => {
        setLoading(true);
        try {
            // get selected card details
            const cardDetails = cardList.find((d, i) => i === selectedCard);
            const methodId = cardDetails?.methodId || "";

            const dataPayload = {
                paymentMethodId: methodId
            }

            const response: any = await deleteCard(dataPayload);

            if (response?.data?.success === true) {
                getCardList();
            } else {
                dispatch(setDialogContent({ title: <Warning width={FS(40)} height={VP(40)} />, message: response?.data?.message || errorMessage?.commonMessage }));
            }

            setLoading(false);
        } catch (err: any) {
            setLoading(false);
            console.log(err?.message, '---err');
            dispatch(setDialogContent({ title: <Warning width={FS(40)} height={VP(40)} />, message: err?.response?.data?.message || err?.message || errorMessage?.commonMessage }));
        }
    }

    useEffect(() => {
        getCardList()
    }, [])

    return (
        <OuterLayout containerStyle={{ backgroundColor: "#FFF9F9" }}>
            <NormalLoader visible={loading} />
            <InnerBlock>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingVertical: HP(20) }}>
                        {/* Navigation section */}
                        <View style={{ paddingHorizontal: HP(20) }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    style={globalStyle.navigationIconBox}
                                >
                                    <Icon
                                        type={Icons.Feather}
                                        size={FS(20)}
                                        name={`chevron-left`}
                                        color={`#6C6C70`}
                                    />
                                </TouchableOpacity>
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", gap: HP(5) }}>
                                    <Text style={styles.topHeading}>Payment Modes</Text>
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
                                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                                <Text style={styles.cardBGTitle}>{cardList[selectedCard]?.display_brand || ""}</Text>

                                                <TouchableOpacity
                                                    onPress={cardDeleteActionHandler}
                                                    style={{ right: HP(40) }}
                                                >
                                                    <Icon type={Icons.Feather} size={FS(20)} name={`trash-2`} color={COLORS.WHITE} />
                                                </TouchableOpacity>
                                            </View>

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

                                {cardList.length > 0 ? (
                                    <>
                                        {cardList?.map((d, i) => (
                                            <TouchableOpacity
                                                onPress={() => setSelectedCard(i)}
                                                style={[styles.cardSection, { borderColor: selectedCard === i ? COLORS.BUTTON : "#EDEDED" }]}
                                                key={`card-${i}`}
                                            >
                                                <View style={{ flexDirection: "row", alignItems: "center", gap: HP(21.34) }}>
                                                    <Icon type={Icons.Feather} size={FS(18)} name={`credit-card`} color={`#101010`} />

                                                    <View>
                                                        <Text style={styles.cardText}>{d?.display_brand || ""}Card</Text>
                                                        <Text style={styles.cardNumber}>**** **** **** {d?.last4 || ""}</Text>
                                                    </View>
                                                </View>

                                                <Image source={require(`../../../assets/images/card-icon-1.png`)} style={[styles.iconImg]} />
                                            </TouchableOpacity>
                                        ))}
                                    </>
                                ) : (
                                    <Text style={styles.noCardText}>No payment modes found</Text>
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
        color: "#101010"
    },
    cardText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 15.72,
        lineHeight: HP(22.5),
        color: "#101010",
        textTransform: "capitalize"
    },
    cardNumber: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 13.48,
        lineHeight: HP(18),
        color: "#878787"
    },
    iconImg: {
        width: FS(36),
        height: VP(27),
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
    noCardText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 16,
        textTransform: "capitalize",
        textAlign: "center",
        marginTop: VP(20)
    }
});

export default PaymentModeScreen;