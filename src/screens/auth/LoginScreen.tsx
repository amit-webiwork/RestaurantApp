import React, { useEffect, useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, TouchableOpacity, View, Image, BackHandler, Text, StyleSheet } from 'react-native';

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
import { login, validateResource } from '../../utils/ValidateResource';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setDialogContent } from '../../redux/features/customDialog';
import Warning from '../../assets/svgs/warning.svg';
import { MainTabParamList } from '../../navigations/MainTabNavigator';
import { MainStackParamList } from '../../navigations/MainStackNavigator';

type NavigationProp = NativeStackScreenProps<MainStackParamList>;

const errorObj = { username: { status: false, text: "" }, password: { status: false, text: "" } };

const LoginScreen: React.FunctionComponent<NavigationProp> = ({
    navigation,
}) => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
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
                        
                        navigation.navigate(`MainTabNavigator`)
                    } else {
                        dispatch(setDialogContent({ title: <Warning width={40} height={40} />, message: errorMessage.commonMessage }));
                    }
                })
                .catch(error => {
                    setLoading(false);
                    dispatch(setDialogContent({ title: <Warning width={40} height={40} />, message: error?.response?.data?.message || errorMessage.commonMessage }));
                    console.log("Error sending data: ", error.message);
                });
        } catch (err: any) {
            setLoading(false);
            console.log(err.message, '---err')
        }
    };

    return (
        <OuterLayout containerStyle={globalStyle.containerStyle}>
            <InnerBlock>
                <View style={styles.main}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.headingText}>log in</Text>
                            <View style={{ marginTop: VP(14) }}>
                                <CustomTextInput
                                    placeholder='Email / Mobile Number'
                                    formProps={{ text: username, setText: setUsername, error: error.username }}
                                    maxLength={100}
                                    styleInput={{
                                        height: "auto"
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
                                <Text style={{ ...TextStyles.RALEWAY_SEMI_BOLD, color: COLORS.BUTTON, fontSize: FS(12) }}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1,}}>
                            <Button
                                text={'log in'}
                                onPress={handleOnPress}
                                textStyle={styles.buttonStyle}
                                isLoading={loading}
                                activeButtonText={{ opacity: .65 }}
                                mainContainerStyle={{ marginTop: VP(47) }}
                                LinearGradienrColor={["#FF00E2", "#FF00E2"]}
                                contentContainerStyle={{ top: -2 }}
                            />
                            <View style={{ marginTop: VP(250), flexDirection: "row", justifyContent: "center", gap: 6,  }}>
                                <Text style={{ ...TextStyles.RALEWAY_SEMI_BOLD, fontSize: FS(12), textTransform: "capitalize" }}>don’t have an account?</Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate(`SignUpScreen`)}
                                    style={{}}
                                >
                                    <Text style={{ ...TextStyles.RALEWAY_SEMI_BOLD, fontSize: FS(12), color: COLORS.THEME }}>Sign Up</Text>
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
        fontSize: FS(38),
        textTransform: "capitalize"
    },
    buttonStyle: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: FS(20),
        color: COLORS.WHITE,
        textTransform: "capitalize",
    },
    line: {
        height: 1,
        backgroundColor: "#929292",
        width: "20%",
    },
    icon: {
        width: HP(24),
        height: VP(24),
        resizeMode: "contain"
    }
});

export default LoginScreen;
