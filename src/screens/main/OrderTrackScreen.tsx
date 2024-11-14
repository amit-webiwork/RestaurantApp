import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Dimensions, FlatList, RefreshControl } from 'react-native';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import OuterLayout from '../../components/OuterLayout';
import InnerBlock from '../../components/InnerBlock';
import { FS, HP, VP } from '../../utils/Responsive';
import Icon, { Icons } from '../../components/Icons';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';
import NormalLoader from '../../components/NormalLoader';
import { AppDispatch } from '../../redux/store';
import { getOrderTrack } from '../../utils/ApiCall';
import { formatEstimatedTime, getOrderTrackSteps } from '../../utils/helper/OrderHelper';
import { globalStyle } from '../../utils/GlobalStyle';

const { width, height } = Dimensions.get('window');


function OrderTrackScreen({ route, navigation }: { route: any, navigation: any }): React.JSX.Element {
    const { orderData } = route.params;

    const steps = getOrderTrackSteps();

    const dispatch: AppDispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [orderSteps, setOrderSteps] = useState<any[]>([]);
    const [estimatedTime, setEstimatedTime] = useState<string>("");

    const fetchOrderTrack = async (orderId: number) => {

        setLoading(true);

        try {
            const response = await getOrderTrack(orderId);

            if (response) {
                if (response?.estimatedTime) {
                    setEstimatedTime(formatEstimatedTime(response?.estimatedTime));
                }

                if (Array.isArray(response?.data)) {
                    const stepsGet = [...steps];

                    stepsGet.forEach((step, i) => {
                        const match = response.data.find((item: { orderStatus: string; }) => item.orderStatus === step.key);

                        if (match) {
                            step.time = moment(match.createdAt).format("HH:mm");
                            setCurrentStep(i);
                            if (step.key === 'Preparing') {
                                step.subText = 'order is confirmed'
                            }
                        } else {
                            step.time = "";
                            if (step.key === 'Preparing') {
                                step.subText = 'awaiting confirmation...'
                            }
                        }
                    });

                    setOrderSteps(stepsGet);
                }
            }
        } catch (err) {
            console.log(err, '------err');
        } finally {
            setLoading(false);
        }
    }

    const onRefresh = async () => {
        if (orderId > 0)
            fetchOrderTrack(orderId);
    };

    useEffect(() => {
        if (orderId > 0)
            fetchOrderTrack(orderId)
    }, [orderId])

    useEffect(() => {
        if (orderData?.id) {
            setOrderId(orderData.id);
        }
    }, [orderData])

    useEffect(() => {
        setOrderSteps(steps);
    }, [])

    return (
        <>
            <NormalLoader visible={loading} />
            <OuterLayout containerStyle={{ backgroundColor: "#FFF9F9" }}>
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
                                        style={globalStyle.navigationIconBox}
                                    >
                                        <Icon
                                            type={Icons.Feather}
                                            size={FS(20)}
                                            name={`chevron-left`}
                                            color={COLORS.BLACK}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.topHeading}>track order</Text>
                                </View>
                            </View>

                            <View style={{ paddingHorizontal: HP(30), marginTop: VP(41) }}>
                                <Text style={styles.text1}>{estimatedTime}</Text>

                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={styles.text2}>order ID : #{orderData?.orderId || ""}</Text>
                                    <Text style={styles.text3}>order total : ${orderData?.finalAmount}</Text>
                                </View>

                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    marginTop: VP(40)
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
                                                            <Text style={styles.subText}>{item?.subText || `Order#${orderId}`}</Text>
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
    text1: {
        ...TextStyles.RALEWAY_MEDIUM,
        color: "#505050",
        lineHeight: HP(29.3)
    },
    text2: {
        ...TextStyles.RALEWAY_MEDIUM,
        color: "#505050",
        lineHeight: HP(29.3),
        textTransform: "capitalize"
    },
    text3: {
        ...TextStyles.RALEWAY_MEDIUM,
        color: COLORS.BLACK,
        lineHeight: HP(29.3),
        textTransform: "capitalize"
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
        marginTop: VP(4)
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
        fontSize: FS(13)
    },
    time: {
        ...TextStyles.RALEWAY_MEDIUM,
        color: '#676767',
        fontSize: FS(12),
        textAlign: "right"
    }
});

export default OrderTrackScreen;