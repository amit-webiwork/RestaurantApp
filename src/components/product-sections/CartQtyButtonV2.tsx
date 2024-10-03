import React, { memo } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    TextInput,
    Image
} from 'react-native';

import { FS, HP, VP } from '../../utils/Responsive';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';
import Icon, { Icons } from '../Icons';

interface Props {
    decrement: any;
    qty: number;
    increment: any;
}

const CartQtyButtonV2: React.FunctionComponent<Props> = ({ decrement, qty, increment }) => {
    return (
        <View style={styles.qtyContainer}>
            {/* Minus button */}
            <TouchableOpacity style={styles.qtyButton} onPress={decrement}>
                <Icon type={Icons.Feather} size={20} name={`minus`} color={COLORS.WHITE} />
            </TouchableOpacity>

            {/* TextInput for displaying quantity */}
            <Text style={styles.qtyText}>{qty}</Text>

            {/* Plus button */}
            <TouchableOpacity style={styles.qtyButton} onPress={increment}>
                <Icon type={Icons.Feather} size={20} name={`plus`} color={COLORS.WHITE} />
            </TouchableOpacity>

            {/* Remove button */}
            <TouchableOpacity onPress={() => void (0)}>
                <Image source={require(`../../assets/icons/cart-remove.png`)} style={[styles.img]} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    qtyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: HP(8)
    },
    qtyButton: {
        backgroundColor: COLORS.BUTTON,
        justifyContent: 'center',
        alignItems: 'center',
        width: FS(22),
        height: FS(22),
        borderRadius: FS(11)
    },
    qtyText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 18,
        lineHeight: 20
    },
    img: {
        width: FS(20),
        height: VP(20)
    }
});

const CartQtyButtonV2Section = memo(CartQtyButtonV2);
export default CartQtyButtonV2Section;