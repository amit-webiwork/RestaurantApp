import React, { memo } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    TextInput
} from 'react-native';

import { FS, HP } from '../../utils/Responsive';
import { COLORS } from '../../utils/Constants';

interface Props {
    decrement: any;
    qty: number;
    setQty: any;
    increment: any;
}

const CartQtyButtonV1: React.FunctionComponent<Props> = ({ decrement, qty, setQty, increment }) => {
    return (
        <View style={styles.qtyContainer}>
            {/* Minus button */}
            <TouchableOpacity style={styles.qtyButton} onPress={decrement}>
                <Text style={styles.qtyButtonText}>-</Text>
            </TouchableOpacity>

            {/* TextInput for displaying quantity */}
            <TextInput
                style={styles.qtyInput}
                value={String(qty)}
                keyboardType="numeric"
                onChangeText={(value) => {
                    const parsedValue = parseInt(value, 10);
                    if (!isNaN(parsedValue)) {
                        setQty(parsedValue);
                    }
                }}
            />

            {/* Plus button */}
            <TouchableOpacity style={styles.qtyButton} onPress={increment}>
                <Text style={styles.qtyButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    qtyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.WHITE,
        borderRadius: HP(62.5),
        overflow: 'hidden',
        width: FS(125),
    },
    qtyButton: {
        backgroundColor: COLORS.BUTTON,
        paddingLeft: HP(10),
        paddingRight: HP(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtyButtonText: {
        fontSize: 21,
        fontWeight: "bold",
        color: COLORS.WHITE,
    },
    qtyInput: {
        flex: 1,
        textAlign: 'center',
        fontSize: 21,
        padding: 0,
        backgroundColor: COLORS.BUTTON,
        color: COLORS.WHITE,
        fontWeight: "bold"
    }
});

const CartQtyButtonV1Section = memo(CartQtyButtonV1);
export default CartQtyButtonV1Section;