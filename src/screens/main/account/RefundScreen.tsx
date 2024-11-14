import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions, FlatList, ActivityIndicator } from 'react-native';

import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { FS, HP, VP } from '../../../utils/Responsive';
import Icon, { Icons } from '../../../components/Icons';
import { COLORS } from '../../../utils/Constants';
import { TextStyles } from '../../../utils/TextStyles';
import NormalLoader from '../../../components/NormalLoader';
import { getRefundOrderList } from '../../../utils/ApiCall';
import RefundOrderItemSection from '../../../components/order/RefundOrderItem';
import { globalStyle } from '../../../utils/GlobalStyle';

const { width, height } = Dimensions.get('window');

const limit = 10;

function RefundScreen({ route, navigation }: { route: any, navigation: any }): React.JSX.Element {
    const [loading, setLoading] = useState(false);

    const [hasMoreData, setHasMoreData] = useState<boolean>(true);
    const [refundOrders, setRefundOrders] = useState<any[]>([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [page, setPage] = useState<number>(1);

    const fetchRefundOrders = async (page: number) => {
        if (loading || !hasMoreData || page === 0) return;

        setLoading(true);

        try {
            const offset = (page - 1) * limit;

            const response = await getRefundOrderList(limit, offset);

            if (response?.data?.length > 0) {
                setRefundOrders(prev => [...prev, ...response?.data || []]);
            } else {
                setHasMoreData(false); // No more data to fetch
            }
        } catch (err) {
            setHasMoreData(false);
        } finally {
            setLoading(false);
            setIsRefreshing(false)
        }
    }

    const onRefresh = async () => {
        setPage(0);
        setRefundOrders([]);
        setHasMoreData(true);
        setIsRefreshing(true);

        setTimeout(() => {
            setPage(1);
        }, 100)
    };

    const loadMoreRefund = () => {
        if (!loading && hasMoreData) {
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        fetchRefundOrders(page);
    }, [page])

    return (
        <>
            <NormalLoader visible={loading} />
            <OuterLayout containerStyle={{ backgroundColor: "#E7E7E7" }}>
                <InnerBlock>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{ paddingVertical: HP(20), marginBottom: VP(79) }}>
                            {/* Navigation section */}
                            <View style={{ paddingHorizontal: HP(18) }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.goBack()}
                                        style={globalStyle.navigationIconBox}
                                    >
                                        <Icon
                                            type={Icons.Feather}
                                            size={FS(20)}
                                            name={`chevron-left`}
                                            color={COLORS.BLACK}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.topHeading}>Refund List</Text>
                                </View>
                            </View>

                            <View style={{ paddingHorizontal: HP(20), marginTop: VP(41) }}>
                                <FlatList
                                    onRefresh={onRefresh}
                                    refreshing={isRefreshing}
                                    showsVerticalScrollIndicator={false}
                                    data={refundOrders}
                                    renderItem={({ item, index }) => <RefundOrderItemSection item={item} index={index} navigation={navigation} />}
                                    contentContainerStyle={{
                                        gap: HP(18)
                                    }}
                                    scrollEnabled={false}
                                    onEndReached={loadMoreRefund}
                                    onEndReachedThreshold={.5}
                                    ListFooterComponent={() => {
                                        return (
                                            <>
                                                {(loading) ? <View style={{ flex: 1, height: height * .5 }}><ActivityIndicator size="large" color={COLORS.BUTTON} /></View> : null}
                                                {!hasMoreData && (
                                                    <View style={{ marginTop: VP(41), marginBottom: VP(41) }}>
                                                        <Text style={styles.bottomText}>"Indulge your cravings."</Text>
                                                    </View>
                                                )}
                                            </>
                                        )
                                    }}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </InnerBlock>
            </OuterLayout >
        </>
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
    bottomText: {
        ...TextStyles.POPPINS_BOLD,
        fontSize: HP(40),
        color: "#898989",
        lineHeight: HP(47),
        textAlign: "center"
    }
});

export default RefundScreen;