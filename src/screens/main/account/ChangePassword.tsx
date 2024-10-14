import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Keyboard, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import Icon, { Icons } from '../../../components/Icons';
import { apiEndpoints, BACKEND_URL, COLORS, errorMessage } from '../../../utils/Constants';
import { FS, HP, VP } from '../../../utils/Responsive';
import { TextStyles } from '../../../utils/TextStyles';
import CustomTextInputNoEffect from '../../../components/CustomTextInputNoEffect';
import { ButtonSection as Button } from '../../../components/Button';
import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { globalStyle } from '../../../utils/GlobalStyle';
import { changePassword, validateResource } from '../../../utils/ValidateResource';
import { loadStorage, saveStorage } from '../../../utils/Storage';
import { setProflieDetails } from '../../../redux/features/profile';
import Warning from '../../../assets/svgs/warning.svg';
import { setDialogContent } from '../../../redux/features/customDialog';
import CheckmarkWithConfetti from '../../../components/CheckmarkWithConfetti';

const { width, height } = Dimensions.get('window');

const errorObj = { password: { status: false, text: "" }, confirmPassword: { status: false, text: "" }, oldPassword: { status: false, text: "" } }

function ChangePassword({ navigation }: { navigation: any }): React.JSX.Element {
    const dispatch = useDispatch();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(errorObj);

    const [passwordHide, setPasswordHide] = useState({ password: true, confirmPassword: true, oldPassword: true });

    const [showPopUp, setShowPopUp] = useState(false);

    const handlePasswordHide = (key: string) => {
        Keyboard.dismiss();
        setPasswordHide((pre: any) => ({ ...pre, [key]: !pre[key] }))
    }

    const handleOnPress = async () => {
        try {
            setError(errorObj);

            const resource = { password, confirmPassword, oldPassword }

            const dataPayload = await validateResource(changePassword, setError)(resource);

            setLoading(true);

            axios.put(BACKEND_URL + apiEndpoints.changePassword, dataPayload)
                .then(async (response: any) => {
                    setLoading(false);

                    const responseData = response.data;

                    const userDetails = await loadStorage('userDetails');
                    userDetails['user']['password'] = password;

                    saveStorage(userDetails, "userDetails");
                    dispatch(setProflieDetails(userDetails));
                    setShowPopUp(true);
                })
                .catch(error => {
                    setLoading(false);
                    dispatch(setDialogContent({ title: <Warning width={FS(40)} height={VP(40)} />, message: `${error?.response?.data?.message}` || errorMessage.commonMessage }));
                    console.log("Error sending data: ", error.message);
                });

        } catch (err: any) {
            setLoading(false);
            console.log(err.message, '---err');
        }
    };

    return (
        <OuterLayout containerStyle={globalStyle.containerStyle}>
            <InnerBlock>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingHorizontal: HP(21), paddingVertical: HP(27.79) }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{ alignSelf: "center" }}
                            >
                                <Icon type={Icons.Feather} size={FS(18)} name={`chevron-left`} color={COLORS.BLACK} />
                            </TouchableOpacity>
                            <Text style={styles.topHeading}>change Password</Text>
                        </View>

                        <View style={{ marginTop: VP(34.85) }}>
                            <View style={{ gap: HP(9.62) }}>
                                <Text style={styles.heading}>change Password</Text>
                                <Text style={styles.info}>Your new password must be different from the previously used password.</Text>
                            </View>

                            {/* Old Password */}
                            <View style={{ marginTop: VP(33.54) }}>
                                <Text style={styles.label}>Old Password</Text>

                                <CustomTextInputNoEffect
                                    formProps={{ text: oldPassword, setText: setOldPassword, error: error.oldPassword }}
                                    placeholder="**********"
                                    maxLength={100}
                                    secureTextEntry={passwordHide.oldPassword}
                                    iconName={passwordHide.oldPassword ? require(`../../../assets/icons/Iconclosed.png`) : require(`../../../assets/icons/Iconopned.png`)}
                                    iconClick={true}
                                    iconAction={() => handlePasswordHide('oldPassword')}
                                    styleInput={styles.styleInput}
                                    iconStyle={passwordHide.oldPassword ? styles.iconClosedStyle : styles.iconOpenStyle}
                                    errorStyle={styles.errorStyle}
                                />
                            </View>

                            {/* New Password */}
                            <View style={{ marginTop: VP(16.92) }}>
                                <Text style={styles.label}>New Password</Text>

                                <CustomTextInputNoEffect
                                    formProps={{ text: password, setText: setPassword, error: error.password }}
                                    placeholder="**********"
                                    maxLength={100}
                                    secureTextEntry={passwordHide.password}
                                    iconName={passwordHide.password ? require(`../../../assets/icons/Iconclosed.png`) : require(`../../../assets/icons/Iconopned.png`)}
                                    iconClick={true}
                                    iconAction={() => handlePasswordHide('password')}
                                    styleInput={styles.styleInput}
                                    iconStyle={passwordHide.password ? styles.iconClosedStyle : styles.iconOpenStyle}
                                    errorStyle={styles.errorStyle}
                                />
                            </View>

                            {/* Confirm Password */}
                            <View style={{ marginTop: VP(16.92) }}>
                                <Text style={styles.label}>Confirm Password</Text>

                                <CustomTextInputNoEffect
                                    formProps={{ text: confirmPassword, setText: setConfirmPassword, error: error.confirmPassword }}
                                    placeholder="**********"
                                    maxLength={100}
                                    secureTextEntry={passwordHide.confirmPassword}
                                    iconName={passwordHide.confirmPassword ? require(`../../../assets/icons/Iconclosed.png`) : require(`../../../assets/icons/Iconopned.png`)}
                                    iconClick={true}
                                    iconAction={() => handlePasswordHide('confirmPassword')}
                                    styleInput={styles.styleInput}
                                    iconStyle={passwordHide.confirmPassword ? styles.iconClosedStyle : styles.iconOpenStyle}
                                    errorStyle={styles.errorStyle}
                                />
                            </View>

                            <View style={{ marginTop: VP(24.85) }}>
                                <Button
                                    text={'verify'}
                                    onPress={handleOnPress}
                                    textStyle={styles.saveButtonStyle}
                                    isLoading={loading}
                                    activeButtonText={{ opacity: .65 }}
                                    mainContainerStyle={{ flex: 1, borderRadius: HP(8) }}
                                    LinearGradienrColor={[COLORS.BUTTON, COLORS.BUTTON]}
                                    contentContainerStyle={{ top: -2 }}
                                />
                            </View>
                        </View>

                    </View>
                </ScrollView>

                {showPopUp && (
                    <View style={styles.successPopUpMain}>
                        <View style={styles.successPopUp}>
                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
                                {/* <Image source={require(`../../../assets/images/success.png`)} style={[styles.img]} /> */}
                                <View style={{}}>
                                    <CheckmarkWithConfetti />
                                </View>

                                <Text style={styles.popUpHeading}>Password Changed</Text>
                                <Text style={styles.popUpText}>Password changed successfully, you can login again with a new password</Text>

                                <View style={{ marginTop: VP(38.46) }}>
                                    <Button
                                        text={'Back'}
                                        onPress={() => navigation.goBack()}
                                        textStyle={styles.saveButtonStyle}
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
    label: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 16.83,
        lineHeight: 24,
        color: "#101010",
        textTransform: "capitalize"
    },
    saveButtonStyle: {
        ...TextStyles.LEXEND_SEMI_BOLD,
        fontSize: 20,
        color: COLORS.WHITE,
        textTransform: "uppercase"
    },
    topHeading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: "#101010",
        fontSize: 18,
        textTransform: "capitalize",
        textAlign: "center",
        flex: 1,
        alignSelf: "center"
    },
    heading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: "#101010",
        fontSize: 26.46,
        lineHeight: 48.1,
        textTransform: "capitalize"
    },
    info: {
        ...TextStyles.RALEWAY_MEDIUM,
        color: "#878787",
        fontSize: 14.83,
        lineHeight: 24
    },
    styleInput: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 16,
        paddingVertical: HP(8),
        paddingHorizontal: HP(15),
        marginTop: VP(9.62),
        borderWidth: 1.2,
        borderColor: "#D6D6D6",
        borderRadius: HP(9.62),
        height: VP(60.46)
    },
    iconClosedStyle: {
        width: FS(21),
        height: FS(16),
    },
    iconOpenStyle: {
        width: FS(22.5),
        height: FS(15),
    },
    errorStyle: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 14,
        textTransform: "capitalize",
        lineHeight: 24,
        color: COLORS.RED,
        marginTop: VP(-10)
    },
    img: {
        resizeMode: "contain",
        width: FS(243.55),
        height: VP(201.93),
        marginTop: VP(50)
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
        marginTop: VP(14.42),
        color: "#7C7C7C",
        textAlign: "center",
        width: width * .90
    }
});

export default ChangePassword;