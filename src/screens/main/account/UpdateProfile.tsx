import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { apiEndpoints, BACKEND_URL, COLORS, errorMessage, OTP_SEND_WAIT_TIME, responseMessage, STD_CODE } from '../../../utils/Constants';
import { FS, HP, VP } from '../../../utils/Responsive';
import { TextStyles } from '../../../utils/TextStyles';
import AccountSkeletonSection from '../../../components/AccountSkeleton';
import CustomTextInputNoEffect from '../../../components/CustomTextInputNoEffect';
import { ButtonSection as Button } from '../../../components/Button';
import { proflieDetails, setProflieDetails } from '../../../redux/features/profile';
import { updateProfile, updateProfileEmail, updateProfileName, updateProfilePhone, validateResource } from '../../../utils/ValidateResource';
import { loadStorage, saveStorage } from '../../../utils/Storage';
import { setDialogContent } from '../../../redux/features/customDialog';
import Warning from '../../../assets/svgs/warning.svg';
import OuterLayout from '../../../components/OuterLayout';
import { globalStyle } from '../../../utils/GlobalStyle';
import InnerBlock from '../../../components/InnerBlock';
import { submitProfileEmail, submitProfileName, submitProfilePhone } from '../../../utils/ApiCall';
import NormalLoader from '../../../components/NormalLoader';
import { showFadeAlert } from '../../../utils/Alert';
import { AppDispatch } from '../../../redux/store';
import OTPVerifyPhoneDialog from '../../../components/dialogs/OTPVerifyPhoneDialog';
import OTPVerifyEmailDialog from '../../../components/dialogs/OTPVerifyEmailDialog';

const errorObj = { "name": { "error": false, "text": "" }, "phone": { "error": false, "text": "" }, "email": { "error": false, "text": "" } }

