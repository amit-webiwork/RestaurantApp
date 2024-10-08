import React, { memo } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    FlatList,
    ImageBackground
} from 'react-native';

import Icon, { Icons } from '../Icons';
import { FS, HP, VP } from '../../utils/Responsive';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';
import { getItemPriceComponents } from '../../utils/helper/ItemHelper';
import ItemBoxLoaderSection from '../skeleton/ItemBoxLoader';
import MenuItemLoaderSection from '../skeleton/MenuItemLoader';
import MenuVerticalItemLoader from '../skeleton/MenuVerticalItemLoader';
import { addToCart } from '../../utils/helper/CartHelper';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';

interface Props {
    data: any[];
    navigation: any;
    dataLoaded: boolean;
}

const ItemVerticalBox: React.FunctionComponent<Props> = ({ data, dataLoaded, navigation }) => {
    const dispatch: AppDispatch = useDispatch();

    const BoxItems = ({ itemData, index }: { itemData: any, index: number }) => {
        const item = getItemPriceComponents(itemData);

        return (
            <View style={styles.boxContainer}>
                <View style={styles.boxSubContainer}>
                    <View
                        style={{ width: "100%" }}
                    >
                        <ImageBackground source={{ 'uri': item?.imgUrl }} style={styles.bg} imageStyle={{ borderRadius: FS(24.42) }}>
                            <View style={styles.priceBox}>
                                <View style={styles.priceSubBox}>
                                    <Text style={styles.priceText}>${item?.finalPrice.toFixed(2)}</Text>
                                </View>

                                {/* <TouchableOpacity
                                    onPress={() => void (0)}
                                >
                                    <Icon type={Icons.Feather} size={20} name={`heart`} color={COLORS.WHITE} />
                                </TouchableOpacity> */}
                            </View>
                        </ImageBackground>
                    </View>

                    <View style={styles.contentBox}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate(`ProductScreen`, {
                                id: item?.id,
                                item: item
                            })}
                        >
                            <Text style={styles.boxTitle}>{item?.name}</Text>
                            <Text style={styles.boxText}>{`1 piece`}</Text>
                        </TouchableOpacity>

                        <View style={styles.line}>
                        </View>

                        <View style={styles.offerBox}>
                            <View style={{ flexDirection: "row", gap: HP(5) }}>
                                {item.discountPercent > 0 && (
                                    <>
                                        <Icon type={Icons.MaterialCommunityIcons} size={21.39} name={`sale`} color={COLORS.HOME_ICONS} />
                                        <Text style={styles.offerText}>{item.discountPercent.toFixed(2)}% OFF up to ${item.totalDiscounted.toFixed(2)}</Text>
                                    </>
                                )}
                            </View>
                            <TouchableOpacity
                                onPress={() => addToCart(item, 1, dispatch, 'add')}
                                style={styles.iconBox}
                            >
                                <Icon type={Icons.Feather} size={15} name={`plus`} color={COLORS.WHITE} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <>
            {!dataLoaded ? (
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => <BoxItems itemData={item} index={index} />}
                    contentContainerStyle={{}}
                    scrollEnabled={false}
                />
            ) : (<MenuVerticalItemLoader />)}
        </>
    );
};

const styles = StyleSheet.create({
    boxContainer: {
        paddingBottom: HP(16),
        paddingLeft: HP(5),
        paddingRight: HP(5),
    },
    boxSubContainer: {
        paddingHorizontal: HP(6.46),
        paddingVertical: HP(7.67),
        borderRadius: FS(25.35),
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
        width: "100%",
        flex: 1
    },
    contentBox: {
        paddingHorizontal: HP(12.46),
        paddingVertical: HP(8.04),
    },
    boxTitle: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 20,
        textTransform: "capitalize"
    },
    boxText: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 14,
        paddingTop: HP(1.22),
        color: "#787878"
    },
    bg: {
        width: "100%",
        height: VP(234.33),
        resizeMode: "contain",
        flex: 1
    },
    priceBox: {
        marginHorizontal: HP(17.67),
        marginVertical: HP(16.67),
        flexDirection: "row",
        justifyContent: "space-between"
    },
    priceSubBox: {
        backgroundColor: "#00000080",
        padding: 5,
        alignSelf: 'flex-start',
        borderRadius: 4.75,
    },
    priceText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 12.67,
        color: COLORS.WHITE,
        top: VP(-2)
    },
    line: {
        height: 1,
        backgroundColor: "#B4B4B4",
        marginVertical: HP(6.2),
        flex: 1
    },
    offerBox: {
        marginTop: HP(4.01),
        flexDirection: 'row',
        alignItems: "center",
        gap: HP(2),
        justifyContent: "space-between"
    },
    offerText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 16,
        color: COLORS.HOME_ICONS,
        top: VP(-2)
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

const ItemVerticalBoxSection = memo(ItemVerticalBox);
export default ItemVerticalBoxSection;
