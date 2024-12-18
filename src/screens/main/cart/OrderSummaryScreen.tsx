import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { globalStyle } from '../../../utils/GlobalStyle';
import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { FS, HP, VP } from '../../../utils/Responsive';
import Icon, { Icons } from '../../../components/Icons';
import { COLORS, errorMessage } from '../../../utils/Constants';
import { TextStyles } from '../../../utils/TextStyles';
import { ButtonSection as Button } from '../../../components/Button';
import { AppDispatch } from '../../../redux/store';
import { setDialogContent } from '../../../redux/features/customDialog';
import Warning from '../../../assets/svgs/warning.svg';
import { cartConfirm } from '../../../utils/ApiCall';
import { cartItemList, resetCart } from '../../../redux/features/cart';
import { appliedCouponId } from '../../../redux/features/coupon';
import { getItemPriceComponents } from '../../../utils/helper/ItemHelper';
import { addToCart } from '../../../utils/helper/CartHelper';
import { loadStorage } from '../../../utils/Storage';
import OrderSummaryScreenLoaderSection from '../../../components/skeleton/OrderSummaryScreenLoader';

const { width, height } = Dimensions.get('window');

interface confirmOrderDataType {
    couponDiscount: number,
    finalAmount: number,
    itemTotal: number,
    packagingCost: number,
    taxAmount: number,
    totalWithOutTax: number,
    variantTotalPrice: number
}

const confirmOrderDataInitial = {
    couponDiscount: 0,
    finalAmount: 0,
    itemTotal: 0,
    packagingCost: 0,
    taxAmount: 0,
    totalWithOutTax: 0,
    variantTotalPrice: 0
}

