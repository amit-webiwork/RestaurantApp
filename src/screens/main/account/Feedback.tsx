import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';

import Icon, { Icons } from '../../../components/Icons';
import { COLORS } from '../../../utils/Constants';
import { FS, HP, VP } from '../../../utils/Responsive';
import { TextStyles } from '../../../utils/TextStyles';
import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { globalStyle } from '../../../utils/GlobalStyle';
import DropDown from '../../../components/DropDown';
import CustomTextInputNoEffect from '../../../components/CustomTextInputNoEffect';
import { ButtonSection as Button } from '../../../components/Button';

const { width, height } = Dimensions.get('window');

const options = [
    {
        id: 1,
        text: "boba tea is very tasty"
    },
    {
        id: 2,
        text: "somthing is wrong with the app not working properly"
    },
    {
        id: 3,
        text: "by mistake place order, please cancel"
    },
    {
        id: 4,
        text: "how much time my order will take"
    },
    {
        id: 5,
        text: "i recently added one dessert not showing in my cart"
    },
    {
        id: 6,
        text: "when will i get my refund amount"
    }
];

const errorObj = { topic: { status: false, text: "" }, feedback: { status: false, text: "" } }

function Feedback({ navigation }: { navigation: any }): React.JSX.Element {
    const [rating, setRating] = useState(3);
    const [topicId, setTopicId] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [error, setError] = useState(errorObj);

    const [textLength, setTextLength] = useState(200);
    const [showPopUp, setShowPopUp] = useState(false);

    const handleSelection = (item: { id: number }) => {
        setTopicId(item.id)
    };

    const setFeedbackHandler = (e: string) => {
        setFeedback(e);
        setTextLength(200 - e.length);
    }

    return (
        <OuterLayout containerStyle={globalStyle.containerStyle}>
            <InnerBlock>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingHorizontal: HP(20), paddingVertical: HP(27.79) }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{ alignSelf: "center" }}
                            >
                                <Icon type={Icons.Feather} size={18} name={`chevron-left`} color={COLORS.BLACK} />
                            </TouchableOpacity>
                            <Text style={styles.topHeading}>feedback</Text>
                        </View>

                        <View style={{ marginTop: VP(50), alignItems: "center" }}>
                            <View style={{ width: FS(167.22), height: VP(139.23), }}>
                                <Image source={require(`../../../assets/images/feedback.png`)} style={styles.img} />
                            </View>

                            <View style={{ marginTop: VP(48.77), gap: HP(16) }}>
                                <Text style={styles.heading}>share your feedback</Text>
                                <Text style={styles.info}>please select a topic below and let us know about your concern</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", marginTop: VP(26), justifyContent: "center", gap: HP(28.5) }}>
                            <TouchableOpacity
                                onPress={() => setRating(1)}
                            >
                                <Image source={rating === 1 ? require(`../../../assets/icons/smiley-neutral-active.png`) : require(`../../../assets/icons/smiley-neutral.png`)} style={styles.icon} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setRating(2)}
                            >
                                <Image source={rating === 2 ? require(`../../../assets/icons/smiley-sad-active.png`) : require(`../../../assets/icons/smiley-sad.png`)} style={styles.icon} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setRating(3)}
                            >
                                <Image source={rating === 3 ? require(`../../../assets/icons/smiley-active.png`) : require(`../../../assets/icons/smiley.png`)} style={styles.icon} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: VP(31.63) }}>
                            <DropDown label="Select Topic" data={options} onSelect={handleSelection} />
                        </View>

                        <View style={{ marginTop: VP(26) }}>
                            <CustomTextInputNoEffect
                                formProps={{ text: feedback, setText: setFeedbackHandler, error: error.feedback }}
                                placeholder="I Really Like Their Desserts And Boba Tea |"
                                maxLength={255}
                                styleInput={styles.styleInput}
                                multiline={true}
                                numberOfLines={10}
                                placeholderTextColor={`#595959`}
                            />
                            <Text style={{ ...TextStyles.RALEWAY_MEDIUM, fontSize: 11.56, color: "#A7A7A7", position: "absolute", bottom: 10, right: 10 }}>{textLength}</Text>
                        </View>

                        <View style={{ marginTop: VP(49) }}>
                            <Button
                                text={'send'}
                                onPress={() => setShowPopUp(true)}
                                textStyle={styles.buttonStyle}
                                isLoading={false}
                                activeButtonText={{ opacity: .65 }}
                                mainContainerStyle={{ flex: 1, borderRadius: HP(8) }}
                                LinearGradienrColor={[COLORS.BUTTON, COLORS.BUTTON]}
                                contentContainerStyle={{ top: -2 }}
                            />
                        </View>
                    </View>
                </ScrollView>

                {showPopUp && (
                    <View style={styles.successPopUpMain}>
                        <View style={styles.successPopUp}>
                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
                                <Image source={require(`../../../assets/images/success.png`)} style={[styles.popUpImg]} />
                                <Text style={styles.popUpHeading}>thank you!</Text>
                                <Text style={styles.popUpText}>thankyou for sharing your thoughts we appreciate your feedback!</Text>

                                <View style={{ marginTop: VP(38.46) }}>
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
        </OuterLayout>
    )
}

const styles = StyleSheet.create({
    topHeading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: "#101010",
        fontSize: 18,
        textTransform: "capitalize",
        textAlign: "center",
        flex: 1
    },
    heading: {
        ...TextStyles.RALEWAY_BOLD,
        color: COLORS.BUTTON,
        fontSize: 24,
        textTransform: "capitalize",
        textAlign: "center"
    },
    info: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: "#7C7C7C",
        fontSize: 16,
        lineHeight: 24,
        textAlign: "center",
        textTransform: "capitalize",
    },
    img: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    icon: {
        width: FS(41.23),
        height: VP(41.23),
        resizeMode: "contain"
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
    buttonStyle: {
        ...TextStyles.LEXEND_SEMI_BOLD,
        fontSize: 20,
        color: COLORS.WHITE,
        textTransform: "uppercase",
    },
    successPopUpMain: {
        position: "absolute",
        width: width * 1,
        height: height * 1,
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    successPopUp: {
        position: "absolute",
        bottom: 0,
        backgroundColor: COLORS.WHITE,
        width: width * 1,
        height: height * .7,
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
    popUpImg: {
        resizeMode: "contain",
        width: FS(243.55),
        height: VP(201.93),
        marginTop: VP(50)
    }
});

export default Feedback;