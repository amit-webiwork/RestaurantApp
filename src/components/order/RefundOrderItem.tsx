import React, { memo, useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import moment from 'moment';

import { FS, HP, VP } from '../../utils/Responsive';
import { TextStyles } from '../../utils/TextStyles';
import { COLORS } from '../../utils/Constants';
import { getOrderRefundTrackSteps } from '../../utils/helper/OrderHelper';
import Icon, { Icons } from '../Icons';

interface Props {
    item: any;
    index: number;
    navigation: any;
}

const pending = { text: "Pending", color: COLORS.FAILED, icon: 'alert-circle-outline' };
const completed = { text: "Completed", color: COLORS.SUCCESS, icon: 'checkmark-circle-outline' };
const processed = { text: "Processed", color: COLORS.THEME, icon: 'arrow-redo-circle-outline' };

const RefundOrderItem = ({ item, index, navigation }: Props) => {
    const [orderSteps, setOrderSteps] = useState<any[]>([]);
    const [currentStep, setCurrentStep] = useState(-1);
    const [showDetails, setShowDetails] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(pending);
    const [completedOn, setCompletedOn] = useState("");

    const steps = getOrderRefundTrackSteps();

    const setTrackStatus = (item: { data: any[]; }) => {

        if (Array.isArray(item?.data)) {
            const stepsGet = [...steps];

            stepsGet.forEach((step, i) => {
                const match = item.data.find((item: { paymentType: string; }) => item.paymentType === step.key);

                step.subText = "";

                if (match) {
                    const date = moment(match.createdAt).format("DD MMM, YYYY");

                    if (step.key === 'refund') {
                        setCurrentStep(1);
                        setCurrentStatus(processed);
                        step.subText = date;
                    } else if (step.key === 'charge') {
                        setCurrentStep(2);
                        setCurrentStatus(completed);
                        step.subText = date;
                        setCompletedOn(date);
                    } else {
                        setCurrentStep(-1);
                    }
                }
            });

            setOrderSteps(stepsGet);
        }
    }

    useEffect(() => {
        setTrackStatus(item);
    }, [item])

    useEffect(() => {
        setOrderSteps(steps);
    }, [])

    return (
        <View style={styles.boxContainer}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <TouchableOpacity onPress={() => navigation.navigate(`OrderDetailsScreen`, {
                    orderId: item?.id,
                    orderDetails: null,
                    canDelete: false
                })}>
                    <Text style={[styles.text2, { color: COLORS.HOME_ICONS }]}>Order ID :
                        <Text style={[styles.text3, { color: COLORS.HOME_ICONS }]}>#{item?.orderId}</Text>
                    </Text>
                </TouchableOpacity>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={[styles.statusText, { color: currentStatus.color }]}>{currentStatus.text} </Text>
                    <Icon
                        type={Icons.Ionicons}
                        size={FS(16)}
                        name={currentStatus.icon}
                        color={currentStatus.color}
                    />
                </View>
            </View>
            <View>
                <Text style={styles.text2}>To: <Text style={[styles.text3, { textTransform: "capitalize" }]}>{item?.data[0]?.paymentMethod}</Text> </Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                {currentStep === 2 ? (
                    <Text style={styles.text2}>
                        Completed On: <Text style={styles.text3}>{completedOn}</Text>
                    </Text>
                ) : (
                    <Text></Text>
                )}

                <Text style={styles.text2}>${item?.finalAmount}</Text>
            </View>

            <View style={styles.lineVerticle}></View>

            <TouchableOpacity onPress={() => setShowDetails(!showDetails)}>
                <Text style={styles.linkText}>{showDetails ? "Hide Details" : "See Details"}</Text>
            </TouchableOpacity>

            {showDetails && (
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
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    text2: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: "#505050",
        lineHeight: HP(29.3),
        fontSize: 16,
    },
    boxContainer: {
        backgroundColor: COLORS.WHITE,
        padding: HP(20),
        borderRadius: HP(10),
        shadowColor: COLORS.BLACK,
        shadowOffset: {
            width: -2,
            height: 4,
        },
        shadowRadius: 3,
        elevation: 4,
        flexDirection: "column",
        width: "100%",
        flex: 1
    },
    text3: {
        ...TextStyles.RALEWAY_REGULAR,
        lineHeight: HP(29.3),
        fontSize: 16,
    },
    statusText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: COLORS.SUCCESS,
        fontSize: FS(14),
        textAlign: "right",
        lineHeight: HP(29.3),
        top: VP(-1.5)
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
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: HP(6),
        gap: HP(20)
    },
    timeline: {
        alignItems: 'center'
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
    img: {
        resizeMode: "contain",
        width: FS(18),
        height: VP(18)
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
    },
    container: {
    },
});

const RefundOrderItemSection = memo(RefundOrderItem);
export default RefundOrderItemSection;