import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import moment from 'moment';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { globalStyle } from '../../../utils/GlobalStyle';
import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { FS, HP, VP } from '../../../utils/Responsive';
import Icon, { Icons } from '../../../components/Icons';
import { apiEndpoints, BACKEND_URL, COLORS, errorMessage } from '../../../utils/Constants';
import { TextStyles } from '../../../utils/TextStyles';
import { ButtonSection as Button } from '../../../components/Button';
import NormalLoader from '../../../components/NormalLoader';
import { fetchTopics, topicList, topicLoaded } from '../../../redux/features/items';
import DropDown from '../../../components/DropDown';
import { AppDispatch } from '../../../redux/store';
import CustomTextInputNoEffect from '../../../components/CustomTextInputNoEffect';
import { feedbackForm, validateResource } from '../../../utils/ValidateResource';
import { setDialogContent } from '../../../redux/features/customDialog';
import Warning from '../../../assets/svgs/warning.svg';
import CheckmarkWithConfetti from '../../../components/CheckmarkWithConfetti';
import CustomActionDialogComp from '../../../components/dialogs/CustomActionDialog';
import { deleteOrder, orderSubmit } from '../../../utils/ApiCall';
import { getReorderItems } from '../../../utils/helper/OrderHelper';
import { cartItemList, getCartTotal, instructionText, recoverCart } from '../../../redux/features/cart';
import { appliedCouponId, couponDiscount } from '../../../redux/features/coupon';

const titleDelete = `Confirm Delete`;
const messageDelete = `Are you sure you want to delete this order?`;

const { width, height } = Dimensions.get('window');

const errorObj = { topicId: { status: false, text: "" }, feedback: { status: false, text: "" } }

function OrderSummaryScreen({ route, navigation }: { route: any, navigation: any }): React.JSX.Element {
    const dispatch: AppDispatch = useDispatch();

    const CartItemList = useSelector(cartItemList);
    const GetCartTotal = useSelector(getCartTotal);
    const CouponDiscount = useSelector(couponDiscount);
    const InstructionText = useSelector(instructionText);
    const AppliedCouponId = useSelector(appliedCouponId);

    const [loading, setLoading] = useState<boolean>(false);

    const handleClick = async () => {
        navigation.navigate(`PaymentScreen`);
        // setLoading(true);
        // try {
        //     // now call order API
        //     const dataPayload = {
        //         extraNote: InstructionText,
        //         items: CartItemList.map((d: { itemId: number; qty: number; }) => { return { itemId: d.itemId, qty: d.qty, customizations: {} } }),
        //         couponId: AppliedCouponId
        //     };

        //     const response: any = await orderSubmit(dataPayload);

        //     navigation.navigate(`OrderPlacedScreen`, {
        //         ...response.data
        //     })

        //     setLoading(false);
        // } catch (err: any) {
        //     setLoading(false);
        //     console.log(err?.message, '---err');
        //     dispatch(setDialogContent({ title: <Warning width={FS(40)} height={VP(40)} />, message: err?.response?.data?.message || err?.message || errorMessage?.commonMessage }));
        // }
    }

    return (
        <>
            <NormalLoader visible={loading} />
            <OuterLayout containerStyle={globalStyle.containerStyle}>
                <InnerBlock>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ paddingVertical: HP(20), marginBottom: VP(79) }}>
                            {/* Navigation section */}
                            <View style={{ paddingHorizontal: HP(20) }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.goBack()}
                                        style={{ alignSelf: "center", }}
                                    >
                                        <Icon type={Icons.Feather} size={FS(20)} name={`chevron-left`} color={COLORS.BLACK} />
                                    </TouchableOpacity>
                                    <Text style={styles.topHeading}>order summary</Text>
                                </View>
                            </View>

                            <View style={{ marginTop: VP(32), marginHorizontal: (width * .05) }}>
                                <View style={styles.orderBox}>
                                    {/* Order Top Box where image and order date and menu will show */}
                                    <View style={{ flexDirection: "row", gap: HP(19) }}>
                                        <Image
                                            source={require('../../../assets/images/order.png')}
                                            style={[styles.boxImg]}
                                        />

                                        <View style={{ justifyContent: "center", flex: 1 }}>
                                            <Text style={styles.itemTitle}>
                                                dishes
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.line}></View>
                                    {/* Cart Item List */}
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: HP(10) }}>
                                        <View style={{ gap: HP(8) }}>
                                            {(CartItemList && Array.isArray(CartItemList) && CartItemList?.length > 0) ? (
                                                CartItemList?.map((d: any, i: number) => (
                                                    <Text key={`cart-order-item-${i}`} style={styles.itemText}>
                                                        • {d?.qty} x {d?.name}
                                                    </Text>
                                                ))
                                            ) : (
                                                <Text style={styles.itemText}>No items ordered</Text>
                                            )}
                                        </View>
                                        {CartItemList?.length > 1 && (<Text style={styles.qtyText}>qty {CartItemList?.reduce((acc, item) => acc + item.qty, 0)}</Text>)}
                                    </View>

                                    <View style={styles.line}></View>

                                    {/* Order amount component */}
                                    <View style={{ paddingHorizontal: HP(10), gap: HP(8) }}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.orderEntityText}>item:</Text>
                                            <Text style={styles.orderEntityPrice}>${GetCartTotal.toFixed(2)}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.orderEntityText}>Coupon discount:</Text>
                                            <Text style={styles.orderEntityPrice}>${CouponDiscount.toFixed(2)}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.orderEntityText}>postage & packing:</Text>
                                            <Text style={styles.orderEntityPrice}>$00.00</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.orderEntityText}>total before tax:</Text>
                                            <Text style={styles.orderEntityPrice}>${(GetCartTotal - CouponDiscount).toFixed(2)}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.orderEntityText}>tax:</Text>
                                            <Text style={styles.orderEntityPrice}>$0.00</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.orderEntityText}>total:</Text>
                                            <Text style={styles.orderEntityPrice}>${(GetCartTotal - CouponDiscount).toFixed(2)}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.orderEntityText}>order total:</Text>
                                            <Text style={styles.orderTotalPrice}>${(GetCartTotal - CouponDiscount).toFixed(2)}</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Reorder button */}
                                <Button
                                    text={'Place order'}
                                    onPress={handleClick}
                                    textStyle={styles.buttonStyle}
                                    isLoading={false}
                                    activeButtonText={{ opacity: .65 }}
                                    mainContainerStyle={{ marginTop: VP(30), borderRadius: HP(8.02) }}
                                    LinearGradienrColor={[COLORS.BUTTON, COLORS.BUTTON]}
                                    contentContainerStyle={{ top: -2 }}
                                    style={{ width: "100%" }}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </InnerBlock>
            </OuterLayout >
        </>
    )
}

