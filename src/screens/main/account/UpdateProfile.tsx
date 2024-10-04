import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground, Dimensions, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Icon, { Icons } from '../../../components/Icons';
import { apiEndpoints, BACKEND_URL, COLORS, errorMessage } from '../../../utils/Constants';
import { FS, HP, VP } from '../../../utils/Responsive';
import { TextStyles } from '../../../utils/TextStyles';
import AccountSkeletonSection from '../../../components/AccountSkeleton';
import CustomTextInputNoEffect from '../../../components/CustomTextInputNoEffect';
import { ButtonSection as Button } from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { proflieDetails, setProflieDetails } from '../../../redux/features/profile';
import { updateProfile, validateResource } from '../../../utils/ValidateResource';
import axios, { AxiosResponse } from 'axios';
import { loadStorage, saveStorage } from '../../../utils/Storage';
import { setDialogContent } from '../../../redux/features/customDialog';
import Warning from '../../../assets/svgs/warning.svg';
import OuterLayout from '../../../components/OuterLayout';
import { globalStyle } from '../../../utils/GlobalStyle';
import InnerBlock from '../../../components/InnerBlock';

const { width, height } = Dimensions.get('window');

const errorObj = { "name": { "error": false, "text": "" }, "phone": { "error": false, "text": "" }, "email": { "error": false, "text": "" } }

function UpdateProfile({ navigation }: { navigation: any }): React.JSX.Element {
    const dispatch = useDispatch();

    const ProflieDetails = useSelector(proflieDetails);

    const { token, user } = ProflieDetails;

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(errorObj);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setName(user?.name || "")
        setPhone(user?.phoneNo || "")
        setEmail(user?.email || "")
    }, [user])

    const handleOnCancel = () => {
        navigation.goBack();
    }

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

    return (
        <OuterLayout containerStyle={globalStyle.containerStyle}>
            <InnerBlock>
                <AccountSkeletonSection navigation={navigation} user={user}>
                    <View style={{ flex: 1, paddingHorizontal: HP(34), paddingVertical: HP(150), gap: HP(17.97) }}>
                        <View style={{}}>
                            <Text style={styles.label}>full name</Text>

                            <CustomTextInputNoEffect
                                formProps={{ text: name, setText: setName, error: error.name }}
                                placeholder="Enter Full Name"
                                maxLength={100}
                                styleInput={{ ...TextStyles.RALEWAY_SEMI_BOLD, fontSize: 14, paddingVertical: HP(8) }}
                            />
                        </View>

                        <View style={{}}>
                            <Text style={styles.label}>phone number</Text>

                            <CustomTextInputNoEffect
                                formProps={{ text: phone, setText: setPhone, error: error.phone }}
                                placeholder="Enter Phone Number"
                                maxLength={20}
                                keyboardType='numeric'
                                styleInput={{ ...TextStyles.RALEWAY_SEMI_BOLD, fontSize: 14, paddingVertical: HP(8) }}
                            />
                        </View>

                        <View style={{}}>
                            <Text style={styles.label}>email</Text>

                            <CustomTextInputNoEffect
                                formProps={{ text: email, setText: setEmail, error: error.email }}
                                placeholder="Enter Email"
                                maxLength={100}
                                styleInput={{ ...TextStyles.RALEWAY_SEMI_BOLD, fontSize: 14, paddingVertical: HP(8) }}
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

                            <Button
                                text={'save'}
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
                </AccountSkeletonSection>
            </InnerBlock>
        </OuterLayout>
    )
}

const styles = StyleSheet.create({
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
});

export default UpdateProfile;