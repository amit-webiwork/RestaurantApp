import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { globalStyle } from '../../../utils/GlobalStyle';
import { HP, VP } from '../../../utils/Responsive';
import Icon, { Icons } from '../../../components/Icons';
import { TextStyles } from '../../../utils/TextStyles';
import { COLORS } from '../../../utils/Constants';
import SearchBoxSection from '../../../components/home-sections/SearchBox';
import CategortyTabsSection from '../../../components/home-sections/CategortyTabs';
import MenuItemsSection from '../../../components/items/MenuItems';
import CartLayout from '../../../components/cart/CartLayout';
import { getItemList } from '../../../utils/ApiCall';

function MenuScreen({ route, navigation }: { route: any, navigation: any }): React.JSX.Element {
    const { categoryId } = route.params;

    const [selectedCategory, setSelectedCategory] = useState(categoryId);
    const [itemList, setItemList] = useState([]);
    const [loader, setLoader] = useState(false);

    const setSelectedCategoryhandler = (id: number) => {
        setSelectedCategory(id);
    }

    const fetchItem = async () => {
        try {
            setLoader(true);
            const response = await getItemList();
            setItemList(response.data);
            setLoader(false);
        } catch (err) {
            setLoader(false);
            setItemList([]);
        }
    }

    useEffect(() => {
        fetchItem();
    }, [])

    return (
        <OuterLayout containerStyle={globalStyle.containerStyle}>
            {/* <LottieLoader visible={loader} /> */}
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
                            <CategortyTabsSection setSelectedCategory={setSelectedCategoryhandler} selectedCategory={categoryId} />
                        </View>

                        <View style={{ marginTop: HP(24), paddingHorizontal: HP(18) }}>
                            <SearchBoxSection setHandler={() => void (0)} navigation={navigation} />
                        </View>

                        <View style={{ marginTop: VP(27.59), paddingHorizontal: HP(15) }}>
                            <MenuItemsSection data={itemList} dataLoaded={loader} navigation={navigation} />
                        </View>

                        <View style={{ marginTop: VP(41) }}>
                            <Text style={{ ...TextStyles.POPPINS_BOLD, fontSize: HP(40), color: "#898989", lineHeight: HP(47), textAlign: "center" }}>"Indulge your cravings."</Text>
                        </View>
                    </View>
                </ScrollView>
            </InnerBlock>
            <CartLayout children={undefined} navigation={navigation}></CartLayout>
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