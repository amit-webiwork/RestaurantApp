import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import moment from 'moment';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { globalStyle } from '../../utils/GlobalStyle';
import OuterLayout from '../../components/OuterLayout';
import InnerBlock from '../../components/InnerBlock';
import { FS, HP, VP } from '../../utils/Responsive';
import Icon, { Icons } from '../../components/Icons';
import { apiEndpoints, BACKEND_URL, COLORS, errorMessage } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';
import { ButtonSection as Button } from '../../components/Button';
import NormalLoader from '../../components/NormalLoader';
import { fetchTopics, topicList, topicLoaded } from '../../redux/features/items';
import DropDown from '../../components/DropDown';
import { AppDispatch } from '../../redux/store';
import CustomTextInputNoEffect from '../../components/CustomTextInputNoEffect';
import { feedbackForm, validateResource } from '../../utils/ValidateResource';
import { setDialogContent } from '../../redux/features/customDialog';
import Warning from '../../assets/svgs/warning.svg';
import CheckmarkWithConfetti from '../../components/CheckmarkWithConfetti';
import CustomActionDialogComp from '../../components/dialogs/CustomActionDialog';
import { deleteOrder } from '../../utils/ApiCall';

const titleDelete = `Confirm Delete`;
const messageDelete = `Are you sure you want to delete this order?`;

const { width, height } = Dimensions.get('window');

const errorObj = { topicId: { status: false, text: "" }, feedback: { status: false, text: "" } }

