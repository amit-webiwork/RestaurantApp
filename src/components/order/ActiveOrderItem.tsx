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
import { getOrderComponents } from '../../utils/helper/OrderHelper';
import Icon, { Icons } from '../Icons';
import { useReceiptDownload } from '../../utils/customHooks/useReceiptDownload';

interface Props {
  item: any;
  index: number;
  navigation: any;
}

const ActiveOrderItem = ({ item, index, navigation }: Props) => {
  const orderData = getOrderComponents(item);

  const { createPDF } = useReceiptDownload(orderData, navigation);

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
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
                style={[styles.actionLink, { start: HP(2) }]}
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