import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground, Dimensions, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Icon, { Icons } from '../../../components/Icons';
import { COLORS } from '../../../utils/Constants';
import { FS, HP, VP } from '../../../utils/Responsive';
import { TextStyles } from '../../../utils/TextStyles';
import AccountSkeleton from '../../../components/AccountSkeleton';
import CustomTextInputNoEffect from '../../../components/CustomTextInputNoEffect';
import { Button } from '../../../components/Button';

const { width, height } = Dimensions.get('window');

function UpdateProfile({ navigation }: { navigation: any }): React.JSX.Element {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState({ "name": { "error": false, "text": "" }, "phone": { "error": false, "text": "" }, "email": { "error": false, "text": "" } });

    const handleOnPress = () => {
        navigation.goBack();
    }

    return (
        <AccountSkeleton navigation={navigation}>
            <View style={{ paddingHorizontal: HP(34), paddingVertical: HP(150), gap: 17.97 }}>
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
                        maxLength={100}
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
                <View style={{ marginTop: VP(30), flexDirection: "row", gap: 7 }}>
                    <Button
                        text={'cancel'}
                        onPress={handleOnPress}
                        textStyle={styles.cacnelButtonStyle}
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
                        isLoading={false}
                        activeButtonText={{ opacity: .65 }}
                        mainContainerStyle={{ flex: 1, borderRadius: HP(8) }}
                        LinearGradienrColor={[COLORS.BUTTON, COLORS.BUTTON]}
                        contentContainerStyle={{ top: -2 }}
                    />
                </View>
            </View>
        </AccountSkeleton>
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
    cacnelButtonStyle: {
        ...TextStyles.LEXEND_REGULAR,
        fontSize: 18,
        color: COLORS.BLACK,
        textTransform: "uppercase",
    },
});

export default UpdateProfile;