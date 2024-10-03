import React, { memo, useEffect } from 'react';
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
import { addToCart } from '../../utils/helper/CartHelper';

interface Props {
    data: any[];
    navigation: any;
}

const { width, height } = Dimensions.get('window');

const MenuItems: React.FunctionComponent<Props> = ({ data, navigation }) => {
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
                        <Image source={require(`../../assets/images/label.png`)} style={{ width: FS(80), height: VP(16), top: VP(16), left: HP(-8), position: "absolute" }} />

                        <Image source={require(`../../assets/images/label-side.png`)} style={{ width: FS(7.67), height: VP(6.39), top: VP(31), left: HP(-8.5), position: "absolute" }} />

                        <Text style={{ ...TextStyles.RALEWAY_SEMI_BOLD, fontSize: 12, textTransform: "capitalize", color: COLORS.WHITE, position: "absolute", top: FS(14), left: HP(10) }}>popular</Text>

                    </TouchableOpacity>

                    <View style={styles.contentBox}>
                        <TouchableOpacity
                            onPress={() => void (0)}
                        >
                            <Text style={styles.boxTitle}>{item.title}</Text>
                            <Text style={styles.boxText}>{item.firstText} {item.secondText}</Text>
                        </TouchableOpacity>

                        <View style={styles.priceBox}>
                            <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
                            <TouchableOpacity
                                onPress={() => addToCart(dispatch)}
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