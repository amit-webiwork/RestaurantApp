import React, { memo, useCallback, useRef } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    FlatList,
    ImageBackground
} from 'react-native';
import { useDispatch } from 'react-redux';

import Icon, { Icons } from '../Icons';
import { FS, HP, VP } from '../../utils/Responsive';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';
import { AppDispatch } from '../../redux/store';
import ItemBoxLoaderSection from '../skeleton/ItemBoxLoader';
import { addToCart } from '../../utils/helper/CartHelper';
import { useFocusEffect } from '@react-navigation/native';
import { getItemPriceComponents } from '../../utils/helper/ItemHelper';

interface Props {
    data: any[];
    dataLoaded: boolean;
    navigation: any;
}

const ItemBox: React.FunctionComponent<Props> = ({ data, dataLoaded, navigation }) => {
    const dispatch: AppDispatch = useDispatch();

    const flatlistRef = useRef<any>();

    useFocusEffect(
        useCallback(() => {
            if (data.length > 0) {
                scrollToIndex(0)
            }
        }, [data.length])
    )

    const scrollToIndex = (index: number) => {
        flatlistRef?.current?.scrollToIndex({
            animated: true,
            index: index,
        });
    }

    const BoxItems = ({ itemData, index }: { itemData: any, index: number }) => {
        const item = getItemPriceComponents(itemData);

        return (
            <View style={styles.boxContainer}>
                <View style={styles.boxSubContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(`ProductScreen`, {
                            id: item?.id,
                            item: item
                        })}
                    >
                        <ImageBackground
                            source={{ 'uri': item?.imgUrl }}
                            style={styles.bg}
                            imageStyle={{ borderRadius: FS(16.42) }}
                        >
                        </ImageBackground>
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
        <View>
            {(dataLoaded) ? (
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => <BoxItems itemData={item} index={index} />}
                    contentContainerStyle={{}}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    ref={flatlistRef}
                />
            ) : (
                <ItemBoxLoaderSection />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    boxContainer: {
        marginRight: HP(14),
        paddingBottom: 10,
        paddingLeft: 5,
        flexGrow: 1
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
        width: FS(183),
    },
    contentBox: {
        paddingHorizontal: HP(10),
        paddingVertical: HP(10)
    },
    boxTitle: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 14,
        textTransform: "capitalize"
    },
    boxText: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 10,
        paddingTop: HP(4)
    },
    bg: {
        width: FS(183),
        height: VP(194),
        resizeMode: "contain",
    },
    priceBox: {
        paddingTop: HP(12),
        flexDirection: "row",
        justifyContent: "space-between"
    },
    priceText: {
        ...TextStyles.RALEWAY_SEMI_BOLD
    },
    discountedPriceText: {
        ...TextStyles.RALEWAY_MEDIUM,
        color: "#939393",
        textDecorationLine: "line-through",
        textDecorationStyle: "solid"
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

const ItemBoxSection = memo(ItemBox);
export default ItemBoxSection;