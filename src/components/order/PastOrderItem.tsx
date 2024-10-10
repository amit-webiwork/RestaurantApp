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
import { CDN_URL, COLORS } from '../../utils/Constants';
import Icon, { Icons } from '../Icons';
import { ButtonSection as Button } from '../Button';

interface Props {
    data: any;
}

const PastOrderItem: React.FunctionComponent<Props> = ({ data }) => {
    const [cartQuantity, setCartQuantity] = useState(1);

    const incrementCart = () => {
        setCartQuantity((pre) => (++pre));
    }

    const decrementCart = () => {
        if (cartQuantity > 1) {
            setCartQuantity((pre) => (--pre));
        }
    }

    return (
        <View style={styles.boxContainer}>
            <TouchableOpacity
                onPress={() => void (0)}
                style={{ flex: 1 }}
            >
                <Image
                    source={require('../../assets/images/sweet.png')}
                    style={[styles.boxImg]} />
            </TouchableOpacity>

            <View style={{ padding: HP(10), justifyContent: "center", flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                    <TouchableOpacity
                        onPress={() => void (0)}
                    >
                        <Text style={styles.itemTitle}>
                            nutella waffle
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => void (0)}
                        style={{}}
                    >
                        <Icon type={Icons.Feather} size={18} name={`chevron-right`} color={`#686868`} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.orderText}>
                    ordered on : 12 sep at 5:45 PM
                </Text>
                <View style={{ marginTop: VP(19), flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.priceText}>
                        $20.00
                    </Text>
                    <CartQtyButtonV2Section decrement={decrementCart} qty={cartQuantity} increment={incrementCart} qtyButtonStyle={{ width: FS(18), height: FS(18), borderRadius: FS(9) }} qtyTextStyle={{ fontSize: 16 }} iconSize={16} />
                </View>
                <View style={{ width: "50%", alignItems: "flex-end", alignSelf: "flex-end" }}>
                    <Button
                        text={`reorder`}
                        onPress={() => void (0)}
                        textStyle={styles.buttonStyle}
                        isLoading={false}
                        activeButtonText={{ opacity: .65 }}
                        mainContainerStyle={{ borderRadius: HP(3), marginTop: VP(20), flex: 1 }}
                        LinearGradienrColor={[COLORS.BUTTON, COLORS.BUTTON]}
                        contentContainerStyle={{ top: -2 }}
                        style={{ width: FS(79), height: VP(19), }}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    boxContainer: {
        borderRadius: HP(10),
        borderColor: "#FFF6F6",
        flexDirection: "row",
        gap: HP(6),
        borderWidth: 2,
        // Shadow for iOS
        shadowColor: "#171717",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,

        // Shadow for Android
        elevation: 5,
        backgroundColor: "#fff" // Ensure background color is set for shadows to work
    },
    boxImg: {
        width: "100%",
        height: VP(138),
        resizeMode: "cover",
        borderTopLeftRadius: HP(10),
        borderBottomLeftRadius: HP(10),
        flex: 1,
    },
    itemTitle: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: HP(12),
        textTransform: "capitalize",
        color: COLORS.BUTTON
    },
    orderText: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: HP(10),
        textTransform: "capitalize",
        color: "#636363",
        marginTop: VP(1)
    },
    priceText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: HP(14),
    },
    buttonStyle: {
        ...TextStyles.LEXEND_SEMI_BOLD,
        fontSize: 10,
        color: COLORS.WHITE,
        textTransform: "capitalize"
    }
});

const PastOrderItemSection = memo(PastOrderItem);
export default PastOrderItemSection;