import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Platform, UIManager, LayoutAnimation } from 'react-native';

import { globalStyle } from '../../utils/GlobalStyle';
import OuterLayout from '../../components/OuterLayout';
import InnerBlock from '../../components/InnerBlock';
import { FS, HP, VP } from '../../utils/Responsive';
import Icon, { Icons } from '../../components/Icons';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';
import ActiveOrderTabSection from '../../components/order/ActiveOrderTab';
import PastOrderTabSection from '../../components/order/PastOrderTab';

// Enable Layout Animation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface TabProps {
    switchTab: any;
    activeTab: number;
}

const OrderTabs = ({ switchTab, activeTab }: TabProps) => {
    return (
        <>
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: VP(32) }}>
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
        </>
    )
}

function OrderScreen({ route, navigation }: { route: any; navigation: any }): React.JSX.Element {
    const routeActiveTab = route?.params?.routeActiveTab || 0;

    const [activeTab, setActiveTab] = useState(1);

    // Function to handle tab switch with animation
    const switchTab = useCallback((tab: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setActiveTab(tab);
    }, [setActiveTab]);

    useEffect(() => {
        if (routeActiveTab > 0) {
            setActiveTab(routeActiveTab);
        }
    }, [routeActiveTab])

    return (
        <OuterLayout containerStyle={globalStyle.containerStyle}>
            <InnerBlock>
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

                    <View>
                        {/* Orders section */}
                        <View style={{ marginTop: VP(27), paddingHorizontal: HP(19), marginBottom: VP(27) }}>
                            {activeTab === 1 && (
                                <ActiveOrderTabSection
                                    HeaderComponent={OrderTabs}
                                    switchTab={switchTab}
                                    activeTab={activeTab}
                                />
                            )}

                            {activeTab === 2 && (
                                <PastOrderTabSection
                                    HeaderComponent={OrderTabs}
                                    switchTab={switchTab}
                                    activeTab={activeTab}
                                    navigation={navigation}
                                />
                            )}
                        </View>
                    </View>
                </View>
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
    }
});

export default OrderScreen;