function OrderDetailsScreen({ route, navigation }: { route: any, navigation: any }): React.JSX.Element {
    const { orderId, orderDetails } = route.params;

    const dispatch: AppDispatch = useDispatch();

    const TopicLoaded = useSelector(topicLoaded);
    const TopicList = useSelector(topicList);

    const [orderData, setOrderData] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [rating, setRating] = useState(5);
    const [menuVisible, setMenuVisible] = useState(false);
    const [topicId, setTopicId] = useState(0);
    const [error, setError] = useState(errorObj);
    const [feedback, setFeedback] = useState("");
    const [textLength, setTextLength] = useState(200);
    const [showPopUp, setShowPopUp] = useState(false);
    const [orderDeleteDialogVisible, setOrderDeleteDialogVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleSelection = (item: { id: number }) => {
        setTopicId(item.id)
    };

    const setFeedbackHandler = (e: string) => {
        setFeedback(e);
        setTextLength(200 - e.length);
    }

    const submitHandler = async () => {
        try {
            setError(errorObj);

            const resource = { topicId, rating, feedback }

            const dataPayload = await validateResource(feedbackForm, setError)(resource);

            dataPayload['description'] = dataPayload['feedback'];
            dataPayload['orderId'] = orderData?.id;

            delete dataPayload['feedback'];

            setButtonLoading(true);

            axios.post(BACKEND_URL + apiEndpoints.orderFeedback, dataPayload)
                .then(async (response: any) => {
                    setButtonLoading(false);

                    setShowPopUp(true);
                })
                .catch(error => {
                    setButtonLoading(false);
                    dispatch(setDialogContent({ title: <Warning width={FS(40)} height={VP(40)} />, message: `${error?.response?.data?.message}` || errorMessage.commonMessage }));
                    console.log("Error sending data: ", error.message);
                });

        } catch (err: any) {
            setButtonLoading(false);
            console.log(err.message, '---err');
        }
    }

    const orderDeleteHandler = async () => {
        setLoading(true);
        setOrderDeleteDialogVisible(false);

        try {
            if (orderId) {
                const response = await deleteOrder(orderId);

                navigation.navigate(`OrderScreen`, {
                    routeActiveTab: 1
                });
            }
        } catch (error: any) {
            dispatch(setDialogContent({ title: <Warning width={FS(40)} height={VP(40)} />, message: error?.response?.data?.message || errorMessage.commonMessage }));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        if (!TopicLoaded) {
            dispatch(fetchTopics(setLoading));
        } else {
            setLoading(false);
        }
    }, [TopicLoaded])

    useEffect(() => {
        setLoading(true);
        setOrderData(orderDetails);
        setLoading(false);
    }, [orderId])

    return (
        <>
            <NormalLoader visible={loading} />
            <CustomActionDialogComp
                visible={orderDeleteDialogVisible}
                title={titleDelete}
                message={messageDelete}
                onClose={() => setOrderDeleteDialogVisible(false)}
                onAction={orderDeleteHandler}
                dialogTitleStyle={globalStyle.dialogTitleStyle}
                dialogMessageStyle={globalStyle.dialogMessageStyle}
                buttonAction={true}
                buttonText1={`No, I won’t`}
                buttonText2='Yes, Of course'
            />
            <OuterLayout containerStyle={globalStyle.containerStyle}>
                <InnerBlock>
                    <ScrollView showsVerticalScrollIndicator={false}>
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
                                    <Text style={styles.topHeading}>order detail</Text>
                                </View>
                            </View>

                            <View style={{ marginTop: VP(32), marginHorizontal: (width * .05) }}>
                                <View style={styles.orderBox}>
                                    {/* Order Top Box where image and order date and menu will show */}
                                    <View style={{ flexDirection: "row", gap: HP(19) }}>
                                        <Image
                                            source={require('../../assets/images/order.png')}
                                            style={[styles.boxImg]}
                                        />

                                        <View style={{ justifyContent: "center", flex: 1 }}>
                                            <Text style={styles.itemTitle}>
                                                dishes
                                            </Text>
                                            <Text style={styles.orderText}>
                                                ordered on : {moment(orderData?.createdAt).format('DD MMM YYYY HH:mm A')}
                                            </Text>
                                        </View>

                                        <View>
                                            <TouchableOpacity
                                                onPress={toggleMenu}
                                            >
                                                <Icon type={Icons.Feather} size={FS(15)} name={`more-vertical`} color={`#686868`} />
                                            </TouchableOpacity>

                                            {menuVisible && (
                                                <View style={styles.menu}>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            toggleMenu();
                                                            setOrderDeleteDialogVisible(true)
                                                        }}
                                                        style={{ flexDirection: "row", alignItems: "center", gap: HP(7.25) }}
                                                    >
                                                        <Icon type={Icons.Feather} size={FS(12)} name={`trash-2`} color={`#FF3434`} />
                                                        <Text style={styles.menuItem}>delete</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                        </View>
                                    </View>

                                    <View style={styles.line}></View>
                                    {/* Order Item List */}
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: HP(10) }}>
                                        <View style={{ gap: HP(8) }}>
                                            {(orderData?.orderItems && Array.isArray(orderData?.orderItems) && orderData?.orderItems.length > 0) ? (
                                                orderData?.orderItems.map((d: any, i: number) => (
                                                    <Text key={`past-order-item-${i}`} style={styles.itemText}>
                                                        • {d?.qty} x {d?.itemName}
                                                    </Text>
                                                ))
                                            ) : (
                                                <Text style={styles.itemText}>No items ordered</Text>
                                            )}
                                        </View>
                                        {orderData?.orderItems?.length > 1 && (<Text style={styles.qtyText}>qty {orderData?.totalQty}</Text>)}
                                    </View>

                                    <View style={styles.line}></View>

                                    {/* Order amount component */}
                                    <View style={{ paddingHorizontal: HP(10), gap: HP(8) }}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.orderEntityText}>item:</Text>
                                            <Text style={styles.orderEntityPrice}>${orderData?.finalAmount}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.orderEntityText}>postage & packing:</Text>
                                            <Text style={styles.orderEntityPrice}>$00.00</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.orderEntityText}>total before tax:</Text>
                                            <Text style={styles.orderEntityPrice}>${orderData?.finalAmount}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.orderEntityText}>tax:</Text>
                                            <Text style={styles.orderEntityPrice}>$0.00</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.orderEntityText}>total:</Text>
                                            <Text style={styles.orderEntityPrice}>${orderData?.finalAmount}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.orderEntityText}>order total:</Text>
                                            <Text style={styles.orderTotalPrice}>${orderData?.finalAmount}</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Order Extra Details */}
                                <View style={{}}>
                                    <View style={{ paddingHorizontal: HP(20), gap: HP(10), marginVertical: HP(24) }}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.orderDetailRightText}>order number</Text>
                                            <Text style={styles.orderDetailLeftText}>#{orderData?.id}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.orderDetailRightText}>payment</Text>
                                            <Text style={styles.orderDetailLeftText}>paid using upi</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.orderDetailRightText}>date</Text>
                                            <Text style={styles.orderDetailLeftText}>{moment(orderData?.createdAt).format('DD MMM')}</Text>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={styles.orderDetailRightText}>phone number</Text>
                                            <Text style={styles.orderDetailLeftText}>{orderData?.user?.phoneNo}</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Reorder button */}
                                <Button
                                    text={'Reorder'}
                                    onPress={() => void (0)}
                                    textStyle={styles.buttonStyle}
                                    isLoading={false}
                                    activeButtonText={{ opacity: .65 }}
                                    mainContainerStyle={{ marginTop: VP(30), borderRadius: HP(8.02) }}
                                    LinearGradienrColor={[COLORS.BUTTON, COLORS.BUTTON]}
                                    contentContainerStyle={{ top: -2 }}
                                    style={{ width: "100%" }}
                                />

                                {/* Feedback section */}
                                <View style={{ marginTop: VP(50) }}>
                                    <Text style={styles.feedbackTitle}>share your feedback</Text>

                                    <Text style={styles.feedbackText}>please select a topic below and let us know about your concern</Text>

                                    {/* Rating Section */}
                                    <View style={{ flexDirection: "row", marginTop: VP(26), justifyContent: "center", gap: HP(24.64) }}>
                                        <TouchableOpacity
                                            onPress={() => setRating(1)}
                                        >
                                            <Image source={rating === 1 ? require(`../../assets/icons/smiley-neutral-active.png`) : require(`../../assets/icons/smiley-neutral.png`)} style={styles.icon} />
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={() => setRating(3)}
                                        >
                                            <Image source={rating === 3 ? require(`../../assets/icons/smiley-sad-active.png`) : require(`../../assets/icons/smiley-sad.png`)} style={styles.icon} />
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={() => setRating(5)}
                                        >
                                            <Image source={rating === 5 ? require(`../../assets/icons/smiley-active.png`) : require(`../../assets/icons/smiley.png`)} style={styles.icon} />
                                        </TouchableOpacity>
                                    </View>

                                    {/* Topic List */}
                                    <View style={{ marginTop: VP(31.63) }}>
                                        <DropDown label="Select Topic" data={TopicList} onSelect={handleSelection} />
                                        {error.topicId.status && (
                                            <Text style={globalStyle.error}>{error.topicId.text}</Text>
                                        )}
                                    </View>

                                    {/* Message Input Box */}
                                    <View style={{ marginTop: VP(26) }}>
                                        <CustomTextInputNoEffect
                                            formProps={{ text: feedback, setText: setFeedbackHandler, error: error.feedback }}
                                            placeholder="I Really Like Their Desserts And Boba Tea |"
                                            maxLength={200}
                                            styleInput={styles.styleInput}
                                            multiline={true}
                                            numberOfLines={8}
                                            placeholderTextColor={`#595959`}
                                        />
                                        <Text style={{ ...TextStyles.RALEWAY_MEDIUM, fontSize: 11.56, color: "#A7A7A7", position: "absolute", bottom: HP(15), right: HP(10) }}>{textLength}</Text>
                                    </View>

                                    {/* Feedback send button */}
                                    <View style={{ marginTop: VP(30) }}>
                                        <Button
                                            text={'send'}
                                            onPress={submitHandler}
                                            textStyle={styles.buttonStyle}
                                            isLoading={buttonLoading}
                                            activeButtonText={{ opacity: .65 }}
                                            mainContainerStyle={{ flex: 1, borderRadius: HP(3.16) }}
                                            LinearGradienrColor={[COLORS.BUTTON, COLORS.BUTTON]}
                                            contentContainerStyle={{ top: -2 }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    {showPopUp && (
                        <View style={styles.successPopUpMain}>
                            <View style={styles.successPopUp}>
                                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                                    <CheckmarkWithConfetti />
                                    <Text style={styles.popUpHeading}>thank you!</Text>
                                    <Text style={styles.popUpText}>thankyou for sharing your thoughts we appreciate your feedback!</Text>

                                    <View style={{ marginTop: VP(38.46), marginBottom: VP(89) }}>
                                        <Button
                                            text={'Back'}
                                            onPress={() => navigation.goBack()}
                                            textStyle={styles.buttonStyle}
                                            isLoading={false}
                                            activeButtonText={{ opacity: .65 }}
                                            mainContainerStyle={{ borderRadius: HP(8) }}
                                            LinearGradienrColor={[COLORS.BUTTON, COLORS.BUTTON]}
                                            contentContainerStyle={{ top: -2 }}
                                        />
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    )}
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
    boxImg: {
        width: FS(53),
        height: VP(41.31),
        resizeMode: "cover",
        borderRadius: HP(4.17)
    },
    itemTitle: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 14,
        textTransform: "capitalize",
        color: COLORS.BUTTON
    },
    orderText: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 11,
        textTransform: "capitalize",
        color: "#636363",
        marginTop: VP(2)
    },
    orderBox: {
        shadowColor: "#171717",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: "#fff",
        borderRadius: HP(10),
        padding: HP(14),
        gap: HP(14.69),
    },
    menu: {
        position: 'absolute',
        right: 0,
        top: VP(18),
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
        zIndex: 1000,
        minWidth: FS(80)
    },
    menuItem: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 12,
        paddingVertical: HP(2),
        textTransform: "capitalize"
    },
    line: {
        height: 1,
        width: "100%",
        flex: 1,
        flexGrow: 1,
        backgroundColor: "#E6E6E6"
    },
    itemText: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 14,
        textTransform: "capitalize",
    },
    qtyText: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 12,
        alignSelf: "flex-end"
    },
    orderEntityText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 14,
        color: "#676767",
        textTransform: "capitalize"
    },
    orderEntityPrice: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 14,
        color: "#303030"
    },
    orderTotalPrice: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 14,
        color: COLORS.BUTTON
    },
    orderDetailRightText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 14,
        textTransform: "capitalize"
    },
    orderDetailLeftText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 12,
        textTransform: "capitalize"
    },
    buttonStyle: {
        ...TextStyles.LEXEND_SEMI_BOLD,
        fontSize: 20.05,
        color: COLORS.WHITE,
        textTransform: "uppercase",
    },
    feedbackTitle: {
        ...TextStyles.RALEWAY_BOLD,
        fontSize: 24,
        color: COLORS.BUTTON,
        textTransform: "capitalize",
        textAlign: "center"
    },
    feedbackText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 16,
        color: "#7C7C7C",
        textTransform: "capitalize",
        textAlign: "center",
        marginTop: HP(16),
        lineHeight: 24
    },
    icon: {
        width: FS(41.23),
        height: VP(41.23),
        resizeMode: "cover"
    },
    styleInput: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 12,
        backgroundColor: "#FFF9F9",
        borderRadius: HP(10),
        textAlignVertical: 'top',
        padding: HP(10),
        lineHeight: 11.1,
        borderWidth: 1,
        borderColor: "#FF00E280"
    },
    successPopUpMain: {
        position: 'absolute',
        height,
        width,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        bottom: 0
    },
    successPopUp: {
        position: "absolute",
        bottom: 0,
        backgroundColor: COLORS.WHITE,
        width: width,
        // minHeight: height * .7,
        shadowColor: "#171717",
        shadowOffset: {
            width: -2,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 20,
        borderTopLeftRadius: HP(25),
        borderTopRightRadius: HP(25)
    },
    scrollContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: HP(10)
    },
    popUpHeading: {
        ...TextStyles.RALEWAY_BOLD,
        fontSize: 24,
        lineHeight: 38.5,
        marginTop: VP(25.07),
        color: COLORS.BUTTON,
        textAlign: "center",
        textTransform: "capitalize"
    },
    popUpText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 16,
        lineHeight: 24,
        marginTop: VP(16),
        color: "#7C7C7C",
        textAlign: "center",
        textTransform: "capitalize",
        width: width * .90
    },
});

export default OrderDetailsScreen;