const styles = StyleSheet.create({
    topHeading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: "#000000",
        fontSize: 18,
        textTransform: "capitalize",
        textAlign: "center",
        flex: 1
    },
    boxImg: {
        width: FS(53),
        height: VP(41.31),
        resizeMode: "cover",
        borderRadius: HP(4.17)
    },
    itemTitle: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 14,
        textTransform: "capitalize",
        color: COLORS.BUTTON
    },
    orderText: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 11,
        textTransform: "capitalize",
        color: "#636363",
        marginTop: VP(2)
    },
    orderBox: {
        shadowColor: "#171717",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: "#fff",
        borderRadius: HP(10),
        padding: HP(14),
        gap: HP(14.69),
    },
    menu: {
        position: 'absolute',
        right: 0,
        top: VP(18),
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
        zIndex: 1000,
        minWidth: FS(80)
    },
    menuItem: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 12,
        paddingVertical: HP(2),
        textTransform: "capitalize"
    },
    line: {
        height: 1,
        width: "100%",
        flex: 1,
        flexGrow: 1,
        backgroundColor: "#E6E6E6"
    },
    itemText: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 14,
        textTransform: "capitalize",
    },
    qtyText: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 12,
        alignSelf: "flex-end"
    },
    orderEntityText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 14,
        color: "#676767",
        textTransform: "capitalize"
    },
    orderEntityPrice: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 14,
        color: "#303030"
    },
    orderTotalPrice: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 14,
        color: COLORS.BUTTON
    },
    orderDetailRightText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 14,
        textTransform: "capitalize"
    },
    orderDetailLeftText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 12,
        textTransform: "capitalize"
    },
    buttonStyle: {
        ...TextStyles.LEXEND_SEMI_BOLD,
        fontSize: 20.05,
        color: COLORS.WHITE,
        textTransform: "uppercase",
    },
    feedbackTitle: {
        ...TextStyles.RALEWAY_BOLD,
        fontSize: 24,
        color: COLORS.BUTTON,
        textTransform: "capitalize",
        textAlign: "center"
    },
    feedbackText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 16,
        color: "#7C7C7C",
        textTransform: "capitalize",
        textAlign: "center",
        marginTop: HP(16),
        lineHeight: 24
    },
    icon: {
        width: FS(41.23),
        height: VP(41.23),
        resizeMode: "cover"
    },
    styleInput: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 12,
        backgroundColor: "#FFF9F9",
        borderRadius: HP(10),
        textAlignVertical: 'top',
        padding: HP(10),
        lineHeight: 11.1,
        borderWidth: 1,
        borderColor: "#FF00E280"
    },
    successPopUpMain: {
        position: 'absolute',
        height,
        width,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        bottom: 0
    },
    successPopUp: {
        position: "absolute",
        bottom: 0,
        backgroundColor: COLORS.WHITE,
        width: width,
        // minHeight: height * .7,
        shadowColor: "#171717",
        shadowOffset: {
            width: -2,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 20,
        borderTopLeftRadius: HP(25),
        borderTopRightRadius: HP(25)
    },
    scrollContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: HP(10)
    },
    popUpHeading: {
        ...TextStyles.RALEWAY_BOLD,
        fontSize: 24,
        lineHeight: 38.5,
        marginTop: VP(25.07),
        color: COLORS.BUTTON,
        textAlign: "center",
        textTransform: "capitalize"
    },
    popUpText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 16,
        lineHeight: 24,
        marginTop: VP(16),
        color: "#7C7C7C",
        textAlign: "center",
        textTransform: "capitalize",
        width: width * .90
    },
});

export default OrderSummaryScreen;