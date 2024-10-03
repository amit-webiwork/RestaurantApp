import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { globalStyle } from '../../../utils/GlobalStyle';
import { FS, HP, VP } from '../../../utils/Responsive';
import Icon, { Icons } from '../../../components/Icons';
import { TextStyles } from '../../../utils/TextStyles';
import { COLORS } from '../../../utils/Constants';
import { categoryTabData, itemData } from '../../../utils/MockData';
import SearchBoxSection from '../../../components/home-sections/SearchBox';
import CategortyTabsSection from '../../../components/home-sections/CategortyTabs';
import MenuItemsSection from '../../../components/items/MenuItems';
import CartLayout from '../../../components/cart/CartLayout';

function MenuScreen({ navigation }: { navigation: any }): React.JSX.Element {
    return (
        <OuterLayout containerStyle={globalStyle.containerStyle}>
            <InnerBlock>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingVertical: HP(20), marginBottom: VP(79) }}>
                        <View style={{ paddingHorizontal: HP(21) }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    style={{ alignSelf: "center" }}
                                >
                                    <Icon type={Icons.Feather} size={18} name={`chevron-left`} color={COLORS.BLACK} />
                                </TouchableOpacity>
                                <Text style={styles.topHeading}>Menu</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: VP(45), paddingHorizontal: HP(21) }}>
                            <CategortyTabsSection data={categoryTabData} setSelectedCategory={() => void (0)} />
                        </View>

                        <View style={{ marginTop: HP(24), paddingHorizontal: HP(18) }}>
                            <SearchBoxSection setHandler={() => void (0)} navigation={navigation} />
                        </View>

                        <View style={{ marginTop: VP(27.59), paddingHorizontal: HP(15) }}>
                            <MenuItemsSection data={itemData} navigation={navigation} />
                        </View>

                        <View style={{ marginTop: VP(41) }}>
                            <Text style={{ ...TextStyles.POPPINS_BOLD, fontSize: HP(40), color: "#898989", lineHeight: HP(47), textAlign: "center" }}>"Indulge your cravings."</Text>
                        </View>
                    </View>
                </ScrollView>
            </InnerBlock>
            <CartLayout children={undefined}></CartLayout>
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
});

export default MenuScreen;