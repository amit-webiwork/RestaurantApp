import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';

import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { globalStyle } from '../../../utils/GlobalStyle';
import { FS, HP, VP } from '../../../utils/Responsive';
import Icon, { Icons } from '../../../components/Icons';
import { TextStyles } from '../../../utils/TextStyles';
import { COLORS } from '../../../utils/Constants';
import { cartItems, categoryTabData, itemData } from '../../../utils/MockData';
import SearchBoxSection from '../../../components/home-sections/SearchBox';
import CategortyTabsSection from '../../../components/home-sections/CategortyTabs';
import MenuItemsSection from '../../../components/items/MenuItems';
import CartItemSection from '../../../components/cart/CartItem';
import ItemBoxSection from '../../../components/home-sections/ItemBox';
import CookingRequestSection from '../../../components/product-sections/CookingRequest';
import { ButtonSection as Button } from '../../../components/Button';

function OrderPlacedScreen({ navigation }: { navigation: any }): React.JSX.Element {
    const [cookingRequestShow, setCookingRequestShow] = useState(false);

    return (
        <OuterLayout containerStyle={globalStyle.containerStyle}>
            <InnerBlock>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingVertical: HP(20), marginBottom: VP(87) }}>
                        {/* Navigation section */}
                        <View style={{ paddingHorizontal: HP(21) }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate(`HomeScreen`)}
                                    style={{ alignSelf: "center" }}
                                >
                                    <Icon type={Icons.Feather} size={18} name={`chevron-left`} color={COLORS.BLACK} />
                                </TouchableOpacity>
                                <Text style={styles.topHeading}>order tracking</Text>
                            </View>
                            <Text style={styles.orderNo}>#8565565646</Text>

                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <Image source={require(`../../../assets/images/success.png`)} style={[styles.popUpImg]} />

                                <Text style={styles.heading}>order placed</Text>
                                <Text style={styles.text1}>your order is placed sucessfully</Text>
                                <Text style={[styles.text1, { marginTop: VP(50) }]}>estimated time: 1/2 hour</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <TouchableOpacity
                    onPress={() => navigation.navigate(`HomeScreen`)}
                    style={{ alignSelf: "center" }}
                >
                    <Text style={[styles.heading, { fontSize: 14 }]}>order details</Text>
                </TouchableOpacity>
            </InnerBlock>
        </OuterLayout >
    )
}

const styles = StyleSheet.create({
    popUpImg: {
        resizeMode: "contain",
        width: FS(243.55),
        height: VP(201.93),
        marginTop: VP(124)
    },
    topHeading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: "#000000",
        fontSize: 18,
        textTransform: "capitalize",
        textAlign: "center",
        flex: 1,
    },
    heading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 20,
        textTransform: "uppercase",
        marginTop: VP(34.07)
    },
    text1: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 14,
        textTransform: "capitalize",
        color: "#8C8C8C",
        marginTop: VP(12)
    },
    orderNo: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 14,
        textAlign: "center",
        lineHeight: 29.3
    },
});

export default OrderPlacedScreen;