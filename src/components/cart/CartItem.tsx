import React, { memo, useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { useDispatch } from 'react-redux';


import { FS, HP, VP } from '../../utils/Responsive';
import { TextStyles } from '../../utils/TextStyles';
import CartQtyButtonV2Section from '../product-sections/CartQtyButtonV2';
import { addToCart } from '../../utils/helper/CartHelper';
import { AppDispatch } from '../../redux/store';
import { removeFromCart } from '../../redux/features/cart';
import { CDN_URL } from '../../utils/Constants';

interface Props {
    data: any;
}

const CartItem: React.FunctionComponent<Props> = ({ data }) => {
    const dispatch: AppDispatch = useDispatch();

    const [cartQuantity, setCartQuantity] = useState(1);

    const incrementCart = () => {
        addToCart({ ...data, id: data.itemId }, 1, dispatch, 'add');
    }

    const decrementCart = () => {
        if (cartQuantity > 1) {
            addToCart({ ...data, id: data.itemId }, -1, dispatch, 'add');
        }
    }

    const removeItemFromCart = () => {
        dispatch(removeFromCart(data.itemId));
    }

    useEffect(() => {
        setCartQuantity(+data?.qty || 1)
    }, [data])

    return (
        <View style={styles.boxContainer}>
            <View style={styles.boxSubContainer}>
                <Image source={{ uri: `${CDN_URL}${data?.imgUrl}` }} style={[styles.img]} />

                <View style={styles.itemInfoContainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.itemTitle}>{data?.name || ""}</Text>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.itemPrice, data.discountPrice > 0 && styles.discountedPriceText]}>${data?.itemPrice?.toFixed(2) || 0.00}</Text>

                        {data.discountPrice > 0 && (
                            <>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemPrice}>${data.discountPrice.toFixed(2)}</Text>
                            </>
                        )}
                    </View>

                    <CartQtyButtonV2Section decrement={decrementCart} qty={cartQuantity} increment={incrementCart} />

                    {/* Remove button */}
                    <TouchableOpacity onPress={removeItemFromCart}>
                        <Image source={require(`../../assets/icons/cart-remove.png`)} style={[styles.iconImg]} />
                    </TouchableOpacity>
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
        resizeMode: "cover",
        borderRadius: HP(14),
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
        gap: HP(8)
    },
    itemPrice: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 14,
    },
    discountedPriceText: {
        ...TextStyles.RALEWAY_MEDIUM,
        color: "#939393",
        textDecorationLine: "line-through",
        textDecorationStyle: "solid",
        fontSize: 14
    },
    iconImg: {
        width: FS(20),
        height: VP(20)
    }
});

const CartItemSection = memo(CartItem);
export default CartItemSection;