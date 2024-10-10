import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { FS, HP, VP } from '../../../utils/Responsive';
import Icon, { Icons } from '../../../components/Icons';
import { TextStyles } from '../../../utils/TextStyles';
import { COLORS } from '../../../utils/Constants';
import CategortyTabsSection from '../../../components/home-sections/CategortyTabs';
import CartItemSection from '../../../components/cart/CartItem';
import ItemBoxSection from '../../../components/home-sections/ItemBox';
import CookingRequestSection from '../../../components/product-sections/CookingRequest';
import { ButtonSection as Button } from '../../../components/Button';
import { cartItemList, getCartTotal } from '../../../redux/features/cart';
import { fetchPopularItems, papularItemLoaded, papularItems } from '../../../redux/features/items';
import { AppDispatch } from '../../../redux/store';

function CartScreen({ navigation }: { navigation: any }): React.JSX.Element {
    const dispatch: AppDispatch = useDispatch();

    const CartItemList = useSelector(cartItemList);
    const PapularItemLoaded = useSelector(papularItemLoaded);
    const PapularItems = useSelector(papularItems);
    const GetCartTotal = useSelector(getCartTotal);

    const [cookingRequestShow, setCookingRequestShow] = useState(false);
    const [itemListFiltered, setItemListFiltered] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);

    const selectCategoryHandler = useCallback((id: number) => {
        setSelectedCategory(id);
        // find in items
        const filtered = PapularItems.filter(item => (item?.category_id === id || id === 0));

        setItemListFiltered(filtered);
    }, [PapularItems]);

    useEffect(() => {
        if (!PapularItemLoaded) {
            dispatch(fetchPopularItems());
        } else {
            setItemListFiltered(PapularItems);
        }
    }, [PapularItemLoaded])


    // useEffect(() => {
    //     const backAction = () => {
    //         navigation.navigate('HomeScreen');
    //         return true; // Prevent default back button behavior
    //     };

    //     // Add event listener for hardware back button
    //     const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    //     // Cleanup the event listener when component unmounts
    //     return () => backHandler.remove();
    // }, [navigation]);

    return (
        <OuterLayout containerStyle={{ backgroundColor: "#E7E7E7" }}>
            <InnerBlock>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingVertical: HP(20) }}>
                        {/* Navigation section */}
                        <View style={{ paddingHorizontal: HP(21) }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate(`HomeScreen`)}
                                    style={{ alignSelf: "center", }}
                                >
                                    <Icon type={Icons.Feather} size={18} name={`chevron-left`} color={COLORS.BLACK} />
                                </TouchableOpacity>
                                <Text style={styles.topHeading}>Cart</Text>
                            </View>
                        </View>

                        {/* Body section */}
                        <View style={{}}>
                            {/* First section including cart, add more item, coocking request */}
                            <View style={{ marginTop: VP(34), backgroundColor: COLORS.WHITE, borderRadius: HP(21), marginHorizontal: HP(20) }}>
                                {/* Cart Items Loop */}
                                {CartItemList.length > 0 ? (
                                    <>
                                        {(CartItemList || []).map((d, i) => (
                                            <View key={`cart-item-${i}`}>
                                                <CartItemSection data={d} />
                                            </View>
                                        ))}
                                    </>
                                ) : (
                                    <View style={{ padding: HP(21), borderBottomColor: "#E3E3E3", borderBottomWidth: 1 }}>
                                        <Text style={{ ...TextStyles.POPPINS_BOLD, fontSize: HP(18), color: "#898989", lineHeight: HP(47), textAlign: "center" }}>"Your cart is empty!"</Text>
                                    </View>
                                )}

                                {/* add more items */}
                                <View style={styles.textBox}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate(`CartMenuScreen`)}
                                        style={{}}
                                    >
                                        <Text style={styles.linkText}>add more items</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => navigation.navigate(`CartMenuScreen`)}
                                        style={styles.iconBox}
                                    >
                                        <Icon type={Icons.Feather} size={15} name={`plus`} color={COLORS.WHITE} />
                                    </TouchableOpacity>
                                </View>

                                {/* add cooking request */}
                                {CartItemList.length > 0 && (
                                    <>
                                        <View style={[styles.textBox, { borderBottomWidth: 0, paddingBottom: 0 }]}>
                                            <TouchableOpacity
                                                onPress={() => setCookingRequestShow((pre) => !pre)}
                                                style={{}}
                                            >
                                                <Text style={[styles.linkText, { color: COLORS.BLACK }]}>add cooking request</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress={() => setCookingRequestShow((pre) => !pre)}
                                                style={styles.iconBox}
                                            >
                                                <Icon type={Icons.Feather} size={15} name={cookingRequestShow ? `minus` : `plus`} color={COLORS.WHITE} />
                                            </TouchableOpacity>
                                        </View>
                                        {cookingRequestShow ? (
                                            <View style={{ marginTop: VP(20), paddingHorizontal: HP(8), paddingVertical: HP(8) }}>
                                                <CookingRequestSection />
                                            </View>
                                        ) : (<View style={{ paddingBottom: HP(26), }}></View>)}
                                    </>
                                )}
                            </View>

                            {/* Second section Promo Code */}
                            {CartItemList.length > 0 && (
                                <View style={{ marginTop: VP(28), marginHorizontal: HP(20) }}>
                                    <Text style={styles.heading}>Promo Code</Text>

                                    <View style={{ marginTop: VP(14), backgroundColor: COLORS.WHITE, borderRadius: HP(14) }}>
                                        <View style={styles.textBox}>
                                            <TouchableOpacity
                                                onPress={() => void (0)}
                                                style={{}}
                                            >
                                                <Text style={[styles.linkText, { color: COLORS.BLACK }]}>view all coupons</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress={() => void (0)}
                                            >
                                                <Text style={styles.link}>apply</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )}

                            {/* Third section order summary */}
                            {CartItemList.length > 0 && (
                                <View style={{ marginTop: VP(28), marginHorizontal: HP(20) }}>
                                    <Text style={styles.heading}>order summary</Text>

                                    <View style={{ marginTop: VP(14), backgroundColor: COLORS.WHITE, borderRadius: HP(21) }}>
                                        <View style={{ padding: HP(26), gap: HP(11) }}>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                                                <Text style={[styles.link, { color: "#767676" }]}>order amount</Text>

                                                <Text style={[styles.linkText, { color: COLORS.BLACK, fontSize: 14 }]}>${GetCartTotal.toFixed(2)}</Text>
                                            </View>

                                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                <Text style={[styles.link, { color: "#767676" }]}>discount</Text>

                                                <Text style={[styles.linkText, { color: COLORS.BLACK, fontSize: 14 }]}>$0.00</Text>
                                            </View>

                                            <View style={styles.line}></View>

                                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: VP(3.91) }}>
                                                <Text style={[styles.link, { color: COLORS.BLACK }]}>total</Text>

                                                <Text style={[styles.linkText, { color: COLORS.BLACK, fontSize: 14 }]}>${GetCartTotal.toFixed(2)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}

                            {CartItemList.length > 0 && (
                                <>
                                    {/* Bottom Heading */}
                                    <View style={{ marginTop: VP(23.3), marginHorizontal: HP(20) }}>
                                        <Text style={styles.heading}>popular with your order</Text>
                                        <Text style={styles.text}>other customers also bought these</Text>
                                    </View>

                                    {/* Category Tab */}
                                    <View style={{ marginTop: VP(18.66), marginLeft: HP(20) }}>
                                        <CategortyTabsSection setSelectedCategory={selectCategoryHandler} selectedCategory={selectedCategory} />
                                    </View>

                                    {/* item boxes */}
                                    <View style={{ marginTop: VP(20), marginLeft: HP(20) }}>
                                        <ItemBoxSection data={itemListFiltered} dataLoaded={PapularItemLoaded} navigation={navigation} />
                                    </View>
                                </>
                            )}
                        </View>
                    </View>
                </ScrollView>
                {/* Button For Process */}
                {CartItemList.length > 0 && (
                    <View style={styles.bottomButtonContainer}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", gap: HP(7), paddingHorizontal: HP(20), paddingVertical: VP(19) }}>
                            <Button
                                text={'continue'}
                                onPress={() => navigation.navigate(`CartMenuScreen`)}
                                textStyle={styles.buttonStyle1}
                                isLoading={false}
                                activeButtonText={{ opacity: .65 }}
                                mainContainerStyle={{ flex: 1, borderColor: COLORS.BUTTON, borderWidth: 1, borderRadius: HP(8) }}
                                LinearGradienrColor={["#F5F5F5", "#F5F5F5"]}
                                contentContainerStyle={{ top: -2 }}
                            />

                            <Button
                                text={'place order'}
                                onPress={() => navigation.navigate(`OrderPlacedScreen`)}
                                textStyle={styles.buttonStyle2}
                                isLoading={false}
                                activeButtonText={{ opacity: .65 }}
                                mainContainerStyle={{ flex: 1, borderRadius: HP(8) }}
                                LinearGradienrColor={[COLORS.BUTTON, COLORS.BUTTON]}
                                contentContainerStyle={{ top: -2 }}
                            />
                        </View>
                    </View>
                )}
            </InnerBlock>
        </OuterLayout>
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
    linkText: {
        ...TextStyles.RALEWAY_MEDIUM,
        color: COLORS.BUTTON,
        fontSize: 12,
        textTransform: "capitalize"
    },
    link: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: COLORS.BUTTON,
        fontSize: 12,
        textTransform: "capitalize"
    },
    iconBox: {
        width: FS(20),
        height: FS(20),
        borderRadius: FS(10),
        borderColor: "#383838",
        backgroundColor: "#383838",
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBox: {
        flexDirection: "row",
        padding: HP(26),
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: "#E3E3E3",
        borderBottomWidth: 1
    },
    heading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 14,
        textTransform: "capitalize"
    },
    line: {
        height: 1,
        width: "100%",
        flex: 1,
        backgroundColor: "#E3E3E3",
        marginTop: VP(7.92)
    },
    text: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 12,
        textTransform: "capitalize"
    },
    buttonStyle1: {
        ...TextStyles.LEXEND_REGULAR,
        fontSize: 18,
        color: COLORS.BLACK,
        textTransform: "capitalize",
    },
    buttonStyle2: {
        ...TextStyles.LEXEND_SEMI_BOLD,
        fontSize: 20,
        color: COLORS.WHITE,
        textTransform: "capitalize",
    },
    bottomButtonContainer: {
        backgroundColor: COLORS.WHITE,
        borderTopLeftRadius: HP(20),
        borderTopRightRadius: HP(20),
    }
});

export default CartScreen;