function OrderSummaryScreen({ route, navigation }: { route: any, navigation: any }): React.JSX.Element {
    const dispatch: AppDispatch = useDispatch();

    const CartItemList = useSelector(cartItemList);
    const AppliedCouponId = useSelector(appliedCouponId);

    const [loading, setLoading] = useState<boolean>(true);
    const [confirmOrderData, setConfirmOrderData] = useState<confirmOrderDataType>(confirmOrderDataInitial);

    const [proceed, setProceed] = useState<boolean>(false);

    const handleClick = async () => {
        navigation.navigate(`PaymentScreen`, {
            total: confirmOrderData?.finalAmount || 0
        });
    }

    const cartOperation = async (item: ItemDetails) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (item?.isAvailable) {
                    const itemDetails = getItemPriceComponents(item);
                    itemDetails.id = itemDetails.itemId || 0;
                    const qty = item.qty || 1;
                    const options = item?.variants || [];
                    const size = item?.size || [];
                    addToCart(itemDetails, qty, dispatch, undefined, false, options, size);
                }
                resolve(1);
            }, 100);
        });
    }

    const cartComparison = (arr1: CartItemDetails[], arr2: ItemDetails[]) => {
        if (arr1.length !== arr2.length) {
            return false; // Arrays have different lengths, so they are not equal
        }

        // Sort both arrays based on a unique key (itemId in this case)
        const sortedArr1 = arr1.sort((a, b) => (a?.itemId || 0) - (b?.itemId || 0));
        const sortedArr2 = arr2.sort((a, b) => (a?.itemId || 0) - (b?.itemId || 0));

        const areArraysEqual = _.isEqual(sortedArr1, sortedArr2);

        return areArraysEqual;
    }

    const confirmCartData = async () => {
        setLoading(true);

        try {
            const dataPayload = [...CartItemList]

            const dataPayloadV1 = [
                ...dataPayload.map((d) => {
                    const { options, ...rest } = d;
                    return { ...rest, variants: d.options };
                })
            ];

            // console.log(JSON.stringify(dataPayloadV1), '----dataPayloadV1')

            const response: any = await cartConfirm({ items: dataPayloadV1, couponId: AppliedCouponId });

            // console.log(JSON.stringify(response?.data), '----response?.data')

            dispatch(resetCart());

            const items = response?.data?.items || [];

            const promises = _.map(items, async (item) => {
                return await cartOperation(item);
            });

            // Wait for all promises to resolve
            await Promise.all(promises);

            const savedCartItems = await loadStorage('cartItems');

            // console.log(JSON.stringify(dataPayload), '-----dataPayload');
            // console.log(JSON.stringify(savedCartItems), '-----savedCartItems');

            const areArraysEqual = cartComparison(dataPayload, savedCartItems);

            if (!areArraysEqual) {
                dispatch(setDialogContent({ title: <Warning width={FS(40)} height={VP(40)} />, message: errorMessage.cartUpdate, buttonAction: true, buttonText2: "Back to cart", onAction: 'Cart' }));
            }

            setConfirmOrderData({
                couponDiscount: response?.data?.couponDiscount || 0,
                finalAmount: response?.data?.finalAmount || 0,
                itemTotal: response?.data?.itemTotal || 0,
                packagingCost: response?.data?.packagingCost || 0,
                taxAmount: response?.data?.taxAmount || 0,
                totalWithOutTax: response?.data?.totalWithOutTax || 0,
                variantTotalPrice: response?.data?.variantTotalPrice || 0
            });

            setLoading(false);
            setProceed(true);
        } catch (err: any) {
            setLoading(false);
            console.log(err?.message, '---err');
            dispatch(setDialogContent({ title: <Warning width={FS(40)} height={VP(40)} />, message: err?.response?.data?.message || err?.message || errorMessage?.commonMessage }));
        }
    }

    useEffect(() => {
        confirmCartData();
    }, [])

    if (loading) {
        return <OrderSummaryScreenLoaderSection />
    }

    // console.log(JSON.stringify(CartItemList), '-----CartItemList')

    return (
        <>
            <OuterLayout containerStyle={globalStyle.containerStyle}>
                <InnerBlock>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ paddingVertical: HP(20), marginBottom: VP(79) }}>
                            {/* Navigation section */}
                            <View style={{ paddingHorizontal: HP(18) }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.goBack()}
                                        style={globalStyle.navigationIconBox}
                                    >
                                        <Icon
                                            type={Icons.Feather}
                                            size={FS(20)}
                                            name={`chevron-left`}
                                            color={COLORS.BLACK}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.topHeading}>order summary</Text>
                                </View>
                            </View>

                            <View style={{ marginTop: VP(32), marginHorizontal: (width * .05) }}>
                                <View style={styles.orderBox}>
                                    {/* Order Top Box where image will show */}
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
                                    <View style={{
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        paddingHorizontal: HP(10)
                                    }}>
                                        <View style={{ gap: HP(8) }}>
                                            {(CartItemList && Array.isArray(CartItemList) && CartItemList?.length > 0) ? (
                                                CartItemList?.map((d: any, i: number) => (
                                                    <View key={`cart-order-item-${i}`}>
                                                        <Text
                                                            style={styles.itemText}
                                                        >
                                                            • {d?.qty} x {d?.name}
                                                        </Text>

                                                        <View
                                                            style={styles.variantMain}>
                                                            {/* loop for Customize options */}
                                                            {d?.options?.map((k: any, j: number) => (
                                                                <View
                                                                    key={`item-variants-${i}-${j}`}
                                                                    style={styles.variantSub}
                                                                >
                                                                    <Icon
                                                                        type={Icons.FontAwesome5}
                                                                        size={FS(11)}
                                                                        name={`long-arrow-alt-right`}
                                                                        color={`#787878`}
                                                                    />

                                                                    <Text
                                                                        style={styles.variantName}
                                                                    >
                                                                        {k?.customizeOption?.name}:
                                                                    </Text>
                                                                    <View>
                                                                        <Text
                                                                            style={styles.atrributeName}
                                                                        >
                                                                            {k?.variantAttributes?.map((attr: any) => attr?.customizeAttribute?.name).join(', ')}
                                                                        </Text>
                                                                    </View>
                                                                </View>
                                                            ))}
                                                            {/* loop for Size options */}
                                                            {d?.size?.map((k: any, j: number) => (
                                                                <View
                                                                    key={`item-size-${i}-${j}`}
                                                                    style={styles.variantSub}
                                                                >
                                                                    <Icon
                                                                        type={Icons.FontAwesome5}
                                                                        size={FS(11)}
                                                                        name={`long-arrow-alt-right`}
                                                                        color={`#787878`}
                                                                    />

                                                                    <Text style={styles.variantName}>
                                                                        Size:
                                                                    </Text>
                                                                    <View>
                                                                        <Text style={styles.atrributeName}>
                                                                            {k?.name}
                                                                        </Text>
                                                                    </View>
                                                                </View>
                                                            ))}
                                                        </View>
                                                    </View>
                                                ))
                                            ) : (
                                                <Text style={styles.itemText}>No items ordered</Text>
                                            )}
                                        </View>
                                        {CartItemList?.length > 1 &&
                                            (
                                                <View>
                                                    <Text
                                                        style={styles.qtyText}
                                                    >
                                                        qty {CartItemList?.reduce((acc, item) => acc + item.qty, 0)}
                                                    </Text>
                                                </View>
                                            )}
                                    </View>

                                    <View style={styles.line}></View>

                                    {/* Order amount component */}
                                    <View style={{ paddingHorizontal: HP(10), gap: HP(8) }}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.orderEntityText}>item:</Text>
                                            <Text style={styles.orderEntityPrice}>${confirmOrderData.itemTotal.toFixed(2)}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.orderEntityText}>Extra Add On:</Text>
                                            <Text style={styles.orderEntityPrice}>${confirmOrderData.variantTotalPrice.toFixed(2)}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.orderEntityText}>Coupon discount:</Text>
                                            <Text style={styles.orderEntityPrice}>${confirmOrderData.couponDiscount.toFixed(2)}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.orderEntityText}>postage & packing:</Text>
                                            <Text style={styles.orderEntityPrice}>${confirmOrderData.packagingCost.toFixed(2)}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.orderEntityText}>total before tax:</Text>
                                            <Text style={styles.orderEntityPrice}>${confirmOrderData.totalWithOutTax.toFixed(2)}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.orderEntityText}>tax:</Text>
                                            <Text style={styles.orderEntityPrice}>${confirmOrderData.taxAmount.toFixed(2)}</Text>
                                        </View>

                                        {/* <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.orderEntityText}>total:</Text>
                                            <Text style={styles.orderEntityPrice}>${confirmOrderData.finalAmount.toFixed(2)}</Text>
                                        </View> */}

                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.orderEntityText}>order total:</Text>
                                            <Text style={styles.orderTotalPrice}>${confirmOrderData.finalAmount.toFixed(2)}</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Reorder button */}
                                {(proceed && CartItemList.length > 0) && (
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
                                )}
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
        color: COLORS.BLACK,
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
        backgroundColor: COLORS.WHITE,
        borderRadius: HP(10),
        padding: HP(14),
        gap: HP(14.69),
    },
    menu: {
        position: 'absolute',
        right: 0,
        top: VP(18),
        backgroundColor: COLORS.WHITE,
        borderRadius: 5,
        padding: 10,
        shadowColor: COLORS.BLACK,
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
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
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
    variantMain: {
        flexDirection: "row",
        gap: HP(5),
        start: HP(10),
        flexWrap: "wrap",
        marginTop: VP(3)
    },
    variantSub: {
        flexDirection: "row",
        alignItems: "center",
        gap: HP(5),
        width: "100%",
        flexWrap: "wrap"
    },
    variantName: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 12,
        textTransform: "capitalize",
        color: "#787878"
    },
    atrributeName: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 10,
        textTransform: "capitalize",
        color: "#787878"
    }
});

export default OrderSummaryScreen;