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
import CartQtyButtonV2Section from '../product-sections/CartQtyButtonV2';

interface Props {
    data: any;
}

const { width, height } = Dimensions.get('window');

const CartItem: React.FunctionComponent<Props> = ({ data }) => {
    const [cartQuantity, setCartQuantity] = useState(1);

    const incrementCart = () => setCartQuantity(prevQty => prevQty + 1);
    const decrementCart = () => setCartQuantity(prevQty => (prevQty > 1 ? prevQty - 1 : 1));

    useEffect(() => {
        setCartQuantity(+data?.qty || 1)
    }, [data])

    return (
        <View style={styles.boxContainer}>
            <View style={styles.boxSubContainer}>
                <Image source={data?.bg} style={[styles.img]} />

                <View style={styles.itemInfoContainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.itemTitle}>{data?.title || ""}</Text>
                        <Text style={styles.itemPrice}>${(data?.price || 0).toFixed(2)}</Text>
                    </View>

                    <CartQtyButtonV2Section decrement={decrementCart} qty={cartQuantity} increment={incrementCart} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    boxContainer: {
        padding: HP(21),
        borderBottomColor: "#E3E3E3",
        borderBottomWidth: 1
    },
    boxSubContainer: {
        flexDirection: "row",
        gap: HP(20),
        alignItems: "center",
        justifyContent: "space-between"
    },
    img: {
        width: FS(83),
        height: VP(83),
        resizeMode: "contain",
        borderRadius: HP(14)
    },
    itemTitle: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 12,
        textTransform: "capitalize",
        marginRight: HP(5),
    },
    itemInfoContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    itemPrice: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 14,
    }
});

const CartItemSection = memo(CartItem);
export default CartItemSection;