import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { globalStyle } from '../../../utils/GlobalStyle';
import { FS, HP, VP } from '../../../utils/Responsive';
import Icon, { Icons } from '../../../components/Icons';
import { TextStyles } from '../../../utils/TextStyles';
import { COLORS } from '../../../utils/Constants';
import MenuItemsSection from '../../../components/items/MenuItems';
import { ButtonSection as Button } from '../../../components/Button';
import { fetchPopularItems, papularItemLoaded, papularItems } from '../../../redux/features/items';
import { AppDispatch } from '../../../redux/store';
import CartLayout from '../../../components/cart/CartLayout';
import { cartItemList } from '../../../redux/features/cart';

function CartMenuScreen({ navigation }: { navigation: any }): React.JSX.Element {
    const dispatch: AppDispatch = useDispatch();

    const CartItemList = useSelector(cartItemList);
    const PapularItemLoaded = useSelector(papularItemLoaded);
    const PapularItems = useSelector(papularItems);

    const [itemList, setItemList] = useState<any[]>([]);

    useEffect(() => {
        if (!PapularItemLoaded) {
            dispatch(fetchPopularItems());
        } else {
            setItemList(PapularItems);
        }
    }, [PapularItemLoaded])

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
                                    <Icon type={Icons.Feather} size={FS(18)} name={`chevron-left`} color={COLORS.BLACK} />
                                </TouchableOpacity>
                                <Text style={styles.topHeading}>My Cart</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: VP(34.31), paddingHorizontal: HP(21) }}>
                            <Text style={styles.heading}>would you like to add something else</Text>
                        </View>

                        <View style={{ marginTop: VP(26), paddingHorizontal: HP(15) }}>
                            <MenuItemsSection data={itemList} dataLoaded={!PapularItemLoaded} loadMore={() => void (0)} hasMoreData={true} navigation={navigation} loading={false} HeaderComponent={() => { return (<></>) }} />
                        </View>

                        {CartItemList.length > 0 && (
                            <View style={{ marginTop: VP(54), paddingHorizontal: HP(20) }}>
                                <Button
                                    text={'continue'}
                                    onPress={() => navigation.navigate(`OrderPlacedScreen`)}
                                    textStyle={styles.buttonStyle}
                                    isLoading={false}
                                    activeButtonText={{ opacity: .65 }}
                                    mainContainerStyle={{ flex: 1, borderRadius: HP(8) }}
                                    LinearGradienrColor={[COLORS.BUTTON, COLORS.BUTTON]}
                                    contentContainerStyle={{ top: -2 }}
                                />
                            </View>
                        )}
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
        fontSize: 18,
        textTransform: "capitalize",
        textAlign: "center",
        flex: 1,
        alignSelf: "center"
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