import React, { memo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Dimensions, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Icon, { Icons } from '../components/Icons';
import { APP_VERSION, COLORS } from '../utils/Constants';
import { FS, HP, VP } from '../utils/Responsive';
import { TextStyles } from '../utils/TextStyles';
import ProfileImageContainer from './account/ProfileImageContainer';
import OuterLayout from './OuterLayout';
import { globalStyle } from '../utils/GlobalStyle';
import InnerBlock from './InnerBlock';

const { width, height } = Dimensions.get('window');

function AccountSkeleton({ user, children, navigation }: { user: any; children: any, navigation: any }): React.JSX.Element {
    return (
        <>
            <OuterLayout containerStyle={globalStyle.containerStyle}>
                <InnerBlock>
                    <LinearGradient
                        colors={['#EC04D0', '#6A29C9', '#6A29C9']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1.5, y: 1 }}
                        style={{ flex: 1 }}
                    >
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* Top container */}
                            <View style={{ marginTop: VP(25), flex: 1 }}>
                                {/* Top Navigation */}
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingHorizontal: HP(18)
                                }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.goBack()}
                                        style={
                                            [globalStyle.navigationIconBox,
                                            { backgroundColor: "#00000080" }
                                            ]
                                        }
                                    >
                                        <Icon
                                            type={Icons.Feather}
                                            size={FS(18)}
                                            name={`chevron-left`}
                                            color={COLORS.WHITE}
                                        />
                                    </TouchableOpacity>
                                    {/* <Text style={styles.topHeading}>0.0.2</Text> */}
                                </View>

                                <View style={{ marginTop: VP(6), alignItems: "center" }}>
                                    <ProfileImageContainer profile={user} />

                                    <View style={{ marginTop: VP(1.15), alignItems: "center" }}>
                                        <Text style={{ ...TextStyles.RALEWAY_BOLD, fontSize: 24, color: COLORS.WHITE, textTransform: "capitalize" }}>{user?.name || ""}</Text>

                                        <Text style={{ ...TextStyles.INTER_MEDIUM, fontSize: 16, color: COLORS.WHITE, marginTop: VP(4) }}>{user?.phoneNo || ""}</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Bottom container */}
                            <View style={{ flex: 1 }}>
                                <ImageBackground
                                    source={require(`../assets/images/white-bg.png`)}
                                    style={[styles.bg]}
                                    resizeMode='stretch'
                                >
                                    {children}
                                </ImageBackground>

                                <Text style={styles.bottomHeading}>App version {APP_VERSION}</Text>
                            </View>
                        </ScrollView>
                    </LinearGradient>
                </InnerBlock>
            </OuterLayout>
        </>
    )
}

const styles = StyleSheet.create({
    bg: {
        width: "100%",
        height: height * 1,
        marginBottom: VP(-40),
        flex: 1
    },
    topHeading: {
        ...TextStyles.LEXEND_SEMI_BOLD,
        color: COLORS.WHITE,
        fontSize: 16,
        textAlign: "right",
        flex: 1,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
    },
    bottomHeading: {
        ...TextStyles.LEXEND_REGULAR,
        fontSize: 16,
        textAlign: "center",
        flex: 1,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
    }
});

const AccountSkeletonSection = memo(AccountSkeleton);
export default AccountSkeletonSection;