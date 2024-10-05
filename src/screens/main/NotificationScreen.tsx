import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import moment from 'moment';

import OuterLayout from '../../components/OuterLayout';
import { globalStyle } from '../../utils/GlobalStyle';
import InnerBlock from '../../components/InnerBlock';
import { FS, HP, VP } from '../../utils/Responsive';
import Icon, { Icons } from '../../components/Icons';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';
import { getNotificationIcon, getNotificationTitle, groupNotificationData } from '../../utils/helper/NotificationHelper';

const data = [
    {
        "date": moment().format('YYYY-MM-DD HH:mm:ss'),
        "title": "30% Special Discount!",
        "type": "discount",
        "text": "Special promotion only valid today"
    },
    {
        "date": moment().format('YYYY-MM-DD HH:mm:ss'),
        "title": "your order is ready please collect from counter",
        "type": "order_success",
        "text": "Recently"
    },
    {
        "date": moment().format('YYYY-MM-DD HH:mm:ss'),
        "title": "Your Order Has Been Canceled",
        "type": "order_failed",
        "text": "19 Jun 2025"
    },
    {
        "date": moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
        "title": "35% Special Discount!",
        "type": "message",
        "text": "Special promotion only valid today"
    },
    {
        "date": moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
        "title": "Account Setup Successfull!",
        "type": "account",
        "text": "Special promotion only valid today"
    },
    {
        "date": moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
        "title": "Special Offer! 60% Off",
        "type": "discount",
        "text": "Special offer for new account, valid until 20 Nov 2024"
    },
    {
        "date": moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
        "title": "Credit Card Connected",
        "type": "payment",
        "text": "Special promotion only valid today"
    },
    {
        "date": "2024-09-23T13:14:55.118Z",
        "title": "Credit Card Connected",
        "type": "payment",
        "text": "Special promotion only valid today"
    },
    {
        "date": "2024-09-20T13:14:55.118Z",
        "title": "Credit Card Connected",
        "type": "payment",
        "text": "Special promotion only valid today"
    },
    {
        "date": "2024-09-24T13:14:55.118Z",
        "title": "Credit Card Connected",
        "type": "payment",
        "text": "Special promotion only valid today"
    },
]

function NotificationScreen({ navigation }: { navigation: any }): React.JSX.Element {
    const groupedData = groupNotificationData(data);

    return (
        <>
            <OuterLayout containerStyle={globalStyle.containerStyle}>
                <InnerBlock>
                    <View style={styles.main}>
                        <View style={styles.top}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate(`HomeScreen`)}
                                style={{ position: 'absolute', left: 0, alignSelf: "center" }}
                            >
                                <Icon type={Icons.Feather} size={18} name={`chevron-left`} color={COLORS.BLACK} />
                            </TouchableOpacity>

                            <Text style={styles.headingText}>
                                Notification
                            </Text>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ marginTop: VP(25.21) }}>
                                {groupedData.map((d: any, i: number) => (
                                    <View key={`notification-group-${i}`} >
                                        <View style={{}}>
                                            <View>
                                                <Text style={styles.title}>{getNotificationTitle(d[0])}</Text>
                                            </View>
                                            <View style={{ gap: HP(19.53), marginTop: VP(19.53) }}>
                                                {d[1].map((item: any, j: number) => (
                                                    <View style={styles.itemRow} key={`notification-item-${i}-${j}`}>
                                                        <View style={styles.iconBtn}>
                                                            <Icon type={getNotificationIcon(item?.type || 'message')['iconType']} size={FS(24)} name={getNotificationIcon(item?.type || 'message')['icon']} color={getNotificationIcon(item?.type || 'message')['color']} />
                                                        </View>
                                                        <View style={{ flexBasis: "80%", flexShrink: 1 }}>
                                                            <Text style={styles.itemTitle}>{item.title}</Text>

                                                            <Text style={styles.itemText}>{item.text}</Text>
                                                        </View>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                        <View style={styles.line}></View>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </InnerBlock>
            </OuterLayout>
        </>
    )
}

const styles = StyleSheet.create({
    main: {
        marginHorizontal: HP(20),
        marginVertical: VP(28)
    },
    top: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    headingText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: "#424242",
        textTransform: "capitalize",
        fontSize: 18,
        textAlign: 'center'
    },
    title: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 17.09,
        lineHeight: 24.04,
        color: "#878787"
    },
    itemRow: {
        flexDirection: "row",
        gap: HP(19.53),
        alignItems: "center"
    },
    itemTitle: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 19.53,
        lineHeight: 29.3,
        textTransform: "capitalize"
    },
    iconBtn: {
        width: FS(58),
        height: FS(58),
        borderRadius: FS(29),
        backgroundColor: "#E50ACE1A",
        alignItems: "center",
        justifyContent: "center",
        flexBasis: "20%"
    },
    itemText: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 17.09,
        lineHeight: 24.4,
        marginTop: HP(4.88)
    },
    line: {
        height: 1,
        width: "100%",
        flex: 1,
        flexGrow: 1,
        backgroundColor: "#EDEDED",
        marginBottom: VP(22.38),
        marginTop: VP(22.38)
    },
});

export default NotificationScreen; 