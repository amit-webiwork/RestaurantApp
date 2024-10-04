import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { globalStyle } from '../../../utils/GlobalStyle';
import { HP, VP } from '../../../utils/Responsive';
import Icon, { Icons } from '../../../components/Icons';
import { TextStyles } from '../../../utils/TextStyles';
import { COLORS } from '../../../utils/Constants';
import { itemData } from '../../../utils/MockData';
import MenuItemsSection from '../../../components/items/MenuItems';
import { ButtonSection as Button } from '../../../components/Button';

function CartMenuScreen({ navigation }: { navigation: any }): React.JSX.Element {
    return (
        <OuterLayout containerStyle={globalStyle.containerStyle}>
            <InnerBlock>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingVertical: HP(20) }}>
                        {/* Navigation Text */}
                        <View style={{ paddingHorizontal: HP(21) }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    style={{ alignSelf: "center" }}
                                >
                                    <Icon type={Icons.Feather} size={18} name={`chevron-left`} color={COLORS.BLACK} />
                                </TouchableOpacity>
                                <Text style={styles.topHeading}>My Cart</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: VP(34.31), paddingHorizontal: HP(21) }}>
                            <Text style={styles.heading}>would you like to add something else</Text>
                        </View>

                        <View style={{ marginTop: VP(26), paddingHorizontal: HP(15) }}>
                            <MenuItemsSection data={itemData} navigation={navigation} />
                        </View>

                        <View style={{ marginTop: VP(54), paddingHorizontal: HP(20) }}>
                            <Button
                                text={'No thanks'}
                                onPress={() => navigation.navigate(`OrderPlacedScreen`)}
                                textStyle={styles.buttonStyle}
                                isLoading={false}
                                activeButtonText={{ opacity: .65 }}
                                mainContainerStyle={{ flex: 1, borderRadius: HP(8) }}
                                LinearGradienrColor={[COLORS.BUTTON, COLORS.BUTTON]}
                                contentContainerStyle={{ top: -2 }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </InnerBlock>
        </OuterLayout>
    )
}

const styles = StyleSheet.create({
    topHeading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 18,
        textTransform: "capitalize",
        textAlign: "center",
        flex: 1
    },
    heading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 16,
        textTransform: "capitalize"
    },
    buttonStyle: {
        ...TextStyles.LEXEND_SEMI_BOLD,
        fontSize: 20,
        color: COLORS.WHITE,
        textTransform: "uppercase",
    }
});

export default CartMenuScreen;