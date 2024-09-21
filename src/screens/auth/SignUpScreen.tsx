import React, { useEffect, useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, TouchableOpacity, View, Image, BackHandler, Text, StyleSheet } from 'react-native';
import axios from 'axios';

import OuterLayout from '../../components/OuterLayout';
import { AuthStackParamList } from '../../navigations/AuthStackNavigator';
import InnerBlock from '../../components/InnerBlock';
import { Button } from '../../components/Button';
import { FS, HP, VP } from '../../utils/Responsive';
import { showAlert } from '../../utils/Alert';
import { removeStorage, saveStorage } from '../../utils/Storage';
import { TextStyles } from '../../utils/TextStyles';
import { globalStyle } from '../../utils/GlobalStyle';
import CustomTextInput from '../../components/CustomTextInput';
import { apiEndpoints, BACKEND_URL, COLORS, errorMessage } from '../../utils/Constants';
import { signup, validateResource } from '../../utils/ValidateResource';
import { useDispatch } from 'react-redux';
import { setDialogContent } from '../../redux/features/customDialog';
import Warning from '../../assets/svgs/warning.svg';

type NavigationProp = NativeStackScreenProps<AuthStackParamList>;

const errorObj = { name: { status: false, text: "" }, email: { status: false, text: "" }, mobile: { status: false, text: "" }, password: { status: false, text: "" } };

const SignUpScreen: React.FunctionComponent<NavigationProp> = ({
    navigation,
}) => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [passwordHide, setPasswordHide] = useState(true);

    const [error, setError] = useState(errorObj);
    const [loading, setLoading] = useState(false);

    const handlePasswordHide = () => {
        setPasswordHide((pre) => !pre)
    }

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

    const dumpStorage = async () => {
        removeStorage("userDetails");
        removeStorage("forgotPasswordEmail");
        removeStorage("forgotPasswordOTP");
    }

    useEffect(() => {
        dumpStorage();
    }, [])

    return (
        <OuterLayout containerStyle={globalStyle.containerStyle}>
            <InnerBlock>
                <View style={styles.main}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ flex: 2 }}>
                            <Text style={styles.headingText}>sign up</Text>
                            <View style={{ marginTop: VP(14), }}>
                                <CustomTextInput
                                    placeholder='Full Name'
                                    formProps={{ text: name, setText: setName, error: error.name }}
                                    maxLength={100}
                                    styleInput={{ height: "auto" }}
                                />

                                <CustomTextInput
                                    placeholder='Email'
                                    formProps={{ text: email, setText: setEmail, error: error.email }}
                                    maxLength={100}
                                    styleInput={{ height: "auto", marginTop: VP(13) }}
                                />

                                <CustomTextInput
                                    placeholder='Mobile Number'
                                    formProps={{ text: mobile, setText: setMobile, error: error.mobile }}
                                    keyboardType='numeric'
                                    maxLength={20}
                                    styleInput={{
                                        height: "auto",
                                        marginTop: VP(13)
                                    }}
                                />

                                <CustomTextInput
                                    placeholder='Password'
                                    formProps={{ text: password, setText: setPassword, error: error.password }}
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
                                style={{ marginTop: VP(16.5), alignSelf: "flex-end" }}
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
                                    mainContainerStyle={{ marginTop: VP(19) }}
                                    LinearGradienrColor={["#FF00E2", "#FF00E2"]}
                                    contentContainerStyle={{ top: -2 }}
                                />
                            </View>

                            <View style={{ flexDirection: "row", marginTop: VP(11), justifyContent: "center", alignItems: "center", gap: 7 }}>
                                <View style={styles.line}></View>
                                <Text style={{ ...TextStyles.RALEWAY_SEMI_BOLD, fontSize: 12 }}>Or</Text>
                                <View style={styles.line}></View>
                            </View>

                            <View style={{ flexDirection: "row", marginTop: VP(24.5), justifyContent: "center", gap: 14 }}>
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
                            </View>

                            <View style={{ marginTop: VP(42), flexDirection: "row", justifyContent: "center", gap: 6 }}>
                                <Text style={{ ...TextStyles.RALEWAY_SEMI_BOLD, fontSize: 12 }}>Already Have An Account?</Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate(`LoginScreen`)}
                                    style={{}}
                                >
                                    <Text style={{ ...TextStyles.RALEWAY_SEMI_BOLD, fontSize: 12, color: COLORS.THEME }}>Log In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </InnerBlock>
        </OuterLayout>
    );
};

const styles = StyleSheet.create({
    main: {
        marginHorizontal: HP(30),
        marginVertical: VP(16),
        flex: 1
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
    }
});

export default SignUpScreen;
