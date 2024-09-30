import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground, Dimensions, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Icon, { Icons } from '../../components/Icons';
import { COLORS } from '../../utils/Constants';
import { FS, HP, VP } from '../../utils/Responsive';
import { TextStyles } from '../../utils/TextStyles';
import AccountSkeleton from '../../components/AccountSkeleton';

const { width, height } = Dimensions.get('window');

function AccountScreen({ navigation }: { navigation: any }): React.JSX.Element {
    const [isPaymentMenuOpen, setIsPaymentMenuOpen] = useState(false);
    const [isSettingMenuOpen, setIsSettingMenuOpen] = useState(false);

    return (
        <View style={{ flex: 1, marginBottom: VP(40), backgroundColor: "#FFF" }}>
            <AccountSkeleton navigation={navigation}>
                <View style={{ paddingHorizontal: HP(39), paddingVertical: HP(120), gap: 15 }}>
                    {/* edit profile */}
                    <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
                        <View style={styles.iconContainer}>
                            <Image source={require(`../../assets/icons/pencil.png`)} style={{ width: FS(16.91), height: VP(16.91) }} />
                        </View>

                        <TouchableOpacity
                            onPress={() => navigation.navigate(`UpdateProfile`)}
                        >
                            <Text style={styles.accountLabel}>edit profile</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.line}></View>

                    {/* order history */}
                    <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
                        <View style={[styles.iconContainer, { backgroundColor: "#FFDBFB" }]}>
                            <Image source={require(`../../assets/icons/order.png`)} style={{ width: FS(21.14), height: VP(24.03) }} />
                        </View>

                        <Text style={styles.accountLabel}>order history</Text>
                    </View>

                    <View style={styles.line}></View>

                    {/* Payment & refunds */}
                    <View>
                        <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
                            <View style={[styles.iconContainer, { backgroundColor: "#CFF4C3" }]}>
                                <Image source={require(`../../assets/icons/dollor.png`)} style={{ width: FS(24), height: VP(24) }} />
                            </View>

                            <TouchableOpacity
                                onPress={() => setIsPaymentMenuOpen((pre) => !pre)}
                                style={{ flex: 1 }}
                            >
                                <Text style={styles.accountLabel}>Payment & refunds</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setIsPaymentMenuOpen((pre) => !pre)}
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
                            <View style={{ marginTop: VP(11), paddingLeft: HP(20), gap: 15 }}>
                                <TouchableOpacity
                                    onPress={() => console.log("Refund Status clicked")}
                                    style={{ flexDirection: "row", gap: 16, alignItems: "center" }}
                                >
                                    <Image source={require(`../../assets/icons/refund.png`)} style={{ width: FS(24), height: VP(24) }} />

                                    <Text style={styles.childMenuItem}>Refund Status</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => console.log("Refund Status clicked")}
                                    style={{ flexDirection: "row", gap: 16, alignItems: "center" }}
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
                        <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
                            <View style={[styles.iconContainer, { backgroundColor: "#E9D4FF" }]}>
                                <Image source={require(`../../assets/icons/setting.png`)} style={{ width: FS(24), height: VP(24) }} />
                            </View>

                            <TouchableOpacity
                                onPress={() => setIsSettingMenuOpen((pre) => !pre)}
                                style={{ flex: 1 }}
                            >
                                <Text style={styles.accountLabel}>settings</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setIsSettingMenuOpen((pre) => !pre)}
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
                            <View style={{ marginTop: VP(11), paddingLeft: HP(20), gap: 15 }}>
                                <TouchableOpacity
                                    onPress={() => console.log("Refund Status clicked")}
                                    style={{ flexDirection: "row", gap: 16, alignItems: "center" }}
                                >
                                    <Image source={require(`../../assets/icons/change-password.png`)} style={{ width: FS(19), height: VP(19) }} />

                                    <Text style={styles.childMenuItem}>change password</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => console.log("Refund Status clicked")}
                                    style={{ flexDirection: "row", gap: 16, alignItems: "center" }}
                                >
                                    <Image source={require(`../../assets/icons/delete.png`)} style={{ width: FS(13), height: VP(16) }} />

                                    <Text style={styles.childMenuItem}>delete account</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    <View style={styles.line}></View>

                    {/* Support / help */}
                    <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
                        <View style={[styles.iconContainer, { backgroundColor: "#DAF8FB" }]}>
                            <Image source={require(`../../assets/icons/support.png`)} style={{ width: FS(24), height: VP(24) }} />
                        </View>

                        <Text style={styles.accountLabel}>support / help</Text>
                    </View>

                    <View style={styles.line}></View>

                    {/* Logout */}
                    <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
                        <View style={[styles.iconContainer, { backgroundColor: "#FDD6D6" }]}>
                            <Image source={require(`../../assets/icons/logout.png`)} style={{ width: FS(24), height: VP(24), padding: 0 }} />
                        </View>

                        <Text style={styles.accountLabel}>logout</Text>
                    </View>

                    <View style={styles.line}></View>

                    {/* Feedback */}
                    <View style={{ flexDirection: "row", gap: 15, alignItems: "center", paddingBottom: HP(100) }}>
                        <View style={[styles.iconContainer, { backgroundColor: "#37360633" }]}>
                            <Image source={require(`../../assets/icons/feedback.png`)} style={{ width: FS(24), height: VP(24) }} />
                        </View>

                        <Text style={styles.accountLabel}>feedback</Text>
                    </View>
                </View>
            </AccountSkeleton>
        </View>
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
    }
});

export default AccountScreen;