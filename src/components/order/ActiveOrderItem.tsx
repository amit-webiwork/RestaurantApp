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
            <TouchableOpacity
                onPress={() => void (0)}
                style={{ flex: 1 }}
            >
                <Image
                    source={require('../../assets/images/colorful.png')}
                    style={[styles.boxImg]} />
            </TouchableOpacity>

            <View style={{ padding: HP(10), justifyContent: "center", flex: 1 }}>
                <TouchableOpacity
                    onPress={() => void (0)}
                >
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.itemTitle}>
                            nutella waffle
                        </Text>
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
                        <Text style={styles.qtyText}>
                            Qty: 2
                        </Text>
                    </View>
                    <View style={{ marginTop: VP(16) }}>
                        <Text style={styles.helpText}>
                            preparing order
                        </Text>
                        <Text style={styles.helpText}>
                            estimated time: 1/2 hour
                        </Text>
                    </View>
                </TouchableOpacity>
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
        flex: 1,
        resizeMode: "cover",
        borderTopLeftRadius: HP(10),
        borderBottomLeftRadius: HP(10)
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
    qtyText: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: HP(10),
    },
    helpText: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: HP(12),
        textTransform: "capitalize",
    }
});

const ActiveOrderItemSection = memo(ActiveOrderItem);
export default ActiveOrderItemSection;