function UpdateProfile({ navigation }: { navigation: any }): React.JSX.Element {
    const dispatch: AppDispatch = useDispatch();

    const ProflieDetails = useSelector(proflieDetails);

    const { token, user } = ProflieDetails;

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(errorObj);
    const [loading, setLoading] = useState(false);
    const [editName, setEditName] = useState(false);
    const [editPhone, setEditPhone] = useState(false);
    const [editEmail, setEditEmail] = useState(false);

    const [resendStatus, setResendStatus] = useState(true);
    const [timer, setTimer] = useState(0);
    const [showTimerMessage, setShowTimerMessage] = useState(true);

    const [verifyPhoneDialogVisible, setVerifyPhoneDialogVisible] = useState(false);
    const [verifyEmailDialogVisible, setVerifyEmailDialogVisible] = useState(false);

    useEffect(() => {
        setName(user?.name || "")
        setPhone(user?.phoneNo || "")
        setEmail(user?.email || "")
    }, [user])

    const handleOnCancel = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    // not workable now
    const handleOnPress = async () => {
        try {
            setError(errorObj);

            const resource = { name, email, phone }

            const dataPayload = await validateResource(updateProfile, setError)(resource);

            dataPayload['phoneNo'] = phone;
            delete (dataPayload['phone']);

            setLoading(true);

            axios.put(BACKEND_URL + apiEndpoints.updateProfile, dataPayload)
                .then(async (response: any) => {
                    setLoading(false);

                    const responseData = { ...response.data };

                    const userDetails = await loadStorage('userDetails');
                    userDetails['user']['name'] = responseData?.name || "";
                    userDetails['user']['email'] = responseData?.email || "";
                    userDetails['user']['phoneNo'] = responseData?.phoneNo || "";

                    saveStorage(userDetails, "userDetails");
                    dispatch(setProflieDetails(userDetails));

                    navigation.goBack();
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

    const handlePhoneChange = (text: string) => {
        setPhone(text.replace(/\s/g, '')); // Remove spaces
    };

    const handleEmailChange = (text: string) => {
        setEmail(text.replace(/\s/g, '')); // Remove spaces
    };

    const handleNameUpdate = async () => {
        try {
            setError(errorObj);

            const resource = { name }

            const dataPayloads = await validateResource(updateProfileName, setError)(resource);

            if (user?.name === dataPayloads?.name) {
                showFadeAlert(responseMessage.profileNameUpdate);
                setEditName(false);
                return;
            }

            setLoading(true);

            try {
                const dataPayload = {
                    "name": dataPayloads.name
                };

                const response: any = await submitProfileName(dataPayload);

                const responseData = { ...response.data };

                const userDetails = await loadStorage('userDetails');

                userDetails['user']['name'] = responseData?.name || "";

                saveStorage(userDetails, "userDetails");

                dispatch(setProflieDetails(userDetails));

                setEditName(false);
                showFadeAlert(responseMessage.profileNameUpdate);
            } catch (error: any) {
                dispatch(setDialogContent({ title: <Warning width={FS(40)} height={VP(40)} />, message: `${error?.response?.data?.message}` || errorMessage.commonMessage }));
            } finally {
                setLoading(false);
            }
        } catch (error: any) {
            console.log(error?.message, '---error');
        }
    }

    const handlePhoneUpdate = async () => {
        try {
            setShowTimerMessage(true);

            setError(errorObj);

            const resource = { phone }

            const dataPayloads = await validateResource(updateProfilePhone, setError)(resource);

            if (user?.phoneNo === phone) {
                setEditPhone(false);
                return;
            }

            setLoading(true);

            try {
                const dataPayload = {
                    "phoneNo": phone,
                    "step": "change"
                };

                const response: any = await submitProfilePhone(dataPayload);

                const responseData = { ...response.data };

                showFadeAlert(responseData?.message);

                setEditPhone(false);
                setVerifyPhoneDialogVisible(true);

                setResendStatus(false);
                setTimer(OTP_SEND_WAIT_TIME);
            } catch (error: any) {
                dispatch(setDialogContent({ title: <Warning width={FS(40)} height={VP(40)} />, message: `${error?.response?.data?.message}` || errorMessage.commonMessage }));
            } finally {
                setLoading(false);
            }
        } catch (error: any) {
            console.log(error?.message, '---error');
        }
    }

    const handleEmailUpdate = async () => {
        try {
            setError(errorObj);

            const resource = { email }

            const dataPayloads = await validateResource(updateProfileEmail, setError)(resource);

            if (user?.email === dataPayloads?.email) {
                showFadeAlert(responseMessage.profileEmailUpdate);
                setEditEmail(false);
                return;
            }

            setLoading(true);

            try {
                const dataPayload = {
                    "email": dataPayloads.email,
                    "step": "change"
                };

                const response: any = await submitProfileEmail(dataPayload);

                const responseData = { ...response.data };

                showFadeAlert(responseData?.message);

                setEditEmail(false);
                setVerifyEmailDialogVisible(true);
            } catch (error: any) {
                dispatch(setDialogContent({ title: <Warning width={FS(40)} height={VP(40)} />, message: `${error?.response?.data?.message}` || errorMessage.commonMessage }));
            } finally {
                setLoading(false);
            }
        } catch (error: any) {
            console.log(error?.message, '---error');
        }
    }

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setResendStatus(true);
        }
    }, [timer]);

    return (
        <OuterLayout containerStyle={globalStyle.containerStyle}>
            <NormalLoader visible={loading} />
            <OTPVerifyPhoneDialog
                visible={verifyPhoneDialogVisible}
                onClose={() => setVerifyPhoneDialogVisible(false)}
                phone={phone}
                setLoading={setLoading}
                setShowTimerMessage={setShowTimerMessage}
            />

            <OTPVerifyEmailDialog
                visible={verifyEmailDialogVisible}
                onClose={() => setVerifyEmailDialogVisible(false)}
                email={email}
                setLoading={setLoading}
            />
            <InnerBlock>
                <AccountSkeletonSection
                    navigation={navigation}
                    user={user}
                >
                    <View style={styles.main}>
                        {/* full name */}
                        <View>
                            <Text style={styles.label}>full name</Text>

                            <CustomTextInputNoEffect
                                formProps={{
                                    text: name,
                                    setText: setName,
                                    error: error.name
                                }}
                                placeholder="Enter Full Name"
                                maxLength={100}
                                styleInput={{
                                    ...TextStyles.RALEWAY_SEMI_BOLD,
                                    fontSize: 14,
                                    paddingVertical: HP(8),
                                    color: editName ? COLORS.BLACK : '#5D5959'
                                }}
                                editable={editName}
                                iconClick={true}
                                iconName={editName ? require(`../../../assets/icons/tick.png`) : require(`../../../assets/icons/edit.png`)}
                                iconStyle={styles.iconStyle}
                                iconContainerStyle={{ bottom: HP(30) }}
                                iconAction={() => editName ? handleNameUpdate() : setEditName(true)}
                                errorStyle={styles.errorStyle}
                            />
                        </View>

                        {/* phone number */}
                        <View>
                            <Text style={styles.label}>phone number</Text>

                            <CustomTextInputNoEffect
                                formProps={{
                                    text: phone,
                                    setText: handlePhoneChange,
                                    error: error.phone
                                }}
                                placeholder="Enter Phone Number"
                                maxLength={10}
                                keyboardType='numeric'
                                styleInput={{
                                    ...TextStyles.RALEWAY_SEMI_BOLD,
                                    fontSize: 14,
                                    paddingVertical: HP(8),
                                    color: editPhone ? COLORS.BLACK : '#5D5959'
                                }}
                                prefix={STD_CODE}
                                editable={resendStatus && editPhone ? true : false}
                                iconClick={resendStatus ? true : false}
                                iconName={resendStatus ? editPhone ? require(`../../../assets/icons/tick.png`) : require(`../../../assets/icons/edit.png`) : null}
                                iconStyle={styles.iconStyle}
                                iconContainerStyle={{ bottom: HP(30) }}
                                iconAction={() => editPhone ? handlePhoneUpdate() : setEditPhone(true)}
                                errorStyle={styles.errorStyle}
                            />

                            {((!resendStatus && showTimerMessage) && (
                                <Text style={styles.resendText}>
                                    {`You can update phone number again in ${timer} seconds`}
                                </Text>
                            ))
                            }
                        </View>

                        {/* email */}
                        <View>
                            <Text style={styles.label}>email</Text>

                            <CustomTextInputNoEffect
                                formProps={{
                                    text: email,
                                    setText: handleEmailChange,
                                    error: error.email
                                }}
                                placeholder="Enter Email"
                                maxLength={100}
                                styleInput={{
                                    ...TextStyles.RALEWAY_SEMI_BOLD,
                                    fontSize: 14,
                                    paddingVertical: HP(8),
                                    color: editEmail && user?.user_type === 'app' ? COLORS.BLACK : '#5D5959'
                                }}
                                editable={user?.user_type === 'app' && editEmail ? true : false}
                                iconClick={user?.user_type === 'app' ? true : false}
                                iconName={user?.user_type === 'app' ? editEmail ? require(`../../../assets/icons/tick.png`) : require(`../../../assets/icons/edit.png`) : null}
                                iconStyle={styles.iconStyle}
                                iconContainerStyle={{ bottom: HP(30) }}
                                iconAction={() => editEmail ? handleEmailUpdate() : setEditEmail(true)}
                            />
                        </View>

                        {/* Buttons */}
                        <View style={{ marginTop: VP(30), flexDirection: "row", gap: HP(7) }}>
                            <Button
                                text={'cancel'}
                                onPress={handleOnCancel}
                                textStyle={styles.cancelButtonStyle}
                                isLoading={false}
                                activeButtonText={{ opacity: .65 }}
                                mainContainerStyle={{ flex: 1, borderColor: COLORS.BUTTON, borderWidth: 1, borderRadius: HP(8) }}
                                LinearGradienrColor={["#F5F5F5", "#F5F5F5"]}
                                contentContainerStyle={{ top: -2 }}
                            />

                            {/* <Button
                                text={'save'}
                                onPress={handleOnPress}
                                textStyle={styles.saveButtonStyle}
                                isLoading={loading}
                                activeButtonText={{ opacity: .65 }}
                                mainContainerStyle={{ flex: 1, borderRadius: HP(8) }}
                                LinearGradienrColor={[COLORS.BUTTON, COLORS.BUTTON]}
                                contentContainerStyle={{ top: -2 }}
                            /> */}
                        </View>
                    </View>
                </AccountSkeletonSection>
            </InnerBlock>
        </OuterLayout>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: HP(34),
        paddingVertical: HP(120),
        // paddingVertical: HP(150),
        gap: HP(17.97)
    },
    label: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 12,
        color: "#6C6C70",
        textTransform: "capitalize",
        start: HP(4)
    },
    saveButtonStyle: {
        ...TextStyles.LEXEND_SEMI_BOLD,
        fontSize: 20,
        color: COLORS.WHITE,
        textTransform: "uppercase",
    },
    cancelButtonStyle: {
        ...TextStyles.LEXEND_REGULAR,
        fontSize: 18,
        color: COLORS.BLACK,
        textTransform: "uppercase",
    },
    iconStyle: {
        width: FS(22),
        height: FS(22)
    },
    errorStyle: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 12,
        textTransform: "capitalize",
        lineHeight: 20,
        color: COLORS.RED,
        marginTop: VP(-10)
    },
    resendText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 14,
        color: COLORS.BUTTON,
        textAlign: "center"
    }
});

export default UpdateProfile;