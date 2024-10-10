import React, { memo } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    StyleProp,
    ViewStyle,
    TextStyle
} from 'react-native';

import { FS, HP } from '../../utils/Responsive';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';
import Icon, { Icons } from '../Icons';

interface Props {
    decrement: any;
    qty: number;
    increment: any;
    qtyButtonStyle?: StyleProp<ViewStyle>;
    qtyTextStyle?:StyleProp<TextStyle>;
    iconSize?: number;
}

const CartQtyButtonV2: React.FunctionComponent<Props> = ({ decrement, qty, increment, qtyButtonStyle, qtyTextStyle, iconSize = 20 }) => {
    return (
        <View style={styles.qtyContainer}>
            {/* Minus button */}
            <TouchableOpacity style={[styles.qtyButton, qtyButtonStyle]} onPress={decrement}>
                <Icon type={Icons.Feather} size={iconSize} name={`minus`} color={COLORS.WHITE} />
            </TouchableOpacity>

            {/* TextInput for displaying quantity */}
            <Text style={[styles.qtyText, qtyTextStyle]}>{qty}</Text>

            {/* Plus button */}
            <TouchableOpacity style={[styles.qtyButton, qtyButtonStyle]} onPress={increment}>
                <Icon type={Icons.Feather} size={iconSize} name={`plus`} color={COLORS.WHITE} />
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
    }
});

const CartQtyButtonV2Section = memo(CartQtyButtonV2);
export default CartQtyButtonV2Section;