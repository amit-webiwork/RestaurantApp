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
import Left from '../../assets/svgs/left.svg';
import { forgotPassword, validateResource } from '../../utils/ValidateResource';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setDialogContent } from '../../redux/features/customDialog';
import Warning from '../../assets/svgs/warning.svg';

type NavigationProp = NativeStackScreenProps<AuthStackParamList>;

const errorObj = { username: { status: false, text: "" } };

const ForgotScreen: React.FunctionComponent<NavigationProp> = ({
    navigation,
}) => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');

    const [error, setError] = useState(errorObj);
    const [loading, setLoading] = useState(false);

    const handleOnPress = async () => {
        try {
            navigation.navigate(`VerifyCodeScreen`);
            return;
            setError(errorObj);

            const resource = { username };

            const dataPayload = await validateResource(forgotPassword, setError)(resource);

            dataPayload['email'] = username;

            setLoading(true);

            axios.post(BACKEND_URL + apiEndpoints.forgot, dataPayload)
                .then(response => {
                    setLoading(false);

                    saveStorage(dataPayload.email, "forgotPasswordEmail");

                    navigation.navigate(`VerifyCodeScreen`);
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

    return (
        <OuterLayout containerStyle={globalStyle.containerStyle}>
            <InnerBlock>
                <View style={styles.main}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ flex: 5 }}>
                            <View style={{ flexDirection: "row", gap: 33.72, }}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    style={{ alignSelf: "center", top: VP(2) }}
                                >
                                    <Left width={FS(16)} height={VP(16)} />
                                </TouchableOpacity>
                                <Text style={{ ...TextStyles.RALEWAY_SEMI_BOLD, color: "#424242", }}>Forgot Password</Text>
                            </View>

                            <View style={{ marginTop: VP(50) }}>
                                <View style={{ justifyContent: "center", flexDirection: "row", paddingBottom: HP(52.83), paddingLeft: HP(65.69), paddingRight: HP(63.9), paddingTop: HP(52.62), backgroundColor: "#FFEAFD", width: FS(202), height: VP(202), borderRadius: 500, alignSelf: "center" }}>
                                    <Image source={require('../../assets/images/lock.png')} style={styles.icon} />
                                </View>
                            </View>

                            <View style={{ marginTop: VP(36) }}>
                                <Text style={{ ...TextStyles.RALEWAY_MEDIUM, fontSize: 14, textTransform: "capitalize", textAlign: "center", lineHeight: VP(22) }}>
                                    please enter your email address or mobile number to recieve a verification code.
                                </Text>
                            </View>

                            <View style={{ marginTop: VP(53) }}>
                                <CustomTextInput
                                    placeholder='Email Address Or Phone Number'
                                    formProps={{ text: username, setText: setUsername, error: error.username }}
                                    maxLength={100}
                                    styleInput={{
                                        height: "auto"
                                    }}
                                />
                            </View>
                        </View>


                        <View style={{ flex: 1 }}>
                            <Button
                                text={'send'}
                                onPress={handleOnPress}
                                textStyle={styles.buttonStyle}
                                isLoading={loading}
                                activeButtonText={{ opacity: .65 }}
                                mainContainerStyle={{ marginTop: VP(37) }}
                                LinearGradienrColor={["#FF00E2", "#FF00E2"]}
                                contentContainerStyle={{ top: -2 }}
                            />
                        </View>
                    </ScrollView>
                </View>
            </InnerBlock>
        </OuterLayout>
    );
};

const styles = StyleSheet.create({
    main: {
        marginHorizontal: HP(40),
        marginVertical: VP(20),
        flex: 1
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
        width: FS(72.41),
        height: VP(96.55),
        resizeMode: "contain"
    }
});

export default ForgotScreen;
