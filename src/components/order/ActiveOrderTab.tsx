import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, FlatList, ActivityIndicator } from 'react-native';

import { FS, HP, VP } from '../../utils/Responsive';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';
import { getOrderList } from '../../utils/ApiCall';
import ActiveOrderItem from '../../components/order/ActiveOrderItem';
import ActiveOrderItemSection from '../../components/order/ActiveOrderItem';

const { width, height } = Dimensions.get('window');

interface Props {
    HeaderComponent: any;
    switchTab: any;
    activeTab: number;
}

const limit = 10;

function ActiveOrderTab({ HeaderComponent, switchTab, activeTab }: Props): React.JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [activeOrders, setActiveOrders] = useState<any[]>([]);
    const [hasMoreData, setHasMoreData] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchActiveOrders = async (page: number) => {
        if (loading || !hasMoreData || page === 0) return;

        setLoading(true);

        console.log('-ActiveOrderTab run')

        try {
            const params = { type: 'Active' };

            const offset = (page - 1) * limit;

            const response = await getOrderList(params, limit, offset);

            if (response?.data?.length > 0) {
                setActiveOrders(prev => [...prev, ...response?.data || []]);
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
        setActiveOrders([]);
        setHasMoreData(true);
        setIsRefreshing(true);

        setTimeout(() => {
            setPage(1);
        }, 100)
    };

    const loadMoreOrders = () => {
        if (!loading && hasMoreData) {
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        fetchActiveOrders(page)
    }, [page])

    return (
        <FlatList
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            showsVerticalScrollIndicator={false}
            data={activeOrders}
            renderItem={({ item, index }) => <ActiveOrderItemSection item={item} index={index} />}
            contentContainerStyle={{
                gap: HP(18)
            }}
            scrollEnabled={true}
            onEndReached={loadMoreOrders}
            onEndReachedThreshold={.5}
            ListHeaderComponent={<HeaderComponent switchTab={switchTab} activeTab={activeTab} />}
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
    )
}

const styles = StyleSheet.create({
    bottomText: {
        ...TextStyles.POPPINS_BOLD,
        fontSize: HP(40),
        color: "#898989",
        lineHeight: HP(47),
        textAlign: "center"
    }
});

const ActiveOrderTabSection = memo(ActiveOrderTab);
export default ActiveOrderTabSection;