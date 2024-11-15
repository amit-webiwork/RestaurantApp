import React, { memo, useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native';
import moment from 'moment';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';

import { FS, HP, VP } from '../../utils/Responsive';
import { TextStyles } from '../../utils/TextStyles';
import { COLORS } from '../../utils/Constants';
import { getOrderComponents } from '../../utils/helper/OrderHelper';
import Icon, { Icons } from '../Icons';
import { requestStoragePermissions } from '../../utils/Permissions';
import { showFadeAlert } from '../../utils/Alert';

interface Props {
    item: any;
    index: number;
    navigation: any;
}

const ActiveOrderItem = ({ item, index, navigation }: Props) => {
    const orderData = getOrderComponents(item);

    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const moveToExternalStorage = async (sourcePath: string, fileName: string) => {
        try {
            const destinationPath = `${RNFS.ExternalStorageDirectoryPath}/Download/${fileName}.pdf`;
            await RNFS.copyFile(sourcePath, destinationPath);
            return destinationPath;
        } catch (error) {
            console.error('Error moving file:', error);
        }
    };

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Receipt Content</title>
        <style>
            body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }

  .container {
    padding: 20px;
  }

  .navigation {
    display: flex;
    align-items: center;
  }

  .nav-back {
    background: none;
    border: none;
    cursor: pointer;
  }

  .top-heading {
    flex: 1;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }

  .order-box {
    margin-top: 20px;
    padding: 20px;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }

  .order-top-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .order-image {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }

  .order-details {
    flex: 1;
    margin-left: 20px;
  }

  .item-title {
    font-size: 14px;
    color: #007bff;
  }

  .order-text {
    font-size: 11px;
    color: #636363;
    margin-top: 5px;
  }

  .line {
    border: none;
    border-top: 1px solid #e6e6e6;
    margin: 10px 0;
  }

  .order-items .item {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }

  .qty-text {
    text-align: right;
    font-size: 12px;
    margin-top: 10px;
  }

  .order-amount .row {
    display: flex;
    justify-content: space-between;
  }

  .total {
    font-weight: bold;
    color: #007bff;
  }

  .order-extra .row {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
  }

  .reorder-button {
    width: 100%;
    padding: 10px;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .feedback {
    margin-top: 30px;
    text-align: center;
  }

  .feedback-title {
    font-size: 24px;
    color: #007bff;
  }

  .feedback-text {
    font-size: 16px;
    color: #7c7c7c;
  }

  .rating {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 20px 0;
  }

  .dropdown {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 20px 0;
  }

  .send-button {
    width: 100%;
    padding: 10px;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
        </style>
    </head>
    <body>
        <div class="container">
  <!-- Navigation Section -->
  <div class="navigation">
    <h1 class="top-heading">Order Detail</h1>
  </div>

  <!-- Order Box -->
  <div class="order-box">
    <!-- Order Top Box -->
    <div class="order-top-box">
      <div class="order-details">
        <h2 class="item-title">Dishes</h2>
        <p class="order-text">Ordered on: ${moment(orderData?.createdAt).format('DD MMM YYYY HH:mm A')}</p>
      </div>
    </div>
    <hr class="line" />

    <!-- Order Item List -->
    <div class="order-items">
    ${(orderData?.orderItems && Array.isArray(orderData?.orderItems) && orderData?.orderItems.length > 0) ? (
            orderData?.orderItems.map((d, i) => (
                `<div class="item">
        <span>• ${d?.qty} x ${d?.itemName}</span>
        <span>$${d?.price}</span>
      </div>
      ${orderData?.orderItems?.length > 1 ? `<p class="qty-text">Qty: ${orderData?.totalQty}</p>` : ``}
      
    </div>
    <hr class="line" />`
            ))) : (
            `No items ordered`
        )}
      

    <!-- Order Amount -->
    <div class="order-amount">
      <div class="row">
        <span>Item:</span>
        <span>$${orderData?.itemTotal}</span>
      </div>
      <div class="row">
        <span>Postage & Packing:</span>
        <span>$${orderData?.packagingCost}</span>
      </div>
      <div class="row">
        <span>Total Before Tax:</span>
        <span>$${orderData?.totalWithOutTax}</span>
      </div>
      <div class="row">
        <span>Tax:</span>
        <span>$${orderData?.taxAmount}</span>
      </div>
      <div class="row total">
        <span>Order Total:</span>
        <span>$${orderData?.finalAmount}</span>
      </div>
    </div>
  </div>

  <!-- Extra Details -->
  <div class="order-box order-extra">
    <div class="row">
      <span>Order Number:</span>
      <span>#${orderData?.orderId}</span>
    </div>
    <div class="row">
      <span>Order Status:</span>
      <span>${orderData?.orderStatus}</span>
    </div>
    <div class="row">
      <span>Payment:</span>
      <span>Paid Using Card</span>
    </div>
    <div class="row">
      <span>Date:</span>
      <span>${moment(orderData?.createdAt).format('DD MMM')}</span>
    </div>
    <div class="row">
      <span>Phone Number:</span>
      <span>${orderData?.user?.phoneNo}</span>
    </div>
  </div>
</div>
    </body>
    </html>
`;

    const createPDF = async () => {
        try {
            const granted = await requestStoragePermissions();

            if (!granted) {
                showFadeAlert('Permissions not granted!');
                return;
            }

            let PDFOptions = {
                html: htmlContent,
                fileName: `receipt-${orderData?.orderId}`,
                directory: Platform.OS === 'android' ? 'Downloads' : 'Documents',
            };
            let file = await RNHTMLtoPDF.convert(PDFOptions);
            if (!file.filePath) return;

            if (Platform.OS === 'android') {
                // Move file to external storage (e.g., Downloads)
                const filePath = await moveToExternalStorage(file.filePath, PDFOptions.fileName);
                Alert.alert('Receipt file path', filePath);
            } else {
                Alert.alert('Receipt file path', file.filePath);
            }
        } catch (error: any) {
            console.log('Failed to generate pdf: ', error.message);
        }
    };

    return (
        <View style={styles.boxContainer}>
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
                            #{orderData?.orderId}
                        </Text>
                    </View>
                    <Text style={styles.orderText}>
                        ordered on : {moment(orderData?.createdAt).format('DD MMM YYYY HH:mm A')}
                    </Text>
                </View>

                {/* Popup menu for view orders */}
                <View>
                    <TouchableOpacity
                        onPress={toggleMenu}
                    >
                        <Icon
                            type={Icons.Feather}
                            size={FS(15)}
                            name={`more-vertical`}
                            color={`#686868`}
                        />
                    </TouchableOpacity>

                    {menuVisible && (
                        <View style={styles.menu}>
                            <TouchableOpacity
                                onPress={() => {
                                    toggleMenu();
                                    navigation.navigate(`OrderDetailsScreen`, {
                                        orderId: orderData?.id,
                                        orderDetails: orderData,
                                        canDelete: false
                                    })
                                }}
                                style={styles.actionLink}
                            >
                                <Icon
                                    type={Icons.FontAwesome5}
                                    size={FS(11)}
                                    name={`eye`}
                                    color={`#404040`}
                                />
                                <Text style={styles.menuItem}>view details</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    toggleMenu();
                                    createPDF();
                                }}
                                style={styles.actionLink}
                            >
                                <Icon
                                    type={Icons.FontAwesome5}
                                    size={FS(11)}
                                    name={`file-invoice`}
                                    color={`#404040`}
                                />
                                <Text style={styles.menuItem}>Download receipt</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>

            <View style={styles.line}></View>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ gap: HP(8) }}>
                    {(orderData?.orderItems && Array.isArray(orderData?.orderItems) && orderData?.orderItems.length > 0) ? (
                        orderData?.orderItems.map((d: any, i: number) => (
                            <Text key={`active-order-item-${i}`} style={styles.itemText}>
                                • {d?.qty} x {d?.itemName}
                            </Text>
                        ))
                    ) : (
                        <Text style={styles.itemText}>No items ordered</Text>
                    )}
                </View>
                {orderData?.orderItems?.length > 1 && (
                    <Text style={styles.qtyText}>qty {orderData?.totalQty}</Text>
                )}
            </View>

            <View style={styles.line}></View>

            <View style={{ gap: HP(8), flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>
                    <Text style={styles.priceText}> ${orderData?.finalAmount} </Text>
                    <Text style={styles.statusText}> {orderData?.orderStatus} </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(`OrderTrackScreen`, {
                            orderData
                        })}
                    >
                        <Text style={styles.trackText}> track order </Text>
                    </TouchableOpacity>

                    <Text style={styles.subText}> {orderData?.estimatedTimeCustom} </Text>
                </View>
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
        backgroundColor: COLORS.WHITE,
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
        fontSize: 14
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
        flexShrink: 1,
        alignSelf: "flex-end"
    },
    itemText: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 14,
        textTransform: "capitalize"
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
    trackText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 12,
        alignSelf: "flex-end",
        textTransform: "capitalize"
    },
    menu: {
        position: 'absolute',
        right: 0,
        top: VP(18),
        backgroundColor: COLORS.WHITE,
        borderRadius: 5,
        padding: 10,
        shadowColor: COLORS.BLACK,
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
        textTransform: "capitalize",
        textAlign: "center"
    },
    actionLink: {
        flexDirection: "row",
        alignItems: "center",
        gap: HP(6.25)
    }
});

const ActiveOrderItemSection = memo(ActiveOrderItem);
export default ActiveOrderItemSection;