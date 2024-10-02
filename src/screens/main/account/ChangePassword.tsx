import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Keyboard, ScrollView } from 'react-native';

import Icon, { Icons } from '../../../components/Icons';
import { COLORS } from '../../../utils/Constants';
import { FS, HP, VP } from '../../../utils/Responsive';
import { TextStyles } from '../../../utils/TextStyles';
import CustomTextInputNoEffect from '../../../components/CustomTextInputNoEffect';
import { ButtonSection as Button } from '../../../components/Button';
import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { globalStyle } from '../../../utils/GlobalStyle';

const { width, height } = Dimensions.get('window');

const errorObj = { password: { status: false, text: "" }, confirmPassword: { status: false, text: "" }, oldPassword: { status: false, text: "" } }

function ChangePassword({ navigation }: { navigation: any }): React.JSX.Element {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");

    const [error, setError] = useState(errorObj);

    const [passwordHide, setPasswordHide] = useState({ password: true, confirmPassword: true, oldPassword: true });

    const [showPopUp, setShowPopUp] = useState(false);

    const handlePasswordHide = (key: string) => {
        Keyboard.dismiss();
        setPasswordHide((pre: any) => ({ ...pre, [key]: !pre[key] }))
    }

    const handleOnPress = () => {
        // setError((pre: any) => ({ ...pre, password: { status: true, text: "Must be at least 8 character" } }))
        setShowPopUp(true);
    }

    return (
        <OuterLayout containerStyle={globalStyle.containerStyle}>
            <InnerBlock>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingHorizontal: HP(30), paddingVertical: HP(27.79) }}>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{ alignSelf: "center", top: VP(3) }}
                            >
                                <Icon type={Icons.Feather} size={18} name={`chevron-left`} color={COLORS.BLACK} />
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
                                    isLoading={false}
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
                                <Image source={require(`../../../assets/images/success.png`)} style={[styles.img]} />
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
        lineHeight: 28.8
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
        height: FS(15),
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