import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Dimensions, FlatList, RefreshControl } from 'react-native';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { FS, HP, VP } from '../../../utils/Responsive';
import Icon, { Icons } from '../../../components/Icons';
import { COLORS } from '../../../utils/Constants';
import { TextStyles } from '../../../utils/TextStyles';
import NormalLoader from '../../../components/NormalLoader';
import { AppDispatch } from '../../../redux/store';
import { getOrderTrack, getRefundOrderList } from '../../../utils/ApiCall';
import { formatEstimatedTime, getOrderRefundTrackSteps, getOrderTrackSteps } from '../../../utils/helper/OrderHelper';

const { width, height } = Dimensions.get('window');

const steps = getOrderRefundTrackSteps();

const limit = 10;

function RefundScreen({ route, navigation }: { route: any, navigation: any }): React.JSX.Element {
    // const { orderData } = route.params;

    const dispatch: AppDispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [orderSteps, setOrderSteps] = useState<any[]>([]);
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

    useEffect(() => {
        fetchRefundOrders(page);
    }, [page])

    useEffect(() => {
        setOrderSteps(steps);
    }, [])

    return (
        <>
            <NormalLoader visible={loading} />
            <OuterLayout containerStyle={{ backgroundColor: "#E7E7E7" }}>
                <InnerBlock>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={onRefresh}
                                tintColor={COLORS.BUTTON}
                            />
                        }
                    >
                        <View style={{ paddingVertical: HP(20), marginBottom: VP(79) }}>
                            {/* Navigation section */}
                            <View style={{ paddingHorizontal: HP(20) }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.goBack()}
                                        style={{ alignSelf: "center", }}
                                    >
                                        <Icon type={Icons.Feather} size={FS(20)} name={`chevron-left`} color={COLORS.BLACK} />
                                    </TouchableOpacity>
                                    <Text style={styles.topHeading}>Refund List</Text>
                                </View>
                            </View>

                            <View style={{ paddingHorizontal: HP(20), marginTop: VP(41) }}>
                                <View style={styles.boxContainer}>
                                    <View style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}>
                                        <Text style={styles.text2}>Order ID : <Text style={styles.text3}>#{"1234"}</Text></Text>

                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Text style={styles.statusText}>Completed </Text>
                                            <Icon
                                                type={Icons.Ionicons}
                                                size={FS(16)}
                                                name="checkmark-circle-outline"
                                                color={COLORS.SUCCESS}
                                            />
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={styles.text2}>To: <Text style={styles.text3}>Card</Text> </Text>
                                    </View>

                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={styles.text2}>Completed On: <Text style={styles.text3}>6 Nov, 2024</Text> </Text>

                                        <Text style={styles.text2}>$180.00</Text>
                                    </View>

                                    <View style={styles.lineVerticle}></View>

                                    <Text style={styles.linkText}>See Details</Text>

                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        marginTop: VP(16)
                                    }}>
                                        <FlatList
                                            data={orderSteps}
                                            scrollEnabled={false}
                                            renderItem={({ item, index }) => {
                                                const isActive = index <= currentStep;
                                                const isLastItem = index === orderSteps.length - 1;

                                                return (
                                                    <View style={styles.stepContainer}>
                                                        <View style={styles.timeline}>
                                                            {/* Circle for each step */}
                                                            <View style={[styles.circle, isActive && styles.activeCircle]} />
                                                            {/* Line connecting each circle except the last one */}
                                                            {!isLastItem && <View style={[styles.line, isActive && styles.activeLine]} />}
                                                        </View>
                                                        <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", flex: 1 }}>
                                                            {/* Step label */}
                                                            <Image source={item.icon} style={[styles.img]} />

                                                            <View style={{ marginLeft: HP(9), flex: 1 }}>
                                                                <Text style={[styles.stepLabel, isActive && styles.activeLabel]}>{item.status}</Text>
                                                                <Text style={styles.subText}>{item?.subText}</Text>
                                                            </View>

                                                            <View style={{ alignSelf: "flex-start" }}>
                                                                <Text style={styles.time}>{item?.time}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                );
                                            }}
                                            keyExtractor={(item, index) => index.toString()}
                                            contentContainerStyle={styles.container}
                                        />
                                    </View>
                                </View>
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
    text2: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: "#505050",
        lineHeight: HP(29.3),
        fontSize: 16,
    },
    text3: {
        ...TextStyles.RALEWAY_REGULAR,
        lineHeight: HP(29.3),
        fontSize: 16,
    },
    img: {
        resizeMode: "contain",
        width: FS(18),
        height: VP(18)
    },
    container: {
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: HP(6),
        gap: HP(20)
    },
    timeline: {
        alignItems: 'center',
        // marginRight: 16,
    },
    circle: {
        width: FS(10),
        height: FS(10),
        borderRadius: FS(5),
        backgroundColor: '#ccc',
    },
    activeCircle: {
        backgroundColor: '#4CAF50',
    },
    line: {
        width: FS(2),
        height: VP(60),
        backgroundColor: '#ccc',
        marginTop: VP(4),
    },
    activeLine: {
        backgroundColor: '#4CAF50',
    },
    stepLabel: {
        ...TextStyles.RALEWAY_MEDIUM,
        color: '#676767',
        flexShrink: 1,
        textTransform: "capitalize",
        fontSize: FS(14),
    },
    activeLabel: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },
    subText: {
        ...TextStyles.RALEWAY_MEDIUM,
        color: '#676767',
        flexShrink: 1,
        textTransform: "capitalize",
        fontSize: FS(13),
        // width: FS(200)
    },
    time: {
        ...TextStyles.RALEWAY_MEDIUM,
        color: '#676767',
        fontSize: FS(12),
        textAlign: "right"
    },
    statusText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: COLORS.SUCCESS,
        fontSize: FS(14),
        textAlign: "right",
        lineHeight: HP(29.3),
    },
    lineVerticle: {
        height: 1,
        backgroundColor: "#B4B4B4",
        marginVertical: VP(16),
        flex: 1
    },
    linkText: {
        ...TextStyles.RALEWAY_BOLD,
        color: COLORS.BUTTON,
        fontSize: FS(14),
        textAlign: "center"
    },
    boxContainer: {
        backgroundColor: COLORS.WHITE,
        padding: HP(20),
        borderRadius: HP(10),
        shadowColor: "#000",
        shadowOffset: {
            width: -2,
            height: 4,
        },
        shadowRadius: 3,
        elevation: 4,
        flexDirection: "column",
        width: "100%",
        flex: 1
    }
});

export default RefundScreen;