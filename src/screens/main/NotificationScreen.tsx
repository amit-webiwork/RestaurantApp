import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, RefreshControl, Modal, Animated } from 'react-native';
import moment from 'moment';

import OuterLayout from '../../components/OuterLayout';
import { globalStyle } from '../../utils/GlobalStyle';
import InnerBlock from '../../components/InnerBlock';
import { FS, HP, VP } from '../../utils/Responsive';
import Icon, { Icons } from '../../components/Icons';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';
import { getNotificationIcon, getNotificationTitle, groupNotificationData } from '../../utils/helper/NotificationHelper';
import { loadStorage, saveStorage } from '../../utils/Storage';
import NotificationScreenLoader from '../../components/skeleton/NotificationScreenLoader';
import { useIsFocused } from '@react-navigation/native';
import NormalLoader from '../../components/NormalLoader';

function NotificationScreen({ navigation, route }: { navigation: any; route: any; }): React.JSX.Element {
    const isFocused = useIsFocused();
    const slideAnim = useRef(new Animated.Value(300)).current;

    const [loading, setLoading] = useState(true);
    const [loader, setLoader] = useState(false);
    const [list, setList] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [deletedItem, setDeletedItem] = useState({ dateTime: "", type: "" });

    const onRefresh = async () => {
        setLoading(true);

        const notificationList = await loadStorage("notificationList");
        const groupedData = notificationList.length ? groupNotificationData(notificationList) : [];

        setList(groupedData);

        setLoading(false);
    };

    const onRefreshDelete = async () => {
        const notificationList = await loadStorage("notificationList");
        const groupedData = notificationList.length ? groupNotificationData(notificationList) : [];

        setList(groupedData);

        closeDrawer();
        setLoader(false);
    };

    const openDrawer = (dateTime: string, type: string) => {
        setDeletedItem({ dateTime, type })
        setModalVisible(true);
        Animated.timing(slideAnim, {
            toValue: 0, // Slide up
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const closeDrawer = () => {
        Animated.timing(slideAnim, {
            toValue: 300, // Slide down
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setModalVisible(false);
        });
    };

    const deleteNotification = async () => {
        if (deletedItem.dateTime && deletedItem.type) {
            setLoader(true);

            const notificationList = await loadStorage("notificationList");

            const filteredData = notificationList.filter((d: { dateTime: string; type: string; }) => d.dateTime !== deletedItem.dateTime || d.type !== deletedItem.type);

            saveStorage(filteredData, 'notificationList');

            setDeletedItem({ dateTime: "", type: "" });

            setTimeout(() => {
                onRefreshDelete();
            }, 100)
        } else {
            closeDrawer();
        }
    }

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
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="none"
                onRequestClose={closeDrawer}
            >
                <TouchableOpacity
                    style={styles.overlay}
                    onPress={closeDrawer}
                />
                <Animated.View style={[styles.drawerContainer, { transform: [{ translateY: slideAnim }] }]}>
                    <View style={styles.handle} />
                    <TouchableOpacity
                        onPress={deleteNotification}
                        style={{ flexDirection: "row", gap: HP(8), margin: "auto" }}
                    >
                        <Icon type={Icons.Feather} name="trash" size={FS(20)} color={COLORS.RED} />
                        <Text style={styles.deleteText}>Delete notification</Text>
                    </TouchableOpacity>
                </Animated.View>
            </Modal >
            <NormalLoader visible={loader} />
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
                                        <View>
                                            <View>
                                                <Text style={styles.title}>{getNotificationTitle(d[0])}</Text>
                                            </View>
                                            <View style={{ gap: HP(19.53), marginTop: VP(19.53) }}>
                                                {d[1].map((item: any, j: number) => (
                                                    <View style={styles.itemRow} key={`notification-item-${i}-${j}`}>
                                                        <View style={{ flexBasis: "15%", flexGrow: 1 }}>
                                                            <View style={styles.iconBtn}>
                                                                <Icon
                                                                    type={getNotificationIcon(item?.type || 'message')['iconType']}
                                                                    size={FS(24)}
                                                                    name={getNotificationIcon(item?.type || 'message')['icon']}
                                                                    color={getNotificationIcon(item?.type || 'message')['color']} />
                                                            </View>
                                                        </View>
                                                        <View style={{ flexBasis: "75%", flexShrink: 1 }}>
                                                            <Text style={styles.itemTitle}>{item.title}</Text>

                                                            <Text style={styles.itemText}>{item.body}</Text>
                                                        </View>
                                                        <View style={{ flexBasis: "10%", flexGrow: 1, alignSelf: "flex-start" }}>
                                                            <Text style={styles.duretionText}>{item.timeAgo}</Text>
                                                            <TouchableOpacity
                                                                onPress={() => openDrawer(item.dateTime, item.type)}
                                                            >
                                                                <Icon type={Icons.Feather} size={FS(18)} name={`more-horizontal`} color={`#878787`} />
                                                            </TouchableOpacity>
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
        alignItems: "center",
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
        borderRadius: FS(29),
        backgroundColor: "#E50ACE1A",
        alignItems: "center",
        justifyContent: "center"
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
    duretionText: {
        ...TextStyles.INTER_REGULAR,
        fontSize: 14
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    drawerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: VP(100),
        backgroundColor: '#fff',
        borderTopLeftRadius: HP(20),
        borderTopRightRadius: HP(20),
        paddingHorizontal: HP(20),
        paddingVertical: HP(15),
    },
    handle: {
        width: FS(40),
        height: VP(5),
        backgroundColor: "#878787",
        borderRadius: HP(2.5),
        alignSelf: 'center',
        marginBottom: VP(10)
    },
    deleteText: {
        ...TextStyles.LEXEND_SEMI_BOLD,
        color: COLORS.RED,
        fontSize: 16,
    },
});

export default NotificationScreen; 