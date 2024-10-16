import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import moment from 'moment';

import OuterLayout from '../../components/OuterLayout';
import { globalStyle } from '../../utils/GlobalStyle';
import InnerBlock from '../../components/InnerBlock';
import { FS, HP, VP } from '../../utils/Responsive';
import Icon, { Icons } from '../../components/Icons';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';
import { getNotificationIcon, getNotificationTitle, groupNotificationData } from '../../utils/helper/NotificationHelper';
import { loadStorage, removeStorage } from '../../utils/Storage';
import NotificationScreenLoader from '../../components/skeleton/NotificationScreenLoader';
import { useIsFocused } from '@react-navigation/native';

function NotificationScreen({ navigation, route }: { navigation: any; route: any; }): React.JSX.Element {
    const isFocused = useIsFocused();

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState<any[]>([]);

    const onRefresh = async () => {
        setLoading(true);

        const notificationList = await loadStorage("notificationList");
        const groupedData = notificationList.length ? groupNotificationData(notificationList) : [];

        setList(groupedData);

        setLoading(false);
    };

    useEffect(() => {
        if (isFocused) {
            onRefresh();
        }
    }, [isFocused])

    if (loading) {
        return <NotificationScreenLoader />
    }

    return (
        <>
            <OuterLayout containerStyle={globalStyle.containerStyle}>
                <InnerBlock>
                    <View style={styles.main}>
                        {/* Top Navigation */}
                        <View style={styles.top}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate(`HomeScreen`)}
                                style={{ position: 'absolute', left: 0, alignSelf: "center" }}
                            >
                                <Icon type={Icons.Feather} size={FS(18)} name={`chevron-left`} color={COLORS.BLACK} />
                            </TouchableOpacity>

                            <Text style={styles.headingText}>
                                Notification
                            </Text>
                        </View>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={loading} // Bind refreshing state
                                    onRefresh={onRefresh} // Trigger refresh on pull
                                    tintColor={COLORS.BUTTON} // Customize indicator color
                                />
                            }
                        >
                            <View style={{ marginTop: VP(25.21) }}>
                                {list.map((d: any, i: number) => (
                                    <View key={`notification-group-${i}`} >
                                        <View style={{}}>
                                            <View>
                                                <Text style={styles.title}>{getNotificationTitle(d[0])}</Text>
                                            </View>
                                            <View style={{ gap: HP(19.53), marginTop: VP(19.53) }}>
                                                {d[1].map((item: any, j: number) => (
                                                    <View style={styles.itemRow} key={`notification-item-${i}-${j}`}>
                                                        <View style={styles.iconBtn}>
                                                            <Icon
                                                                type={getNotificationIcon(item?.type || 'message')['iconType']}
                                                                size={FS(24)}
                                                                name={getNotificationIcon(item?.type || 'message')['icon']}
                                                                color={getNotificationIcon(item?.type || 'message')['color']} />
                                                        </View>
                                                        <View style={{ flexBasis: "80%", flexShrink: 1 }}>
                                                            <Text style={styles.itemTitle}>{item.title}</Text>

                                                            <Text style={styles.itemText}>{item.body}</Text>
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
        alignItems: "center",
        marginBottom: VP(20)
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
        lineHeight: HP(24.04),
        color: "#878787"
    },
    itemRow: {
        flexDirection: "row",
        gap: HP(19.53),
        alignItems: "center"
    },
    itemTitle: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 16.53,
        lineHeight: HP(26.3),
        textTransform: "capitalize"
    },
    iconBtn: {
        width: FS(58),
        height: FS(58),
        borderRadius: FS(58 / 2),
        backgroundColor: "#E50ACE1A",
        alignItems: "center",
        justifyContent: "center",
        flexBasis: "20%"
    },
    itemText: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 14.53,
        lineHeight: HP(21.4),
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