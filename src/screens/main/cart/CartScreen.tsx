import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { FS, HP, VP } from '../../../utils/Responsive';
import Icon, { Icons } from '../../../components/Icons';
import { TextStyles } from '../../../utils/TextStyles';
import { COLORS } from '../../../utils/Constants';
import { cartItems, categoryTabData, itemData } from '../../../utils/MockData';
import CategortyTabsSection from '../../../components/home-sections/CategortyTabs';
import CartItemSection from '../../../components/cart/CartItem';
import ItemBoxSection from '../../../components/home-sections/ItemBox';
import CookingRequestSection from '../../../components/product-sections/CookingRequest';
import { ButtonSection as Button } from '../../../components/Button';

function CartScreen({ navigation }: { navigation: any }): React.JSX.Element {
    const [cookingRequestShow, setCookingRequestShow] = useState(false);

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
                                    style={{ alignSelf: "center" }}
                                >
                                    <Icon type={Icons.Feather} size={18} name={`chevron-left`} color={COLORS.BLACK} />
                                </TouchableOpacity>
                                <Text style={styles.topHeading}>Cart</Text>
                            </View>
                        </View>

                        {/* Body section */}
                        <View style={{ marginHorizontal: HP(20) }}>
                            {/* First section including cart, add more item, coocking request */}
                            <View style={{ marginTop: VP(34), backgroundColor: COLORS.WHITE, borderRadius: HP(21) }}>
                                {/* Cart Items Loop */}
                                {(cartItems?.items || []).map((d, i) => (
                                    <View key={`cart-item-${i}`}>
                                        <CartItemSection data={d} />
                                    </View>
                                ))}

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
                            </View>

                            {/* Second section Promo Code */}
                            <View style={{ marginTop: VP(28) }}>
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

                            {/* Third section order summary */}
                            <View style={{ marginTop: VP(28) }}>
                                <Text style={styles.heading}>order summary</Text>

                                <View style={{ marginTop: VP(14), backgroundColor: COLORS.WHITE, borderRadius: HP(21) }}>
                                    <View style={{ padding: HP(26), gap: HP(11) }}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                                            <Text style={[styles.link, { color: "#767676" }]}>order amount</Text>

                                            <Text style={[styles.linkText, { color: COLORS.BLACK, fontSize: 14 }]}>$30.00</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                            <Text style={[styles.link, { color: "#767676" }]}>discount</Text>

                                            <Text style={[styles.linkText, { color: COLORS.BLACK, fontSize: 14 }]}>$5.00</Text>
                                        </View>

                                        <View style={styles.line}></View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: VP(3.91) }}>
                                            <Text style={[styles.link, { color: COLORS.BLACK }]}>total</Text>

                                            <Text style={[styles.linkText, { color: COLORS.BLACK, fontSize: 14 }]}>$25.00</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {/* Bottom Heading */}
                            <View style={{ marginTop: VP(23.3) }}>
                                <Text style={styles.heading}>popular with your order</Text>
                                <Text style={styles.text}>other customers also bought these</Text>
                            </View>

                            {/* Category Tab */}
                            <View style={{ marginTop: VP(18.66) }}>
                                <CategortyTabsSection data={categoryTabData} setSelectedCategory={() => void (0)} />
                            </View>

                            {/* item boxes */}
                            <View style={{ marginTop: VP(20) }}>
                                <ItemBoxSection data={itemData} navigation={navigation} />
                            </View>
                        </View>
                    </View>
                </ScrollView>

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