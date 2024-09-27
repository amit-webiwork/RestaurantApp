import React, { memo, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    FlatList,
    ImageBackground
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Icon, { Icons } from '../Icons';
import { FS, HP, VP } from '../../utils/Responsive';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';
import { fetchItems, itemCount, itemList, itemLoaded } from '../../redux/features/items';
import { AppDispatch } from '../../redux/store';
import ItemBoxLoader from '../skeleton/ItemBoxLoader';

interface Props {
    data: any[];
    navigation: any;
}

const BoxItems = ({ item, index, navigation }: { item: any, index: number, navigation: any }) => {

    return (
        <View style={styles.boxContainer}>
            <View style={styles.boxSubContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(`ProductScreen`, {
                        id: 1
                    })}
                >
                    <ImageBackground source={item.bg} style={styles.bg} imageStyle={{ borderRadius: FS(16.42) }}>
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
                        <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
                        <TouchableOpacity
                            onPress={() => void (0)}
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

const ItemBox: React.FunctionComponent<Props> = ({ data, navigation }) => {
    const dispatch: AppDispatch = useDispatch();

    const ItemLoaded = useSelector(itemLoaded);
    const ItemList = useSelector(itemList);
    const ItemCount = useSelector(itemCount);

    useEffect(() => {
        if (!ItemLoaded) {
            dispatch(fetchItems());
        }
    }, [ItemLoaded])

    console.log(ItemList, ItemLoaded, ItemCount, '-----------ItemList')

    return (
        <View>
            {!ItemLoaded ? (
                <FlatList
                    data={data}
                    renderItem={({ item, index, separators }) => <BoxItems item={item} index={index} navigation={navigation} />}
                    contentContainerStyle={{}}
                    horizontal={true}
                />
            ) : (
                <ItemBoxLoader />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    boxContainer: {
        marginRight: HP(14),
        paddingBottom: 10,
        paddingLeft: 5,
        flexGrow: 1,
        width: "30%",
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