import React, { memo, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, FlatList, ActivityIndicator } from 'react-native';

import { FS, HP, VP } from '../../utils/Responsive';
import { COLORS, errorMessage } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';
import PastOrderItemSection from '../../components/order/PastOrderItem';
import NormalLoader from '../../components/NormalLoader';
import { deleteOrder, getOrderList } from '../../utils/ApiCall';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setDialogContent } from '../../redux/features/customDialog';
import Warning from '../../assets/svgs/warning.svg';

const { width, height } = Dimensions.get('window');

interface Props {
    HeaderComponent: any;
    switchTab: any;
    activeTab: number;
    navigation: any;
}

const limit = 10;

function PastOrderTab({ HeaderComponent, switchTab, activeTab, navigation }: Props): React.JSX.Element {
    const dispatch: AppDispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false);
    const [pastOrders, setPastOrders] = useState<any[]>([]);
    const [hasMoreData, setHasMoreData] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loader, setLoader] = useState<boolean>(false);

    const fetchPastOrders = async (page: number) => {
        if (loading || !hasMoreData || page === 0) return;

        console.log('-PastOrderTab run')

        setLoading(true);

        try {
            const params = { type: 'Past' };

            const offset = (page - 1) * limit;

            const response = await getOrderList(params, limit, offset);

            if (response?.data?.length > 0) {
                setPastOrders(prev => [...prev, ...response?.data || []]);
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
        setPastOrders([]);
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

    const deleteOrderHandler = useCallback(async (orderId: number) => {
        setLoader(true);

        try {
            const response = await deleteOrder(orderId);

            setPastOrders((pre) => pre.filter(d => d.id !== orderId));

        } catch (error: any) {
            dispatch(setDialogContent({
                title: <Warning width={FS(40)} height={VP(40)} />,
                message: error?.response?.data?.message || errorMessage.commonMessage
            }));
        } finally {
            setLoader(false);
        }
    }, [setLoader, setPastOrders, dispatch, errorMessage?.commonMessage]);

    useEffect(() => {
        fetchPastOrders(page)
    }, [page])

    return (
        <>
            <NormalLoader visible={loader} />
            <FlatList
                onRefresh={onRefresh}
                refreshing={isRefreshing}
                showsVerticalScrollIndicator={false}
                data={pastOrders}
                renderItem={({ item, index }) => <PastOrderItemSection item={item} index={index} navigation={navigation} deleteHandler={deleteOrderHandler} setLoader={setLoader} />}
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
        </>
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

const PastOrderTabSection = memo(PastOrderTab);
export default PastOrderTabSection;