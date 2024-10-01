import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import OuterLayout from '../../components/OuterLayout';
import { AuthStackParamList } from '../../navigations/AuthStackNavigator';
import InnerBlock from '../../components/InnerBlock';
import { ButtonSection as Button } from '../../components/Button';
import { FS, HP, VP } from '../../utils/Responsive';
import { loadStorage, saveStorage } from '../../utils/Storage';
import { TextStyles } from '../../utils/TextStyles';
import { globalStyle } from '../../utils/GlobalStyle';
import { apiEndpoints, BACKEND_URL, COLORS, errorMessage } from '../../utils/Constants';
import Left from '../../assets/svgs/left.svg';
import OTPInput from '../../components/OTPInput';
import { setDialogContent } from '../../redux/features/customDialog';
import Warning from '../../assets/svgs/warning.svg';
import Success from '../../assets/svgs/success.svg';
import Icon, { Icons } from '../../components/Icons';

type NavigationProp = NativeStackScreenProps<AuthStackParamList>;

const pinCheck = /^[0-9]{4}$/;

const VerifyCodeScreen: React.FunctionComponent<NavigationProp> = ({
    navigation,
}) => {
    const dispatch = useDispatch();

    const [value, setValue] = useState('');
    const [error, setError] = useState({ status: false, text: "" });

    const [loading, setLoading] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

    const handleOnPress = async () => {
        navigation.navigate(`CreatePasswordScreen`);
        return;
        try {
            const email = await loadStorage("forgotPasswordEmail");

            const otp = value.trim();

            if (pinCheck.test(otp) == false) {
                throw new Error(errorMessage.otp);
            }

            setError({ status: false, text: "" });

            const dataPayload = { email, otp: +otp };

            setLoading(true);

            axios.post(BACKEND_URL + apiEndpoints.otpVerify, dataPayload)
                .then((response) => {
                    setLoading(false);

                    saveStorage(dataPayload.otp, "forgotPasswordOTP");
                    navigation.navigate(`CreatePasswordScreen`);
                })
                .catch(error => {
                    setLoading(false);
                    dispatch(setDialogContent({ title: <Warning width={FS(40)} height={VP(40)} />, message: error?.response?.data?.message || errorMessage.commonMessage }));
                    console.log("Error sending data: ", error.message);
                });
        } catch (err: any) {
            setLoading(false);
            setError({ status: true, text: err.message });
            console.log(err.message, '---err');
        }
    };

    const handleOnResend = async () => {
        try {
            const email = await loadStorage("forgotPasswordEmail");

            const dataPayload = { email };

            setLoading(true);

            axios.post(BACKEND_URL + apiEndpoints.forgot, dataPayload)
                .then(response => {
                    setLoading(false);

                    dispatch(setDialogContent({ title: <Success width={FS(40)} height={VP(40)} />, message: response?.data?.message || "" }));
                })
                .catch(error => {
                    setLoading(false);
                    dispatch(setDialogContent({ title: <Warning width={FS(40)} height={VP(40)} />, message: error?.response?.data?.message || errorMessage?.commonMessage }));
                    console.log("Error sending data: ", error);
                });
        } catch (err: any) {
            setLoading(false);
            console.log(err, '---err');
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const email = await loadStorage("forgotPasswordEmail");

                if (!email) {
                    throw new Error("Email is empty");
                }
            } catch (err) {
                navigation.navigate(`LoginScreen`);
            }
        })()
    }, [])

    return (
        <OuterLayout containerStyle={globalStyle.containerStyle}>
            <InnerBlock>
                <View style={styles.main}>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ alignSelf: "center" }}
                        >
                            <Icon type={Icons.Feather} size={18} name={`chevron-left`} color={COLORS.BLACK} />
                        </TouchableOpacity>
                        <Text style={{ ...TextStyles.RALEWAY_SEMI_BOLD, color: "#424242", textTransform: "capitalize", textAlign: "center", flex: 1 }}>verify your email</Text>
                    </View>
                    <View style={{ flex: 4 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ marginTop: VP(50) }}>
                                <View style={{ justifyContent: "center", flexDirection: "row", paddingBottom: FS(54.70), paddingLeft: FS(54.70), paddingRight: FS(54.70), paddingTop: FS(54.70), backgroundColor: "#FFEAFD", width: FS(195), height: FS(195), borderRadius: FS(97.5), alignSelf: "center" }}>
                                    <Image source={require('../../assets/images/letter.png')} style={styles.icon} />
                                </View>
                            </View>

                            <View style={{ marginTop: VP(36) }}>
                                <Text style={{ ...TextStyles.RALEWAY_MEDIUM, fontSize: 14, textTransform: "capitalize", textAlign: "center", width: FS(290), lineHeight: VP(22) }}>
                                    please enter the 4 digit code sent to <Text style={{ fontWeight: "bold" }}>
                                        {forgotPasswordEmail}
                                    </Text>
                                </Text>
                            </View>

                            <View style={{ marginTop: VP(56) }}>
                                <OTPInput formProps={{ value, setValue, error }} />
                            </View>
                        </ScrollView>
                    </View>

                    <View style={{ flex: 1 }}>
                        <View style={{ marginTop: VP(17) }}>
                            <TouchableOpacity
                                onPress={handleOnResend}
                                style={{}}
                            >
                                <Text style={{ ...TextStyles.RALEWAY_MEDIUM, fontSize: 14, color: COLORS.BUTTON, textAlign: "center", textDecorationStyle: "solid", textDecorationLine: "underline", }}>
                                    Resend Code
                                </Text>
                            </TouchableOpacity>

                            <Button
                                text={'verify'}
                                onPress={handleOnPress}
                                textStyle={styles.buttonStyle}
                                isLoading={loading}
                                activeButtonText={{ opacity: .65 }}
                                mainContainerStyle={{ marginTop: VP(37) }}
                                LinearGradienrColor={["#FF00E2", "#FF00E2"]}
                                contentContainerStyle={{ top: -2 }}
                            />
                        </View>
                    </View>
                </View>
            </InnerBlock>
        </OuterLayout>
    );
};

const styles = StyleSheet.create({
    main: {
        marginHorizontal: HP(30),
        marginVertical: VP(20),
        flex: 1,
        flexDirection: 'column'
    },
    textInputStyle: {
        width: "100%",
    },
    buttonStyle: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 20,
        color: COLORS.WHITE,
        textTransform: "capitalize",
    },
    line: {
        height: 1,
        backgroundColor: "#929292",
        width: "20%",
    },
    icon: {
        width: FS(86.61),
        height: VP(87.58),
        resizeMode: "contain"
    }
});

export default VerifyCodeScreen;
