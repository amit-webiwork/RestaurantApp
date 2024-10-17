import React, { memo } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    FlatList,
    ImageBackground,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { useDispatch } from 'react-redux';

import { FS, HP, VP } from '../../utils/Responsive';
import { CDN_URL, COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';
import { AppDispatch } from '../../redux/store';
import { addToCart } from '../../utils/helper/CartHelper';
import { getItemPriceComponents } from '../../utils/helper/ItemHelper';
import { globalStyle } from '../../utils/GlobalStyle';

interface Props {
    data: any[];
    dataLoaded: boolean;
    navigation: any;
    loadMore: any;
    hasMoreData: boolean;
    HeaderComponent: any;
    name: string;
}

const { width, height } = Dimensions.get('window');

const FooterComponent = ({ dataLoaded, hasMoreData }: { dataLoaded: boolean, hasMoreData: boolean }) => {
    return (
        <>
            {(dataLoaded) ? <View style={{ flex: 1, height: height * .5,  justifyContent: "center" }}>
                <ActivityIndicator size="large" color={COLORS.BUTTON} /></View> : null}
            {!hasMoreData && (
                <View style={{ marginTop: VP(41), marginBottom: VP(151) }}>
                    <Text style={styles.highlightedText}>"Indulge your cravings."</Text>
                </View>
            )}
        </>
    )
}

const PopularMenuItems: React.FunctionComponent<Props> = ({ data, dataLoaded, navigation, loadMore, hasMoreData, HeaderComponent, name }) => {
    const dispatch: AppDispatch = useDispatch();

    const BoxItems = ({ itemData, index }: { itemData: any, index: number }) => {
        const item = getItemPriceComponents(itemData);
        const isAvailable = item?.is_available === true;

        return (
            <View style={styles.boxContainer}>
                <View style={[styles.boxSubContainer, !isAvailable && globalStyle.outOfStockContainer]}>
                    <TouchableOpacity
                        onPress={() => isAvailable && navigation.navigate(`ProductScreen`, {
                            id: item?.id,
                            item: item
                        })}
                        style={{ width: "100%" }}
                    >
                        <ImageBackground
                            source={{ uri: `${CDN_URL}${item?.imgUrl}` }}
                            style={[styles.bg, !isAvailable && globalStyle.outOfStockBg]}
                            imageStyle={{ borderRadius: FS(16.42), resizeMode: 'cover' }}
                        >
                            {!isAvailable && (
                                <View style={[globalStyle.outOfStockLabel]}>
                                    <Text style={[globalStyle.outOfStockText]}>Out of Stock</Text>
                                </View>
                            )}
                        </ImageBackground>
                    </TouchableOpacity>

                    <View style={styles.contentBox}>
                        <TouchableOpacity
                            onPress={() => void (0)}
                        >
                            <Text style={styles.boxTitle}>{item?.name}</Text>
                            <Text style={styles.boxText}>700mL.  Dairy-free ice crusher.</Text>
                        </TouchableOpacity>

                        <View style={styles.priceBox}>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.priceText, item.discountPrice > 0 && styles.discountedPriceText]}>${item.itemPrice.toFixed(2)}</Text>

                            {item.discountPrice > 0 && (
                                <>
                                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.priceText}>${item.discountPrice.toFixed(2)}</Text>
                                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.discountedPercentText}>${item.discountPercent.toFixed(2)}% Off</Text>
                                </>
                            )}

                        </View>
                        {isAvailable && (
                            <TouchableOpacity
                                onPress={() => addToCart(item, 1, dispatch, `add`)}
                                style={styles.buttonBox}
                            >
                                <Text style={styles.cartText}>add to cart</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View>
            <FlatList
                numColumns={2}
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={({ item, index }) => <BoxItems itemData={item} index={index} />}
                contentContainerStyle={{
                    paddingHorizontal: HP(1.5),
                    marginTop: VP(27),
                }}
                columnWrapperStyle={{
                    justifyContent: 'space-between',
                    marginTop: VP(18.66),
                    paddingHorizontal: HP(15)
                }}
                scrollEnabled={true}
                onEndReached={loadMore}
                onEndReachedThreshold={.5}
                ListHeaderComponent={
                    <HeaderComponent
                        name={name}
                    />
                }
                ListFooterComponent={<FooterComponent dataLoaded={dataLoaded} hasMoreData={hasMoreData} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    boxContainer: {
        marginBottom: HP(10),
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
        color: "#939393",
        textDecorationLine: "line-through",
        textDecorationStyle: "solid",
        fontSize: 14,
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
    highlightedText: {
        ...TextStyles.POPPINS_BOLD,
        fontSize: HP(40),
        color: "#898989",
        lineHeight: HP(47),
        textAlign: "center"
    }
});

const PopularMenuItemsSection = memo(PopularMenuItems);
export default PopularMenuItemsSection;