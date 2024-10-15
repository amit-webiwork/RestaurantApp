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
import { CDN_URL, COLORS } from '../../utils/Constants';
import Icon, { Icons } from '../Icons';

interface Props {
    data: any;
}

const ActiveOrderItem: React.FunctionComponent<Props> = ({ data }) => {

    return (
        <View style={styles.boxContainer}>
            <View style={{ flexDirection: "row", gap: HP(19) }}>
                <Image
                    source={require('../../assets/images/order.png')}
                    style={[styles.boxImg]}
                />

                <View style={{ justifyContent: "center", flex: 1 }}>
                    <Text style={styles.itemTitle}>
                        dishes
                    </Text>
                    <Text style={styles.orderText}>
                        ordered on : 12 sep at 5:45 PM
                    </Text>
                </View>
            </View>

            <View style={styles.line}></View>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ gap: HP(8) }}>
                    <Text style={styles.itemText}>•  1 x nutella waffle </Text>
                    <Text style={styles.itemText}>•  1 x pancake </Text>
                    <Text style={styles.itemText}>•  1 x mango boba tea </Text>
                    <Text style={styles.itemText}>•  1 x chocolate cupcake </Text>
                </View>
                <Text style={styles.qtyText}>qty 4</Text>
            </View>

            <View style={styles.line}></View>

            <View style={{ gap: HP(8), flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>
                    <Text style={styles.priceText}> $20.00 </Text>
                    <Text style={styles.statusText}> preparing order </Text>
                </View>
                <Text style={styles.subText}> estimated time: 1/2 hour </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    boxContainer: {
        borderRadius: HP(10),
        borderColor: "#FFF6F6",
        gap: HP(14.69),
        borderWidth: 2,
        shadowColor: "#171717",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: "#fff",
        padding: HP(14)
    },
    boxImg: {
        width: FS(53),
        height: VP(41.31),
        resizeMode: "cover",
        borderRadius: HP(4.17)
    },
    itemTitle: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 14,
        textTransform: "capitalize",
        color: COLORS.BUTTON
    },
    orderText: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 11,
        textTransform: "capitalize",
        color: "#636363",
        marginTop: VP(2)
    },
    priceText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 14,
    },
    statusText: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 12,
        color: "#232323",
        textTransform: "capitalize",
        paddingTop: VP(1)
    },
    subText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 12,
        color: "#606060",
        textTransform: "capitalize"
    },
    itemText: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 14,
        textTransform: "capitalize",
    },
    line: {
        height: 1,
        width: "100%",
        flex: 1,
        flexGrow: 1,
        backgroundColor: "#E6E6E6"
    },
    qtyText: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 12,
        alignSelf: "flex-end"
    }
});

const ActiveOrderItemSection = memo(ActiveOrderItem);
export default ActiveOrderItemSection;