import React, { memo, useEffect, useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    FlatList,
    ImageBackground,
    ScrollView,
    Dimensions,
    Image
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Icon, { Icons } from '../Icons';
import { FS, HP, VP } from '../../utils/Responsive';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';
import { fetchItems, itemCount, itemList, itemLoaded } from '../../redux/features/items';
import { AppDispatch } from '../../redux/store';
import ItemBoxLoaderSection from '../skeleton/ItemBoxLoader';
import MenuItemLoaderSection from '../skeleton/MenuItemLoader';
import CartNotificationBarSection from '../cart/CartNotificationBar';
import { addToCart } from '../../utils/helper/CartHelper';

interface Props {
    data: any[];
    navigation: any;
}

const { width, height } = Dimensions.get('window');

const PopularMenuItems: React.FunctionComponent<Props> = ({ data, navigation }) => {
    const dispatch: AppDispatch = useDispatch();

    const ItemLoaded = useSelector(itemLoaded);

    useEffect(() => {
        if (!ItemLoaded) {
            dispatch(fetchItems());
        }
    }, [ItemLoaded])

    const BoxItems = ({ item, index }: { item: any, index: number }) => {
        
        return (
            <View style={styles.boxContainer}>
                <View style={styles.boxSubContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(`ProductScreen`, {
                            id: 1
                        })}
                        style={{ width: "100%" }}
                    >
                        <ImageBackground
                            source={item.bg}
                            style={styles.bg}
                            imageStyle={{ borderRadius: FS(16.42), resizeMode: 'cover' }}
                        >
                        </ImageBackground>
                    </TouchableOpacity>

                    <View style={styles.contentBox}>
                        <TouchableOpacity
                            onPress={() => void (0)}
                        >
                            <Text style={styles.boxTitle}>{item.title}</Text>
                            <Text style={styles.boxText}>{item.firstText} {item.secondText}</Text>
                        </TouchableOpacity>

                        <View style={styles.priceBox}>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.discountedPriceText}>${item.price.toFixed(2)}</Text>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.priceText}>${item.discountedPrice.toFixed(2)}</Text>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.discountedPercentText}>${item.discountedPercent}% Off</Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => addToCart(dispatch)}
                            style={styles.buttonBox}
                        >
                            <Text style={styles.cartText}>add to cart</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View>
            {!ItemLoaded ? (
                <FlatList
                    numColumns={2}
                    data={data}
                    renderItem={({ item, index, separators }) => <BoxItems item={item} index={index} />}
                    contentContainerStyle={{
                        paddingHorizontal: HP(1.5)
                    }}
                    columnWrapperStyle={{
                        justifyContent: 'space-between'
                    }}
                    scrollEnabled={false}
                />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <MenuItemLoaderSection />
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    boxContainer: {
        marginBottom: HP(20),
        paddingHorizontal: HP(0.75),
        width: (width / 2) - HP(23.25),
        marginHorizontal: HP(3), // Space between items horizontally

    },
    boxSubContainer: {
        borderRadius: FS(16.42),
        shadowOpacity: 0.2,
        backgroundColor: COLORS.WHITE,
        shadowColor: "#000",
        shadowOffset: {
            width: -2,
            height: 4,
        },
        shadowRadius: 3,
        elevation: 4,
        flexDirection: "column",
        flexWrap: "wrap",
        width: '100%',
    },
    contentBox: {
        paddingHorizontal: HP(10),
        paddingVertical: HP(10)
    },
    boxTitle: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 14,
        textTransform: "capitalize"
    },
    boxText: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 12,
        paddingTop: HP(4),
        color: "#787878"
    },
    bg: {
        width: '100%',
        height: VP(160.16),
        resizeMode: "cover",
        borderRadius: FS(16.42),
        overflow: 'hidden',
    },
    priceBox: {
        paddingTop: HP(12),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        paddingBottom: HP(16)
    },
    discountedPriceText: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 14,
        color: "#939393",
        textDecorationLine: "line-through",
        textDecorationStyle: "solid",
        flexShrink: 1,
    },
    priceText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 14,
        flexShrink: 1,
    },
    discountedPercentText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 10.52,
        color: COLORS.BUTTON,
        textTransform: "uppercase",
        flexShrink: 1,
    },
    buttonBox: {
        padding: HP(6),
        alignItems: "center",
        borderTopColor: "#D3D3D3",
        borderTopWidth: 1,
    },
    cartText: {
        ...TextStyles.LEXEND_MEDIUM,
        fontSize: 16,
        color: COLORS.BUTTON,
        textTransform: "capitalize"
    },
});

const PopularMenuItemsSection = memo(PopularMenuItems);
export default PopularMenuItemsSection;