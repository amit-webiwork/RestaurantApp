import React, { memo, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';

import { TextStyles } from '../../utils/TextStyles';
import { FS, HP, VP } from '../../utils/Responsive';
import { ButtonSection as Button } from '../Button';
import { COLORS, errorMessage, pinCheck, responseMessage } from '../../utils/Constants';
import Icon, { Icons } from '../Icons';
import OTPInput from '../OTPInput';
import { AppDispatch } from '../../redux/store';
import { setDialogContent } from '../../redux/features/customDialog';
import Warning from '../../assets/svgs/warning.svg';
import { submitProfileEmail } from '../../utils/ApiCall';
import { loadStorage, saveStorage } from '../../utils/Storage';
import { setProflieDetails } from '../../redux/features/profile';
import { showFadeAlert } from '../../utils/Alert';

interface Props {
    visible: boolean;
    onClose: () => void;
    email: string;
    setLoading: (arg: boolean) => void;
}

const { width, height } = Dimensions.get('window');

const OTPVerifyEmailDialog = ({ visible, onClose, email, setLoading }: Props) => {
    const dispatch: AppDispatch = useDispatch();

    const [value, setValue] = useState('');
    const [error, setError] = useState({ status: false, text: "" });

    const handleOnPress = async () => {
        try {
            const otp = value.trim();

            if (pinCheck.test(otp) == false) {
                throw new Error(errorMessage.otp);
            }

            setError({ status: false, text: "" });

            setLoading(true);

            try {
                const dataPayload = {
                    otp: +otp,
                    email: email,
                    step: "verify"
                };

                const response: any = await submitProfileEmail(dataPayload);

                const responseData = { ...response.data };

                const userDetails = await loadStorage('userDetails');

                userDetails['user']['email'] = responseData?.email || "";

                saveStorage(userDetails, "userDetails");

                dispatch(setProflieDetails(userDetails));

                showFadeAlert(responseMessage.profileEmailUpdate);

                setValue('');

                onClose();
            } catch (error: any) {
                dispatch(setDialogContent({ title: <Warning width={FS(40)} height={VP(40)} />, message: `${error?.response?.data?.message}` || errorMessage.commonMessage }));
            } finally {
                setLoading(false);
            }
        } catch (err: any) {
            setError({ status: true, text: err.message });
        }
    }

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.dialogContainer}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ marginTop: VP(36) }}>
                            <Text style={styles.helperText}>
                                please enter the 4 digit code sent to <Text style={{ fontWeight: "bold" }}>
                                    {`${email}`}
                                </Text>
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={onClose}
                            style={{
                                width: FS(28),
                                height: VP(28),
                                borderWidth: 1,
                                borderRadius: HP(9.65),
                                justifyContent: "center",
                                alignItems: "center",
                                borderColor: "#EDEDED"
                            }}
                        >
                            <Icon
                                type={Icons.Feather}
                                size={22.11}
                                name={'x'}
                                color={COLORS.BLACK}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: VP(56) }}>
                        <OTPInput formProps={{ value, setValue, error }} />
                    </View>

                    <View style={styles.dialogButtons}>
                        <Button
                            text={`verify`}
                            onPress={handleOnPress}
                            textStyle={styles.buttonStyle2}
                            isLoading={false}
                            activeButtonText={{ opacity: .65 }}
                            mainContainerStyle={{ flex: 1, borderColor: "#ACACAC", borderWidth: 1, borderRadius: HP(51) }}
                            LinearGradienrColor={["#F5F5F5", "#F5F5F5"]}
                            contentContainerStyle={{ top: -2 }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

// Styles for the dialog box
const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialogContainer: {
        width: width * .9,
        backgroundColor: 'white',
        borderRadius: HP(14.47),
        padding: HP(20),
        alignItems: 'center',
        flexDirection: "column",
    },
    dialogButtons: {
        marginTop: VP(10),
        flexDirection: "row",
        gap: HP(5)
    },
    buttonStyle1: {
        ...TextStyles.RALEWAY_BOLD,
        fontSize: 16,
        color: COLORS.WHITE
    },
    buttonStyle2: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 16,
        color: "#303030"
    },
    helperText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 14,
        textTransform: "capitalize",
        textAlign: "center",
        width: FS(290),
        lineHeight: VP(22)
    }
});

const OTPVerifyEmailDialogComp = memo(OTPVerifyEmailDialog);
export default OTPVerifyEmailDialogComp;