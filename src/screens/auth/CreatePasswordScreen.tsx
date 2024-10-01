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
import { loadStorage, removeStorage } from '../../utils/Storage';
import { TextStyles } from '../../utils/TextStyles';
import { globalStyle } from '../../utils/GlobalStyle';
import CustomTextInput from '../../components/CustomTextInput';
import { apiEndpoints, BACKEND_URL, COLORS, errorMessage } from '../../utils/Constants';
import Left from '../../assets/svgs/left.svg';
import { resetPassword, validateResource } from '../../utils/ValidateResource';
import { setDialogContent } from '../../redux/features/customDialog';
import Warning from '../../assets/svgs/warning.svg';
import Icon, { Icons } from '../../components/Icons';

type NavigationProp = NativeStackScreenProps<AuthStackParamList>;

const errorObj = { password: { status: false, text: "" }, confirmPassword: { status: false, text: "" } }

const CreatePasswordScreen: React.FunctionComponent<NavigationProp> = ({
    navigation,
}) => {
    const dispatch = useDispatch();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState(errorObj);
    const [loading, setLoading] = useState(false);

    const handleOnPress = async () => {
        try {
            const email = await loadStorage("forgotPasswordEmail");
            const otp = await loadStorage("forgotPasswordOTP");

            setError(errorObj);

            const resource = { password, confirmPassword };

            const dataPayload = await validateResource(resetPassword, setError)(resource);

            dataPayload['email'] = email;
            dataPayload['otp'] = +otp;

            console.log(dataPayload, '----otp')

            setLoading(true);

            axios.post(BACKEND_URL + apiEndpoints.resetPassword, dataPayload)
                .then((response) => {
                    setLoading(false);

                    removeStorage("forgotPasswordEmail");
                    removeStorage("forgotPasswordOTP");
                    navigation.navigate(`LoginScreen`);
                })
                .catch(error => {
                    setLoading(false);
                    dispatch(setDialogContent({ title: <Warning width={FS(40)} height={VP(40)} />, message: error?.response?.data?.message || errorMessage.commonMessage }));
                    console.log("Error sending data: ", error.message);
                });
        } catch (err: any) {
            setLoading(false);
            console.log(err.message, '---err');
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const email = await loadStorage("forgotPasswordEmail");
                const otp = await loadStorage("forgotPasswordOTP");

                if (!email || !otp) {
                    throw new Error("Email/OTP is empty");
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
                    <View style={{ flex: 9 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    style={{ alignSelf: "center", top: VP(2) }}
                                >
                                    <Icon type={Icons.Feather} size={18} name={`chevron-left`} color={COLORS.BLACK} />
                                </TouchableOpacity>
                                <Text style={{ ...TextStyles.RALEWAY_SEMI_BOLD, color: "#424242", textAlign: "center", flex: 1 }}>Create New Password</Text>
                            </View>
                            <View style={{ marginTop: VP(50) }}>
                                <View style={{ justifyContent: "center", flexDirection: "row", paddingBottom: FS(52.83), paddingLeft: FS(65.69), paddingRight: FS(63.9), paddingTop: FS(52.62), backgroundColor: "#FFEAFD", width: FS(202), height: FS(202), borderRadius: FS(101), alignSelf: "center" }}>
                                    <Image source={require('../../assets/images/lock.png')} style={styles.icon} />
                                </View>
                            </View>

                            <View style={{ marginTop: VP(36) }}>
                                <Text style={{ ...TextStyles.RALEWAY_MEDIUM, fontSize: 14, textTransform: "capitalize", textAlign: "center", width: FS(290), lineHeight: VP(22) }}>
                                    your new password must be different from previously used password.
                                </Text>
                            </View>

                            <View style={{ marginTop: VP(15) }}>
                                <CustomTextInput
                                    placeholder='New Password'
                                    formProps={{ text: password, setText: setPassword, error: error.password }}
                                    maxLength={100}
                                    secureTextEntry={true}
                                    styleInput={{
                                        height: "auto",
                                        marginTop: HP(12)
                                    }}
                                />

                                <CustomTextInput
                                    placeholder='Confirm Password'
                                    formProps={{ text: confirmPassword, setText: setConfirmPassword, error: error.confirmPassword }}
                                    maxLength={100}
                                    secureTextEntry={true}
                                    styleInput={{
                                        height: "auto",
                                        marginTop: HP(12)
                                    }}
                                />
                            </View>
                        </ScrollView>
                    </View>

                    <View style={{ flex: 1 }}>
                        <Button
                            text={'save'}
                            onPress={handleOnPress}
                            textStyle={styles.buttonStyle}
                            isLoading={loading}
                            activeButtonText={{ opacity: .65 }}
                            mainContainerStyle={{ marginTop: VP(17) }}
                            LinearGradienrColor={["#FF00E2", "#FF00E2"]}
                            contentContainerStyle={{ top: -2 }}
                        />
                    </View>
                </View>
            </InnerBlock>
        </OuterLayout>
    );
};

const styles = StyleSheet.create({
    main: {
        marginHorizontal: HP(30),
        marginVertical: HP(20),
        flex: 1
    },
    buttonStyle: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 20,
        color: COLORS.WHITE,
        textTransform: "capitalize",
    },
    icon: {
        width: FS(72.41),
        height: VP(96.55),
        resizeMode: "contain"
    }
});

export default CreatePasswordScreen;
