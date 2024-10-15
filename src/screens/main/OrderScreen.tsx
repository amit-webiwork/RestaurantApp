import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Platform, UIManager, LayoutAnimation, Dimensions } from 'react-native';

import { globalStyle } from '../../utils/GlobalStyle';
import OuterLayout from '../../components/OuterLayout';
import InnerBlock from '../../components/InnerBlock';
import { FS, HP, VP } from '../../utils/Responsive';
import Icon, { Icons } from '../../components/Icons';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';
import ActiveOrderItemSection from '../../components/order/ActiveOrderItem';
import PastOrderItemSection from '../../components/order/PastOrderItem';
import { ButtonSection as Button } from '../../components/Button';
import NormalLoader from '../../components/NormalLoader';
import { getOrderList } from '../../utils/ApiCall';

const { width, height } = Dimensions.get('window');

// Enable Layout Animation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

function OrderScreen({ navigation }: { navigation: any }): React.JSX.Element {
    const [activeTab, setActiveTab] = useState(1);
    const [hasOrder, setHasOrder] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [activeOrders, setActiveOrders] = useState<any[]>([]);

    // Function to handle tab switch with animation
    const switchTab = (tab: number) => {
        // Layout Animation for smoother transitions
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setActiveTab(tab);
    };

    const fetchActiveOrders = async () => {
        setLoading(true);
        try {
            const params = {};
            const limit = 10;
            const offset = 0;

            const response = await getOrderList(params, limit, offset);

            if (response?.data?.length > 0) {
                setActiveOrders(prev => [...prev, ...response?.data || []]);
            }
        } catch (err) {
        } finally {
            setLoading(true);
        }
    }

    useEffect(() => {
        setHasOrder(true);
    }, [])

    return (
        <OuterLayout containerStyle={globalStyle.containerStyle}>
            <NormalLoader visible={loading} />
            <InnerBlock>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingVertical: HP(20), marginBottom: VP(79) }}>
                        {/* Navigation section */}
                        <View style={{ paddingHorizontal: HP(20) }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate(`HomeScreen`)}
                                    style={{ alignSelf: "center", }}
                                >
                                    <Icon type={Icons.Feather} size={FS(20)} name={`chevron-left`} color={COLORS.BLACK} />
                                </TouchableOpacity>
                                <Text style={styles.topHeading}>order history</Text>
                            </View>
                        </View>

                        {hasOrder ? (
                            <View>
                                {/* Tabs */}
                                <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: VP(64) }}>
                                    <TouchableOpacity
                                        onPress={() => switchTab(1)}
                                    >
                                        <Text style={styles.menuText}>active orders</Text>
                                        {activeTab === 1 && (
                                            <Image
                                                source={require('../../assets/images/active.png')}
                                                style={{ width: FS(121), height: VP(4), resizeMode: "cover" }}
                                            />
                                        )}
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => switchTab(2)}
                                    >
                                        <Text style={styles.menuText}>past orders</Text>
                                        {activeTab === 2 && (
                                            <Image
                                                source={require('../../assets/images/active.png')}
                                                style={{ width: FS(121), height: VP(4), resizeMode: "cover" }}
                                            />
                                        )}
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.line}></View>

                                {/* Orders section */}
                                <View style={{ marginTop: VP(27), paddingHorizontal: HP(19) }}>
                                    {activeTab === 1 && (
                                        <View style={{ gap: HP(18) }}>
                                            <ActiveOrderItemSection data={[]} />
                                            <ActiveOrderItemSection data={[]} />
                                            <ActiveOrderItemSection data={[]} />
                                            <ActiveOrderItemSection data={[]} />
                                        </View>
                                    )}

                                    {activeTab === 2 && (
                                        <View style={{ gap: HP(18) }}>
                                            <PastOrderItemSection data={[]} navigation={navigation} />
                                            <PastOrderItemSection data={[]} navigation={navigation} />
                                            <PastOrderItemSection data={[]} navigation={navigation} />
                                            <PastOrderItemSection data={[]} navigation={navigation} />
                                        </View>
                                    )}
                                </View>
                            </View>
                        ) : (
                            <View style={{ marginTop: VP(32), marginHorizontal: (width * .05), marginBottom: VP(32) }}>
                                <View style={styles.noOrderBox}>
                                    <Image source={require(`../../assets/images/no-order.png`)} style={styles.img} />

                                    <Text style={styles.noOrderText}>NO ORDER FOUND</Text>
                                    <Text style={styles.noOrderSubText}>Looks like you haven’t made
                                        your order yet</Text>
                                </View>
                                <Button
                                    text={'start your order'}
                                    onPress={() => void (0)}
                                    textStyle={styles.buttonStyle}
                                    isLoading={false}
                                    activeButtonText={{ opacity: .65 }}
                                    mainContainerStyle={{ marginTop: VP(47), borderRadius: HP(8) }}
                                    LinearGradienrColor={[COLORS.BUTTON, COLORS.BUTTON]}
                                    contentContainerStyle={{ top: -2 }}
                                />
                            </View>
                        )}
                    </View>
                </ScrollView>
            </InnerBlock>
        </OuterLayout >
    )
}

const styles = StyleSheet.create({
    topHeading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: "#000000",
        fontSize: 18,
        textTransform: "capitalize",
        textAlign: "center",
        flex: 1
    },
    menuText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: HP(18),
        textTransform: "capitalize",
        lineHeight: 29.3,
        padding: 8,
        textAlign: "center"
    },
    line: {
        height: 2,
        width: "100%",
        flex: 1,
        flexGrow: 1,
        backgroundColor: "#E6E6E6"
    },
    boxImg: {
        width: "100%",
        height: VP(138),
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
    },
    img: {
        width: "100%",
        height: height * .3,
        resizeMode: "contain"
    },
    noOrderBox: {
        justifyContent: "space-evenly",
        alignItems: "center",
        shadowColor: "#171717",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: "#fff",
        borderRadius: HP(22.96),
        height: height * .6,
        marginHorizontal: HP(18)
    },
    noOrderText: {
        ...TextStyles.RALEWAY_BOLD,
        fontSize: 22.96,
        textAlign: "center"
    },
    noOrderSubText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 13.78,
        textAlign: "center",
        width: "70%"
    },
    buttonStyle: {
        ...TextStyles.LEXEND_SEMI_BOLD,
        fontSize: 20,
        color: COLORS.WHITE,
        textTransform: "uppercase",
    },
});

export default OrderScreen;