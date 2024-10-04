import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { globalStyle } from '../../../utils/GlobalStyle';
import { FS, HP, VP } from '../../../utils/Responsive';
import Icon, { Icons } from '../../../components/Icons';
import { TextStyles } from '../../../utils/TextStyles';
import { COLORS } from '../../../utils/Constants';
import { itemData } from '../../../utils/MockData';
import PopularMenuItemsSection from '../../../components/items/PopularMenuItems';
import CartLayout from '../../../components/cart/CartLayout';

function PopularMenuScreen({ route, navigation }: { route: any; navigation: any }): React.JSX.Element {
    const { params } = route;
    const { category } = params;

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
                                <Text style={styles.topHeading}>popular {category}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: VP(47.85), paddingHorizontal: HP(21) }}>
                            <Text style={styles.heading}>De lounge Popular {category}</Text>
                        </View>

                        <View style={{ marginTop: VP(18.66), paddingHorizontal: HP(15) }}>
                            <PopularMenuItemsSection data={itemData} navigation={navigation} />
                        </View>

                        <View style={{ marginTop: VP(41) }}>
                            <Text style={styles.highlightedText}>"Indulge your cravings."</Text>
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