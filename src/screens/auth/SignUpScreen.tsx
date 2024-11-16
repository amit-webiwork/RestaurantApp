import React, { useCallback, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, TouchableOpacity, View, Image, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import OuterLayout from '../../components/OuterLayout';
import { AuthStackParamList } from '../../navigations/AuthStackNavigator';
import InnerBlock from '../../components/InnerBlock';
import { ButtonSection as Button } from '../../components/Button';
import { FS, HP, VP } from '../../utils/Responsive';
import { removeStorage, saveStorage } from '../../utils/Storage';
import { TextStyles } from '../../utils/TextStyles';
import { globalStyle } from '../../utils/GlobalStyle';
import CustomTextInput from '../../components/CustomTextInput';
import { apiEndpoints, BACKEND_URL, COLORS, errorMessage } from '../../utils/Constants';
import { signup, validateResource } from '../../utils/ValidateResource';
import { setDialogContent } from '../../redux/features/customDialog';
import Warning from '../../assets/svgs/warning.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useKeyboardListener } from '../../utils/customHooks/useKeyboardListener';

type NavigationProp = NativeStackScreenProps<AuthStackParamList>;

const errorObj = { name: { status: false, text: "" }, email: { status: false, text: "" }, mobile: { status: false, text: "" }, password: { status: false, text: "" } };

const { width, height } = Dimensions.get('window');

const SignUpScreen: React.FunctionComponent<NavigationProp> = ({
    navigation,
}) => {
    const dispatch = useDispatch();

    const { isKeyboardVisible } = useKeyboardListener();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [passwordHide, setPasswordHide] = useState(true);

    const [error, setError] = useState(errorObj);
    const [loading, setLoading] = useState(false);

    const handlePasswordHide = useCallback(() => {
        setPasswordHide((prev) => !prev);
    }, [setPasswordHide]);

    const handleMobileChange = (text: string) => {
        setMobile(text.replace(/\s/g, ''));
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text.replace(/\s/g, ''));
    };

    const handleEmailChange = (text: string) => {
        setEmail(text.replace(/\s/g, ''));
    };

    const handleOnPress = async () => {
        try {
            setError(errorObj);

            const resource = { name, email, mobile, password }

            const dataPayload = await validateResource(signup, setError)(resource);

            dataPayload['phoneNo'] = mobile;

            setLoading(true);

            axios.post(BACKEND_URL + apiEndpoints.signup, dataPayload)
                .then(response => {
                    setLoading(false);

                    const responseData = { ...response.data };

                    if (responseData.user && responseData.token) {
                        responseData['user']['password'] = dataPayload.password;
                        saveStorage(responseData, "userDetails");

                        navigation.navigate(`LoginScreen`)
                    } else {
                        dispatch(setDialogContent({ title: <Warning width={FS(40)} height={VP(40)} />, message: errorMessage.commonMessage }));
                    }
                })
                .catch(error => {
                    setLoading(false);
                    dispatch(setDialogContent({ title: <Warning width={FS(40)} height={VP(40)} />, message: error?.response?.data?.message || errorMessage.commonMessage }));
                    console.warn("Error sending data: ", error.message);
                });

        } catch (err: any) {
            setLoading(false);
            console.log(err.message, '---err');
        }
    };

    const removeItemFromAsyncStorage = async (key: string) => {
        try {
            await AsyncStorage.removeItem(key);
            console.log(`Item with key ${key} removed from storage.`);
        } catch (error) {
            console.error("Error removing item from storage", error);
        }
    };

    const dumpStorage = async () => {
        removeStorage("userDetails");
        removeStorage("forgotPasswordEmail");
        removeStorage("forgotPasswordOTP");
        removeStorage("cartItems");
        removeStorage("recentSearchItems");
        removeStorage("fcmToken");
        removeStorage("notificationList");
        removeItemFromAsyncStorage('fcmToken');
    }

    useEffect(() => {
        dumpStorage();
    }, [])

    return (
        <ImageBackground
            source={require(`../../assets/images/bg.png`)}
            style={[styles.bg]}
            resizeMode='cover'
        >
            <OuterLayout containerStyle={[globalStyle.containerStyle, styles.containerStyle]}>
                <InnerBlock>
                    <View style={styles.main}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ flex: 2, marginVertical: VP(50) }}>
                                <Text style={styles.headingText}>sign up</Text>
                                <View style={{ marginTop: VP(14), }}>
                                    <CustomTextInput
                                        placeholder='Full Name'
                                        formProps={{ text: name, setText: setName, error: error.name }}
                                        maxLength={100}
                                        styleInput={{ height: "auto", marginTop: VP(13) }}
                                    />

                                    <CustomTextInput
                                        placeholder='Email'
                                        formProps={{ text: email, setText: handleEmailChange, error: error.email }}
                                        maxLength={100}
                                        styleInput={{ height: "auto", marginTop: VP(13) }}
                                    />

                                    <CustomTextInput
                                        placeholder='Mobile Number'
                                        formProps={{ text: mobile, setText: handleMobileChange, error: error.mobile }}
                                        keyboardType='numeric'
                                        maxLength={20}
                                        styleInput={{
                                            height: "auto",
                                            marginTop: VP(13)
                                        }}
                                    />

                                    <CustomTextInput
                                        placeholder='Password'
                                        formProps={{ text: password, setText: handlePasswordChange, error: error.password }}
                                        maxLength={100}
                                        secureTextEntry={passwordHide}
                                        iconName={passwordHide ? require(`../../assets/icons/eyeclosed.png`) : require(`../../assets/icons/eyeopen.png`)}
                                        iconClick={true}
                                        iconAction={handlePasswordHide}
                                        styleInput={{
                                            height: "auto",
                                            marginTop: VP(13)
                                        }}
                                    />
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate(`ForgotScreen`)}
                                    style={{ alignSelf: "flex-end" }}
                                >
                                    <Text style={{ ...TextStyles.RALEWAY_SEMI_BOLD, color: COLORS.BUTTON, fontSize: 12 }}>Forgot Password?</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 1 }}>
                                <View>
                                    <Button
                                        text={'sign up'}
                                        onPress={handleOnPress}
                                        textStyle={styles.buttonStyle}
                                        isLoading={loading}
                                        activeButtonText={{ opacity: .65 }}
                                        // mainContainerStyle={{ marginTop: VP(19) }}
                                        LinearGradienrColor={["#FF00E2", "#FF00E2"]}
                                        contentContainerStyle={{ top: -2 }}
                                    />
                                </View>

                                {/* <View style={{ flexDirection: "row", marginTop: VP(11), justifyContent: "center", alignItems: "center", gap: HP(7) }}>
                                <View style={styles.line}></View>
                                <Text style={{ ...TextStyles.RALEWAY_SEMI_BOLD, fontSize: 12 }}>Or</Text>
                                <View style={styles.line}></View>
                            </View> */}

                                {/* <View style={{ flexDirection: "row", marginTop: VP(24.5), justifyContent: "center", gap: HP(14) }}>
                                <TouchableOpacity
                                    onPress={() => void (0)}
                                    style={{}}
                                >
                                    <Image source={require('../../assets/icons/facebook.png')} style={styles.icon} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => void (0)}
                                    style={{}}
                                >
                                    <Image source={require('../../assets/icons/google.png')} style={styles.icon} />
                                </TouchableOpacity>
                            </View> */}
                            </View>
                        </ScrollView>
                        <View style={[styles.bottomSection, { display: isKeyboardVisible ? "none" : "flex" }]}>
                            <Text style={styles.bottomText}>Already Have An Account?</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate(`LoginScreen`)}
                                style={{}}
                            >
                                <Text style={styles.bottomLink}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </InnerBlock>
            </OuterLayout>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        maxHeight: height * .85,
        margin: "auto",
        width: width * .9,
        borderRadius: HP(46)
    },
    main: {
        marginHorizontal: HP(30),
        flex: 1,
        marginVertical: VP(10)
    },
    headingText: {
        ...TextStyles.RALEWAY_BOLD,
        color: COLORS.THEME,
        fontSize: 38,
        textTransform: "capitalize"
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
        width: FS(24),
        height: VP(24),
        resizeMode: "contain"
    },
    bg: {
        width: "100%",
        height: height * 1,
        flex: 1
    },
    bottomSection: {
        flexDirection: "row",
        justifyContent: "center",
        gap: HP(6),
        position: "absolute",
        bottom: 0,
        alignSelf: "center",
        marginVertical: VP(20)
    },
    bottomText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 12,
        textTransform: "capitalize"
    },
    bottomLink: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 12,
        color: COLORS.THEME
    }
});

export default SignUpScreen;
