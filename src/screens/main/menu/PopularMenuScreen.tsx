import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { globalStyle } from '../../../utils/GlobalStyle';
import { HP, VP } from '../../../utils/Responsive';
import Icon, { Icons } from '../../../components/Icons';
import { TextStyles } from '../../../utils/TextStyles';
import { COLORS } from '../../../utils/Constants';
import { itemData } from '../../../utils/MockData';
import PopularMenuItemsSection from '../../../components/items/PopularMenuItems';
import CartLayout from '../../../components/cart/CartLayout';
import { getItemList } from '../../../utils/ApiCall';

function PopularMenuScreen({ route, navigation }: { route: any; navigation: any }): React.JSX.Element {
    const { params } = route;
    const { categoryId, name } = params;

    const [loader, setLoader] = useState(false);
    const [itemList, setItemList] = useState([]);

    const fetchItem = async () => {
        try {
            setLoader(true);
            const response = await getItemList({ popular: 1 });
            setItemList(response.data);
            setLoader(false);
        } catch (err) {
            setLoader(false);
            setItemList([]);
        }
    }

    useEffect(() => {
        fetchItem();
    }, [categoryId])

    return (
        <OuterLayout containerStyle={globalStyle.containerStyle}>
            <InnerBlock>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingVertical: HP(20), marginBottom: VP(79) }}>
                        {/* Top navigation */}
                        <View style={{ paddingHorizontal: HP(21) }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    style={{ alignSelf: "center" }}
                                >
                                    <Icon type={Icons.Feather} size={18} name={`chevron-left`} color={COLORS.BLACK} />
                                </TouchableOpacity>
                                <Text style={styles.topHeading}>popular {name}</Text>
                            </View>
                        </View>

                        {/* Heading */}
                        <View style={{ marginTop: VP(47.85), paddingHorizontal: HP(21) }}>
                            <Text style={styles.heading}>De lounge Popular {name}</Text>
                        </View>

                        <View style={{ marginTop: VP(18.66), paddingHorizontal: HP(15) }}>
                            <PopularMenuItemsSection data={itemList} dataLoaded={loader} navigation={navigation} />
                        </View>

                        {/* Bottom text */}
                        <View style={{ marginTop: VP(41) }}>
                            <Text style={styles.highlightedText}>"Indulge your cravings."</Text>
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
    heading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: "#000000",
        fontSize: 18,
        textTransform: "capitalize"
    },
    highlightedText: {
        ...TextStyles.POPPINS_BOLD,
        fontSize: HP(40),
        color: "#898989",
        lineHeight: HP(47),
        textAlign: "center"
    }
});

export default PopularMenuScreen;