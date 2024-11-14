import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    Dimensions
} from 'react-native';
import { useDispatch } from 'react-redux';

import { FS, HP, VP } from '../../utils/Responsive';
import { TextStyles } from '../../utils/TextStyles';
import CartQtyButtonV2Section from '../product-sections/CartQtyButtonV2';
import { addToCart } from '../../utils/helper/CartHelper';
import { AppDispatch } from '../../redux/store';
import { removeFromCart } from '../../redux/features/cart';
import { CDN_URL, COLORS } from '../../utils/Constants';
import CustomizeItemDialog from '../dialogs/CustomizeItemDialog';

interface Props {
    data: any;
    render: number;
}

const CartItem: React.FunctionComponent<Props> = ({ data, render }) => {
    const dispatch: AppDispatch = useDispatch();

    const slideAnim = useRef(new Animated.Value(300)).current;

    const [cartQuantity, setCartQuantity] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);

    const incrementCart = () => {
        addToCart({ ...data, id: data.itemId }, 1, dispatch, 'add', false);
    }

    const decrementCart = () => {
        if (cartQuantity > 1) {
            addToCart({ ...data, id: data.itemId }, -1, dispatch, 'add', false);
        }
    }

    const removeItemFromCart = () => {
        dispatch(removeFromCart(data.itemId));
    }

    const openDrawer = useCallback(() => {
        setModalVisible(true);
        Animated.timing(slideAnim, {
            toValue: 0, // Slide up
            duration: 300,
            useNativeDriver: true,
        }).start();
    },
        [slideAnim, setModalVisible]
    );

    const closeDrawer = useCallback(() => {
        Animated.timing(slideAnim, {
            toValue: 300,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setModalVisible(false);
        });
    }, [slideAnim, setModalVisible]);

    useEffect(() => {
        setCartQuantity(+data?.qty || 1)
    }, [data])

    return (
        <>
            <CustomizeItemDialog visible={modalVisible} slideAnim={slideAnim} data={data} closeHandler={closeDrawer} render={render} />
            <View style={styles.boxContainer}>
                <View style={styles.boxSubContainer}>
                    <View>
                        <Image source={{ uri: `${CDN_URL}${data?.imgUrl}` }} style={[styles.img]} />
                        <TouchableOpacity
                            onPress={() => openDrawer()}
                            style={{ alignSelf: "center" }}
                        >
                            <Text style={styles.editText}>Edit</Text>
                        </TouchableOpacity>
                    </View>

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
        </>
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
        borderRadius: HP(14)
    },
    itemTitle: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 12,
        textTransform: "capitalize",
        marginRight: HP(5)
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
        fontSize: 14
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
        height: FS(20)
    },
    editText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: COLORS.BUTTON,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        fontSize: 14,
        textAlign: "center"
    }
});

const CartItemSection = memo(CartItem);
export default CartItemSection;