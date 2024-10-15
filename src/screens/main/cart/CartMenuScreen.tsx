import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { globalStyle } from '../../../utils/GlobalStyle';
import { FS, HP, VP } from '../../../utils/Responsive';
import Icon, { Icons } from '../../../components/Icons';
import { TextStyles } from '../../../utils/TextStyles';
import { COLORS, errorMessage } from '../../../utils/Constants';
import MenuItemsSection from '../../../components/items/MenuItems';
import { ButtonSection as Button } from '../../../components/Button';
import { fetchPopularItems, papularItemLoaded, papularItems } from '../../../redux/features/items';
import { AppDispatch } from '../../../redux/store';
import CartLayout from '../../../components/cart/CartLayout';
import { cartItemList, cartLoading, instructionText } from '../../../redux/features/cart';
import { orderSubmit } from '../../../utils/ApiCall';
import { setDialogContent } from '../../../redux/features/customDialog';
import Warning from '../../../assets/svgs/warning.svg';
import NormalLoader from '../../../components/NormalLoader';

function CartMenuScreen({ navigation }: { navigation: any }): React.JSX.Element {
    const dispatch: AppDispatch = useDispatch();

    const CartItemList = useSelector(cartItemList);
    const PapularItemLoaded = useSelector(papularItemLoaded);
    const PapularItems = useSelector(papularItems);
    const InstructionText = useSelector(instructionText);
    const CartLoading = useSelector(cartLoading);

    const [itemList, setItemList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!PapularItemLoaded) {
            dispatch(fetchPopularItems());
        } else {
            setItemList(PapularItems);
        }
    }, [PapularItemLoaded])

    const handleClick = async () => {
        setLoading(true);
        try {
            // now call order API
            const dataPayload = {
                extraNote: InstructionText,
                items: CartItemList.map((d: { itemId: number; qty: number; }) => { return { itemId: d.itemId, qty: d.qty, customizations: {} } })
            };

            const response: any = await orderSubmit(dataPayload);

            navigation.navigate(`OrderPlacedScreen`, {
                ...response.data
            })

            setLoading(false);
        } catch (err: any) {
            setLoading(false);
            console.log(err?.message, '---err');
            dispatch(setDialogContent({ title: <Warning width={FS(40)} height={VP(40)} />, message: err?.response?.data?.message || err?.message || errorMessage?.commonMessage }));
        }
    }

    console.log(`---CartMenuScreen loading`)

    return (
        <OuterLayout containerStyle={globalStyle.containerStyle}>
            <NormalLoader visible={loading || CartLoading} />
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
                                    onPress={handleClick}
                                    textStyle={styles.buttonStyle}
                                    isLoading={loading}
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