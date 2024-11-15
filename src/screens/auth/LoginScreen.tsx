import React, { useCallback, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, TouchableOpacity, View, Text, StyleSheet, Keyboard, ImageBackground, Dimensions } from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import OuterLayout from '../../components/OuterLayout';
import InnerBlock from '../../components/InnerBlock';
import { ButtonSection as Button } from '../../components/Button';
import { FS, HP, VP } from '../../utils/Responsive';
import { saveStorage } from '../../utils/Storage';
import { TextStyles } from '../../utils/TextStyles';
import { globalStyle } from '../../utils/GlobalStyle';
import CustomTextInput from '../../components/CustomTextInput';
import { apiEndpoints, BACKEND_URL, COLORS, errorMessage } from '../../utils/Constants';
import { login, validateResource } from '../../utils/ValidateResource';
import { setDialogContent } from '../../redux/features/customDialog';
import Warning from '../../assets/svgs/warning.svg';
import { MainStackParamList } from '../../navigations/MainStackNavigator';
import { setProflieDetails } from '../../redux/features/profile';
import { useKeyboardListener } from '../../utils/customHooks/useKeyboardListener';

const { width, height } = Dimensions.get('window');

type NavigationProp = NativeStackScreenProps<MainStackParamList>;

const errorObj = { username: { status: false, text: "" }, password: { status: false, text: "" } };

const LoginScreen: React.FunctionComponent<NavigationProp> = ({
    navigation,
}) => {
    const dispatch = useDispatch();

    const { isKeyboardVisible } = useKeyboardListener();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState("");
    const [passwordHide, setPasswordHide] = useState(true);

    const [error, setError] = useState(errorObj);
    const [loading, setLoading] = useState(false);

    const handlePasswordHide = useCallback(() => {
        Keyboard.dismiss();
        setPasswordHide((prev) => !prev);
    }, [setPasswordHide]);

    const handleOnPress = async () => {
        try {
            // navigation.navigate(`MainTabNavigator`)
            // return;
            setError(errorObj);

            const resource = { username, password }

            const dataPayload = await validateResource(login, setError)(resource);

            dataPayload['email'] = username;

            setLoading(true);

            axios.post(BACKEND_URL + apiEndpoints.login, dataPayload)
                .then(response => {
                    setLoading(false);

                    const responseData = { ...response.data };

                    if (responseData.user && responseData.token) {
                        responseData['user']['password'] = dataPayload.password;
                        saveStorage(responseData, "userDetails");

                        dispatch(setProflieDetails(responseData));

                        navigation.reset({
                            index: 0,
                            routes: [
                                {
                                    name: 'MainTabNavigator',
                                },
                            ],
                        });
                    } else {
                        dispatch(setDialogContent({ title: <Warning width={FS(40)} height={VP(40)} />, message: errorMessage.commonMessage }));
                    }
                })
                .catch(error => {
                    setLoading(false);
                    dispatch(setDialogContent({ title: <Warning width={FS(40)} height={VP(40)} />, message: error?.response?.data?.message || errorMessage.commonMessage }));
                    console.log("Error sending data: ", error.message);
                });
        } catch (err: any) {
            setLoading(false);
            console.log(err.message, '---err')
        }
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text.replace(/\s/g, '')); // Remove spaces
    };

    const handleUsernameChange = (text: string) => {
        setUsername(text.replace(/\s/g, '')); // Remove spaces
    };

    return (
        <ImageBackground
            source={require(`../../assets/images/bg.png`)}
            style={[styles.bg]}
            resizeMode='contain'
        >
            <OuterLayout containerStyle={[globalStyle.containerStyle, styles.containerStyle]}>
                <InnerBlock>
                    <View style={styles.main}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ flex: 1, marginVertical: VP(50) }}>
                                <Text style={styles.headingText}>log in</Text>
                                <View style={{ marginTop: VP(14) }}>
                                    <CustomTextInput
                                        placeholder='Email / Mobile Number'
                                        formProps={{ text: username, setText: handleUsernameChange, error: error.username }}
                                        maxLength={100}
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
                                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 1, marginVertical: VP(50) }}>
                                <Button
                                    text={'log in'}
                                    onPress={handleOnPress}
                                    textStyle={styles.buttonStyle}
                                    isLoading={loading}
                                    activeButtonText={{ opacity: .65 }}
                                    // mainContainerStyle={{ marginTop: VP(60) }}
                                    LinearGradienrColor={["#FF00E2", "#FF00E2"]}
                                    contentContainerStyle={{ top: -2 }}
                                />
                            </View>
                        </ScrollView>

                        <View style={[styles.bottomSection, { display: isKeyboardVisible ? "none" : "flex" }]}>
                            <Text style={styles.bottomText}>don’t have an account?</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate(`SignUpScreen`)}
                            >
                                <Text style={styles.bottomLink}>Sign Up</Text>
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
        maxHeight: height * .8,
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
        textTransform: "capitalize"
    },
    line: {
        height: 1,
        backgroundColor: "#929292",
        width: "20%"
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
    forgotPasswordText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: COLORS.BUTTON,
        fontSize: 12
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

export default LoginScreen;
