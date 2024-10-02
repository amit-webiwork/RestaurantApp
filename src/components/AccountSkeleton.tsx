import React, { memo, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground, Dimensions, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Icon, { Icons } from '../components/Icons';
import { COLORS } from '../utils/Constants';
import { FS, HP, VP } from '../utils/Responsive';
import { TextStyles } from '../utils/TextStyles';

const { width, height } = Dimensions.get('window');

function AccountSkeleton({ children, navigation }: { children: any, navigation: any }): React.JSX.Element {
    return (
        <>
            <LinearGradient
                colors={['#EC04D0', '#6A29C9', '#6A29C9']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1.5, y: 1 }}
                style={{ flex: 1 }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Top container */}
                    <View style={{ marginTop: VP(25), flex: 1 }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ marginHorizontal: HP(18) }}
                        >
                            <Icon type={Icons.Feather} size={18} name={`chevron-left`} color={COLORS.WHITE} />
                        </TouchableOpacity>

                        <View style={{ marginTop: VP(6), alignItems: "center" }}>
                            <Image source={require(`../assets/images/account.png`)} style={[styles.img]} />

                            <TouchableOpacity
                                onPress={() => void (0)}
                                style={{
                                    backgroundColor: "#FFFFFF",
                                    width: FS(25.33),
                                    height: FS(25.33),
                                    borderRadius: FS(25.33) / 2,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    top: FS(85),
                                    right: FS(120),
                                    position: "absolute"
                                }}
                            >
                                <Image source={require(`../assets/icons/pencil.png`)} style={{ width: FS(12.68), height: VP(11.98) }} />
                            </TouchableOpacity>


                            <View style={{ marginTop: VP(1.15), alignItems: "center" }}>
                                <Text style={{ ...TextStyles.RALEWAY_BOLD, fontSize: 24, color: COLORS.WHITE, textTransform: "capitalize" }}>herry</Text>

                                <Text style={{ ...TextStyles.INTER_MEDIUM, fontSize: 16, color: COLORS.WHITE, marginTop: VP(4) }}>4455466422</Text>
                            </View>
                        </View>
                    </View>

                    {/* Bottom container */}
                    <View style={{ flex: 1 }}>
                        <ImageBackground source={require(`../assets/images/white-bg.png`)} style={[styles.bg]} resizeMode='stretch'>
                            {children}
                        </ImageBackground>
                    </View>
                </ScrollView>
            </LinearGradient>
        </>
    )
}

const styles = StyleSheet.create({
    img: {
        resizeMode: "cover",
        width: FS(115.47),
        height: FS(118.49),
        borderRadius: FS(115.47) / 2
    },
    bg: {
        width: "100%",
        height: height * 1,
        marginBottom: VP(-40),
        flex: 1
    }
});

const AccountSkeletonSection = memo(AccountSkeleton);
export default AccountSkeletonSection;