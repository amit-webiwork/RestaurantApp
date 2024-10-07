import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Icon, { Icons } from '../../components/Icons';
import { COLORS, errorMessage } from '../../utils/Constants';
import { FS, HP, VP } from '../../utils/Responsive';
import { TextStyles } from '../../utils/TextStyles';
import CustomActionDialogComp from '../../components/dialogs/CustomActionDialog';
import { setDialogContent } from '../../redux/features/customDialog';
import Warning from '../../assets/svgs/warning.svg';
import AccountSkeletonSection from '../../components/AccountSkeleton';
import { removeStorage } from '../../utils/Storage';
import { proflieDetails, setProflieDetails } from '../../redux/features/profile';
import { deleteAccount } from '../../utils/ApiCall';
import LottieLoader from '../../components/LottieLoader';

const titleDelete = `Confirm Delete`;
const messageDelete = `Are you sure you want to delete this account?`;

const titleLogout = `Confirm Logout`;
const messageLogout = `Are you sure you want to logout from this device?`;

function AccountScreen({ navigation }: { navigation: any }): React.JSX.Element {
    const dispatch = useDispatch();

    const ProflieDetails = useSelector(proflieDetails);

    const { token, user } = ProflieDetails;

    const [isPaymentMenuOpen, setIsPaymentMenuOpen] = useState(false);
    const [isSettingMenuOpen, setIsSettingMenuOpen] = useState(false);

    const [accountDeleteDialogVisible, setAccountDeleteDialogVisible] = useState(false);
    const [accountLogoutDialogVisible, setAccountLogoutDialogVisible] = useState(false);

    const [loader, setLoader] = useState(false);

    const deleteAccountAction = () => {
        setAccountDeleteDialogVisible(true)
    }

    const logoutAccountAction = () => {
        setAccountLogoutDialogVisible(true)
    }

    const logoutAccountClickAction = async () => {
        await removeStorage('userDetails');
        dispatch(setProflieDetails({}));

        setAccountLogoutDialogVisible(false);

        navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'AuthStackNavigator',
                },
            ],
        });
    }

    const deleteAccountClickAction = async () => {
        try {
            setLoader(true);
            const response = await deleteAccount();
            setAccountDeleteDialogVisible(false);
            setLoader(false);
            await logoutAccountClickAction();
        } catch (error: any) {
            setLoader(false);
            setAccountDeleteDialogVisible(false);

            dispatch(setDialogContent({ title: <Warning width={FS(40)} height={VP(40)} />, message: `${error?.response?.data?.message}` || errorMessage.commonMessage }));
        }
    }

    return (
        <>
            <LottieLoader visible={loader} />
            <CustomActionDialogComp
                visible={accountDeleteDialogVisible}
                title={titleDelete}
                message={messageDelete}
                onClose={() => setAccountDeleteDialogVisible(false)}
                onAction={deleteAccountClickAction}
                dialogTitleStyle={styles.dialogTitleStyle}
                dialogMessageStyle={styles.dialogMessageStyle}
                buttonAction={true}
                buttonText1={`No, I won’t`}
                buttonText2='Yes, Of course'
            />
            <CustomActionDialogComp
                visible={accountLogoutDialogVisible}
                title={titleLogout}
                message={messageLogout}
                onClose={() => setAccountLogoutDialogVisible(false)}
                onAction={logoutAccountClickAction}
                dialogTitleStyle={styles.dialogTitleStyle}
                dialogMessageStyle={styles.dialogMessageStyle}
                buttonAction={true}
                buttonText1={`No, I won’t`}
                buttonText2='Yes, Of course'
            />
            <View style={{ flex: 1, paddingBottom: VP(80), backgroundColor: "#FFF" }}>
                <AccountSkeletonSection navigation={navigation} user={user}>
                    <View style={{ paddingHorizontal: HP(39), paddingVertical: HP(120), gap: HP(15) }}>
                        {/* edit profile */}
                        <View style={{ flexDirection: "row", gap: HP(15), alignItems: "center" }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate(`UpdateProfile`)}
                                style={styles.iconContainer}
                            >
                                <Image source={require(`../../assets/icons/pencil.png`)} style={{ width: FS(16.91), height: FS(16.91) }} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate(`UpdateProfile`)}
                            >
                                <Text style={styles.accountLabel}>edit profile</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.line}></View>

                        {/* order history */}
                        <View style={{ flexDirection: "row", gap: HP(15), alignItems: "center" }}>
                            <View style={[styles.iconContainer, { backgroundColor: "#FFDBFB" }]}>
                                <Image source={require(`../../assets/icons/order.png`)} style={{ width: FS(21.14), height: FS(24.03) }} />
                            </View>

                            <Text style={styles.accountLabel}>order history</Text>
                        </View>

                        <View style={styles.line}></View>

                        {/* Payment & refunds */}
                        <View>
                            <View style={{ flexDirection: "row", gap: HP(15), alignItems: "center" }}>
                                <TouchableOpacity
                                    onPress={() => { setIsPaymentMenuOpen((pre) => !pre); setIsSettingMenuOpen(false) }}
                                    style={[styles.iconContainer, { backgroundColor: "#CFF4C3" }]}
                                >
                                    <Image source={require(`../../assets/icons/dollor.png`)} style={{ width: FS(24), height: FS(24) }} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => { setIsPaymentMenuOpen((pre) => !pre); setIsSettingMenuOpen(false) }}
                                    style={{ flex: 1 }}
                                >
                                    <Text style={styles.accountLabel}>Payment & refunds</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => { setIsPaymentMenuOpen((pre) => !pre); setIsSettingMenuOpen(false) }}
                                >
                                    <Icon
                                        type={Icons.Feather}
                                        size={18}
                                        name={isPaymentMenuOpen ? 'chevron-down' : 'chevron-up'}
                                        color={COLORS.BLACK} />
                                </TouchableOpacity>
                            </View>
                            {/* Conditional Child Menu */}
                            {isPaymentMenuOpen && (
                                <View style={{ marginTop: VP(11), paddingLeft: HP(20), gap: HP(15) }}>
                                    <TouchableOpacity
                                        onPress={() => console.log("Refund Status clicked")}
                                        style={{ flexDirection: "row", gap: HP(16), alignItems: "center" }}
                                    >
                                        <Image source={require(`../../assets/icons/refund.png`)} style={{ width: FS(24), height: VP(24) }} />

                                        <Text style={styles.childMenuItem}>Refund Status</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => console.log("Refund Status clicked")}
                                        style={{ flexDirection: "row", gap: HP(16), alignItems: "center" }}
                                    >
                                        <Image source={require(`../../assets/icons/payment.png`)} style={{ width: FS(24), height: VP(24) }} />

                                        <Text style={styles.childMenuItem}>payment modes</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>


                        <View style={styles.line}></View>

                        {/* Settings */}
                        <View>
                            <View style={{ flexDirection: "row", gap: HP(15), alignItems: "center" }}>
                                <TouchableOpacity
                                    onPress={() => { setIsSettingMenuOpen((pre) => !pre); setIsPaymentMenuOpen(false) }}
                                    style={[styles.iconContainer, { backgroundColor: "#E9D4FF" }]}
                                >
                                    <Image source={require(`../../assets/icons/setting.png`)} style={{ width: FS(24), height: FS(24) }} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => { setIsSettingMenuOpen((pre) => !pre); setIsPaymentMenuOpen(false) }}
                                    style={{ flex: 1 }}
                                >
                                    <Text style={styles.accountLabel}>settings</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => { setIsSettingMenuOpen((pre) => !pre); setIsPaymentMenuOpen(false) }}
                                >
                                    <Icon
                                        type={Icons.Feather}
                                        size={18}
                                        name={isSettingMenuOpen ? 'chevron-down' : 'chevron-up'}
                                        color={COLORS.BLACK} />
                                </TouchableOpacity>
                            </View>
                            {/* Conditional Child Menu */}
                            {isSettingMenuOpen && (
                                <View style={{ marginTop: VP(11), paddingLeft: HP(20), gap: HP(15) }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate(`ChangePassword`)}
                                        style={{ flexDirection: "row", gap: HP(16), alignItems: "center" }}
                                    >
                                        <Image source={require(`../../assets/icons/change-password.png`)} style={{ width: FS(19), height: FS(19) }} />

                                        <Text style={styles.childMenuItem}>change password</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={deleteAccountAction}
                                        style={{ flexDirection: "row", gap: HP(16), alignItems: "center", start: HP(6) }}
                                    >
                                        <Image source={require(`../../assets/icons/delete.png`)} style={{ width: FS(13), height: FS(16) }} />

                                        <Text style={styles.childMenuItem}>delete account</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>

                        <View style={styles.line}></View>

                        {/* Support / help */}
                        <View style={{ flexDirection: "row", gap: HP(15), alignItems: "center" }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate(`Support`)}
                                style={[styles.iconContainer, { backgroundColor: "#DAF8FB" }]}
                            >
                                <Image source={require(`../../assets/icons/support.png`)} style={{ width: FS(24), height: FS(24) }} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate(`Support`)}
                            >
                                <Text style={styles.accountLabel}>support / help</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.line}></View>

                        {/* Logout */}
                        <TouchableOpacity
                            onPress={logoutAccountAction}
                            style={{ flexDirection: "row", gap: HP(15), alignItems: "center" }}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: "#FDD6D6" }]}>
                                <Image source={require(`../../assets/icons/logout.png`)} style={{ width: FS(24), height: FS(24), padding: 0 }} />
                            </View>

                            <Text style={styles.accountLabel}>logout</Text>
                        </TouchableOpacity>

                        <View style={styles.line}></View>

                        {/* Feedback */}
                        <View style={{ flexDirection: "row", gap: HP(15), alignItems: "center", paddingBottom: HP(100) }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate(`Feedback`)}
                                style={[styles.iconContainer, { backgroundColor: "#37360633" }]}
                            >
                                <Image source={require(`../../assets/icons/feedback.png`)} style={{ width: FS(24), height: VP(24) }} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate(`Feedback`)}
                            >
                                <Text style={styles.accountLabel}>feedback</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </AccountSkeletonSection>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    iconContainer: {
        backgroundColor: "#FFECC3",
        width: FS(39),
        height: FS(39),
        borderRadius: FS(39) / 2,
        justifyContent: "center",
        alignItems: "center"
    },
    accountLabel: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        textTransform: "capitalize",
        fontSize: 18
    },
    line: {
        height: 1,
        backgroundColor: "#EDEDED"
    },
    childMenuItem: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 14,
        textTransform: "capitalize"
    },
    dialogTitleStyle: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 22.94,
        lineHeight: 38.6,
        color: "#101010"
    },
    dialogMessageStyle: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 16.88,
        lineHeight: 24.1,
        color: "#878787"
    }
});

export default AccountScreen;