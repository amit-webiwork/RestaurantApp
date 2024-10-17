import React, { memo, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import moment from 'moment';

import { FS, HP, VP } from '../../utils/Responsive';
import { TextStyles } from '../../utils/TextStyles';
import { COLORS } from '../../utils/Constants';
import Icon, { Icons } from '../Icons';
import { ButtonSection as Button } from '../Button';
import { getOrderComponents } from '../../utils/helper/OrderHelper';
import CustomActionDialogComp from '../dialogs/CustomActionDialog';
import { globalStyle } from '../../utils/GlobalStyle';

const titleDelete = `Confirm Delete`;
const messageDelete = `Are you sure you want to delete this order?`;

interface Props {
    item: any;
    index: number;
    navigation: any;
    deleteHandler: any;
}

const PastOrderItem = ({ item, index, navigation, deleteHandler }: Props) => {
    const orderData = getOrderComponents(item);

    const [menuVisible, setMenuVisible] = useState(false);
    const [orderDeleteDialogVisible, setOrderDeleteDialogVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const orderDeleteHandler = () => {
        deleteHandler(orderData?.id);
        setOrderDeleteDialogVisible(false);
    }

    const reorderHandler = () => {

    }

    return (
        <>
            <CustomActionDialogComp
                visible={orderDeleteDialogVisible}
                title={titleDelete}
                message={messageDelete}
                onClose={() => setOrderDeleteDialogVisible(false)}
                onAction={orderDeleteHandler}
                dialogTitleStyle={globalStyle.dialogTitleStyle}
                dialogMessageStyle={globalStyle.dialogMessageStyle}
                buttonAction={true}
                buttonText1={`No, I won’t`}
                buttonText2='Yes, Of course'
            />
            <View style={styles.boxContainer}>
                {/* Top section for showing order date, order image, order number, menu icon */}
                <View style={{ flexDirection: "row", gap: HP(19) }}>
                    <Image
                        source={require('../../assets/images/order.png')}
                        style={[styles.boxImg]}
                    />

                    <View style={{ justifyContent: "center", flex: 1 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.itemTitle}>
                                dishes
                            </Text>
                            <Text style={styles.itemTitle}>
                                #{orderData?.id}
                            </Text>
                        </View>
                        <Text style={styles.orderText}>
                            ordered on : {moment(orderData?.createdAt).format('DD MMM YYYY HH:mm A')}
                        </Text>
                    </View>

                    {/* Popup menu for view orders and delete orders */}
                    <View>
                        <TouchableOpacity
                            onPress={toggleMenu}
                        >
                            <Icon type={Icons.Feather} size={FS(15)} name={`more-vertical`} color={`#686868`} />
                        </TouchableOpacity>

                        {menuVisible && (
                            <View style={styles.menu}>
                                <TouchableOpacity
                                    onPress={() => {
                                        toggleMenu();
                                        setOrderDeleteDialogVisible(true);
                                    }}
                                    style={{ flexDirection: "row", alignItems: "center", gap: HP(7.25) }}
                                >
                                    <Icon type={Icons.Feather} size={FS(12)} name={`trash-2`} color={`#FF3434`} />
                                    <Text style={styles.menuItem}>delete</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        toggleMenu();
                                        navigation.navigate(`OrderDetailsScreen`, {
                                            orderId: orderData?.id,
                                            orderDetails: orderData
                                        })
                                    }}
                                    style={{ flexDirection: "row", alignItems: "center", gap: HP(6.25) }}
                                >
                                    <Icon type={Icons.FontAwesome5} size={FS(11)} name={`eye`} color={`#404040`} />
                                    <Text style={styles.menuItem}>view details</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>

                <View style={styles.line}></View>

                {/* Order item list */}
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ gap: HP(8) }}>
                        {(orderData?.orderItems && Array.isArray(orderData?.orderItems) && orderData?.orderItems.length > 0) ? (
                            orderData?.orderItems.map((d: any, i: number) => (
                                <Text key={`past-order-item-${i}`} style={styles.itemText}>
                                    • {d?.qty} x {d?.itemName}
                                </Text>
                            ))
                        ) : (
                            <Text style={styles.itemText}>No items ordered</Text>
                        )}
                    </View>
                    {orderData?.orderItems?.length > 1 && (<Text style={styles.qtyText}>qty {orderData?.totalQty}</Text>)}
                </View>

                <View style={styles.line}></View>

                {/* Total amount and reorder button section */}
                <View style={{ gap: HP(8), flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View>
                        <Text style={styles.priceText}> ${orderData?.finalAmount} </Text>
                        <Text style={styles.statusText}> {orderData?.orderStatus} </Text>
                    </View>

                    <View style={{ width: "50%", alignItems: "flex-end", alignSelf: "flex-end" }}>
                        <Button
                            text={`reorder`}
                            onPress={reorderHandler}
                            textStyle={styles.buttonStyle}
                            isLoading={false}
                            activeButtonText={{ opacity: .65 }}
                            mainContainerStyle={{ borderRadius: HP(4.14) }}
                            LinearGradienrColor={[COLORS.BUTTON, COLORS.BUTTON]}
                            contentContainerStyle={{ top: -2 }}
                            style={{ width: FS(109), height: VP(26.22) }}
                        />
                    </View>
                </View>
            </View>
        </>
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
        padding: HP(14),
        position: 'relative'
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
    },
    buttonStyle: {
        ...TextStyles.LEXEND_SEMI_BOLD,
        fontSize: 13.8,
        color: COLORS.WHITE,
        textTransform: "capitalize"
    },
    menu: {
        position: 'absolute',
        right: 0,
        top: VP(18),
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
        zIndex: 1000,
        minWidth: FS(100)
    },
    menuItem: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 12,
        paddingVertical: HP(6),
        textTransform: "capitalize"
    }
});
const PastOrderItemSection = memo(PastOrderItem);
export default PastOrderItemSection;