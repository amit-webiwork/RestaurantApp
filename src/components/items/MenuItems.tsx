import React, { memo } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    FlatList,
    ImageBackground,
    ScrollView,
    Dimensions,
    Image,
    ActivityIndicator,
    StyleProp,
    ViewStyle
} from 'react-native';
import { useDispatch } from 'react-redux';

import Icon, { Icons } from '../Icons';
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
    loading: boolean;
    scrollEnabled?: boolean;
    setSelectedCategoryhandler?: any;
    selectedCategory?: number;
    HeaderComponent: any;
    columnWrapperStyle?: StyleProp<ViewStyle>;
}

const { width, height } = Dimensions.get('window');

const MenuItems: React.FunctionComponent<Props> = ({ data, dataLoaded, loadMore, hasMoreData, loading, navigation, setSelectedCategoryhandler, selectedCategory, HeaderComponent, columnWrapperStyle, scrollEnabled = false }) => {
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
                                    <Text style={[globalStyle.outOfStockText, { fontSize: 14.71 }]}>Out of Stock</Text>
                                </View>
                            )}
                        </ImageBackground>
                        <Image source={require(`../../assets/images/label.png`)} style={{ width: FS(80), height: VP(16), top: VP(16), left: HP(-8), position: "absolute" }} />

                        <Image source={require(`../../assets/images/label-side.png`)} style={{ width: FS(7.67), height: VP(6.39), top: VP(31), left: HP(-8.5), position: "absolute" }} />

                        <Text style={{ ...TextStyles.RALEWAY_SEMI_BOLD, fontSize: 12, textTransform: "capitalize", color: COLORS.WHITE, position: "absolute", top: FS(14), left: HP(10) }}>popular</Text>

                    </TouchableOpacity>

                    <View style={styles.contentBox}>
                        <TouchableOpacity
                            onPress={() => void (0)}
                        >
                            <Text style={styles.boxTitle}>{item?.name}</Text>

                            <Text style={styles.boxText}>{`700mL.`} {`Dairy-free ice crusher.`}</Text>
                        </TouchableOpacity>

                        <View style={styles.priceBox}>

                            <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.priceText, item.discountPrice > 0 && styles.discountedPriceText]}>${item.itemPrice.toFixed(2)}</Text>

                            {item.discountPrice > 0 && (
                                <>
                                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.priceText}>${item.discountPrice.toFixed(2)}</Text>
                                </>
                            )}
                            {isAvailable && (
                                <TouchableOpacity
                                    onPress={() => addToCart(item, 1, dispatch, 'add')}
                                    style={styles.iconBox}
                                >
                                    <Icon type={Icons.Feather} size={15} name={`plus`} color={COLORS.WHITE} />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={data}
                renderItem={({ item, index }) => <BoxItems itemData={item} index={index} />}
                contentContainerStyle={{
                    paddingHorizontal: HP(1.5)
                }}
                columnWrapperStyle={[columnWrapperStyle, {
                    justifyContent: 'space-between',

                }]}
                scrollEnabled={scrollEnabled}
                onEndReached={loadMore}
                onEndReachedThreshold={.5} // Load more when user scrolls 50% near the end
                ListHeaderComponent={<HeaderComponent setSelectedCategoryhandler={setSelectedCategoryhandler} selectedCategory={selectedCategory} loading={loading} navigation={navigation} />}
                ListFooterComponent={() => {
                    return (
                        <>
                            {(dataLoaded) ? <ActivityIndicator size="large" color={COLORS.BUTTON} /> : null}
                            {!hasMoreData && (
                                <View style={{ marginTop: VP(41) }}>
                                    <Text style={{ ...TextStyles.POPPINS_BOLD, fontSize: HP(40), color: "#898989", lineHeight: HP(47), textAlign: "center" }}>"Indulge your cravings."</Text>
                                </View>
                            )}
                        </>
                    )
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    boxContainer: {
        marginBottom: HP(20),
        paddingHorizontal: HP(0.75),
        width: (width / 2) - HP(23.25),
        marginHorizontal: HP(3)

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
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 14.71,
        textTransform: "capitalize"
    },
    boxText: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 10.51,
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
        justifyContent: "space-between"
    },
    priceText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 16.81
    },
    discountedPriceText: {
        ...TextStyles.RALEWAY_MEDIUM,
        color: "#939393",
        textDecorationLine: "line-through",
        textDecorationStyle: "solid",
        fontSize: 16.81
    },
    iconBox: {
        width: FS(20),
        height: FS(20),
        borderRadius: FS(10),
        borderColor: "#383838",
        backgroundColor: "#383838",
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const MenuItemsSection = memo(MenuItems);
export default MenuItemsSection;