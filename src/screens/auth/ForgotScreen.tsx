import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import OuterLayout from '../../components/OuterLayout';
import { AuthStackParamList } from '../../navigations/AuthStackNavigator';
import InnerBlock from '../../components/InnerBlock';
import { ButtonSection as Button } from '../../components/Button';
import { FS, HP, VP } from '../../utils/Responsive';
import { saveStorage } from '../../utils/Storage';
import { TextStyles } from '../../utils/TextStyles';
import { globalStyle } from '../../utils/GlobalStyle';
import CustomTextInput from '../../components/CustomTextInput';
import { apiEndpoints, BACKEND_URL, COLORS, errorMessage } from '../../utils/Constants';
import { forgotPassword, validateResource } from '../../utils/ValidateResource';
import { setDialogContent } from '../../redux/features/customDialog';
import Warning from '../../assets/svgs/warning.svg';
import Icon, { Icons } from '../../components/Icons';

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
            // navigation.navigate(`VerifyCodeScreen`);
            // return;
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
                            {/* Top Navigation */}
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    style={{ alignSelf: "center", top: VP(2) }}
                                >
                                    <Icon type={Icons.Feather} size={FS(18)} name={`chevron-left`} color={COLORS.BLACK} />
                                </TouchableOpacity>
                                <Text style={{ ...TextStyles.RALEWAY_SEMI_BOLD, color: "#424242", textAlign: "center", flex: 1 }}>Forgot Password</Text>
                            </View>

                            <View style={{ marginTop: VP(50) }}>
                                <View style={{ justifyContent: "center", flexDirection: "row", paddingBottom: FS(52.83), paddingLeft: FS(65.69), paddingRight: FS(63.9), paddingTop: FS(52.62), backgroundColor: "#FFEAFD", width: FS(202), height: FS(202), borderRadius: FS(101), alignSelf: "center" }}>
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
                                        height: "auto",
                                        marginTop: VP(13)
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
        marginHorizontal: HP(30),
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
