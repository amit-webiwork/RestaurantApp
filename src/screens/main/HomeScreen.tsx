import React from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { FS, HP, VP } from '../../utils/Responsive.ts';
import { COLORS } from '../../utils/Constants.ts';
import { TextStyles } from '../../utils/TextStyles.ts';
import { Button } from '../../components/Button.tsx';
import { SearchBox } from '../../components/home-components/SearchBox.tsx';
import { CategoryBox } from '../../components/home-components/CategoryBox.tsx';
import { PromotionalBox } from '../../components/home-components/PromotionalBox.tsx';
import { CategortyTabs } from '../../components/home-components/CategortyTabs.tsx';
import { ItemBox } from '../../components/home-components/ItemBox.tsx';
import { BannerOne } from '../../components/home-components/BannerOne.tsx';
import { FeatureCategoryBox } from '../../components/home-components/FeatureCategoryBox.tsx';
import { BannerTwo } from '../../components/home-components/BannerTwo.tsx';
import { ItemVerticalBox } from '../../components/home-components/ItemVerticalBox.tsx';
import Icon, { Icons } from '../../components/Icons';

function HomeScreen({ navigation }: { navigation: any }): React.JSX.Element {
    return (
        <>
            <View style={{ flex: 1 }}>
                <LinearGradient
                    colors={['#24112F', '#EB05D0', '#403966']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", }}
                >
                    <View style={{ flex: 1 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* Top banner area */}
                            <View style={{ flexDirection: "row", flex: 1, }}>
                                <TouchableOpacity
                                    onPress={() => void (0)}
                                    style={{ position: "absolute", marginVertical: HP(20), right: HP(20) }}
                                >
                                    <Icon type={Icons.Feather} size={18} name={`bell`} color={COLORS.WHITE} />
                                </TouchableOpacity>
                                <View style={{ flexBasis: "35%", gap: HP(13) }}>
                                    <View style={{ left: HP(17), marginTop: VP(30) }}>
                                        <Text style={{ ...TextStyles.ARCHITECTS_DAUGHTER_REGULAR, color: COLORS.WHITE, fontSize: 30, }}>
                                            not your
                                            average
                                            bubble
                                            tea.
                                        </Text>
                                    </View>
                                    <View style={{ left: HP(17), marginTop: VP(13) }}>
                                        <Button
                                            text={'BUY NOW >'}
                                            onPress={() => void (0)}
                                            textStyle={styles.buttonStyle}
                                            activeButtonText={{ opacity: .65 }}
                                            mainContainerStyle={{ borderRadius: FS(16) }}
                                            LinearGradienrColor={["#FFFFFF", "#FFFFFF"]}
                                            contentContainerStyle={{ top: -2 }}
                                            style={{ width: FS(104), height: FS(30) }}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexBasis: "65%", marginVertical: VP(50) }}>
                                    <Image source={require('../../assets/images/bubble-tea-boba-milk-tea.png')} style={styles.icon} />
                                </View>
                            </View>

                            {/* Under bottom area */}
                            <View style={[styles.itemContainer]}>
                                <View style={{ flex: 1, marginVertical: VP(48), }}>

                                    <View style={{ marginHorizontal: HP(20) }}>
                                        <SearchBox />
                                    </View>

                                    <View style={{ marginTop: VP(27), marginHorizontal: HP(17) }}>
                                        <CategoryBox />
                                    </View>

                                    <View style={{ marginTop: VP(23), marginHorizontal: HP(21) }}>
                                        <PromotionalBox />
                                    </View>

                                    <View style={{ flexDirection: "row", marginTop: VP(37), gap: 10, alignItems: "center", marginHorizontal: HP(21) }}>
                                        <Text style={{ ...TextStyles.RALEWAY_SEMI_BOLD, fontSize: 14 }}>MENU</Text>

                                        <LinearGradient
                                            colors={['#B20C79', '#E2E2E2']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={styles.line}
                                        >
                                        </LinearGradient>
                                    </View>

                                    <View style={{ marginTop: VP(24.66), marginHorizontal: HP(21) }}>
                                        <CategortyTabs />
                                    </View>

                                    <View style={{ marginTop: VP(20), marginHorizontal: HP(21) }}>
                                        <ItemBox />
                                    </View>

                                    <View style={{ marginTop: VP(31.66), marginHorizontal: HP(16) }}>
                                        <BannerOne />
                                    </View>

                                    <View style={{ flexDirection: "row", marginTop: VP(32.87), gap: 10, alignItems: "center", marginHorizontal: HP(21) }}>
                                        <Text style={{ ...TextStyles.RALEWAY_SEMI_BOLD, fontSize: 14, textTransform: "uppercase" }}>Kylie, what’s on your mind?</Text>

                                        <LinearGradient
                                            colors={['#B20C79', '#E2E2E2']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={styles.line}
                                        >
                                        </LinearGradient>
                                    </View>

                                    <View style={{ marginTop: VP(20), marginHorizontal: HP(16) }}>
                                        <FeatureCategoryBox />
                                    </View>

                                    <View style={{ marginTop: VP(20) }}>
                                        <BannerTwo />
                                    </View>

                                    <View style={{ flexDirection: "row", marginTop: VP(32.87), gap: 10, alignItems: "center", marginHorizontal: HP(20) }}>
                                        <Text style={{ ...TextStyles.RALEWAY_SEMI_BOLD, fontSize: 16, textTransform: "capitalize" }}>"Sip and savor 50+ drinks and desserts"</Text>

                                        <LinearGradient
                                            colors={['#B20C79', '#E2E2E2']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={styles.line}
                                        >
                                        </LinearGradient>
                                    </View>

                                    <View style={{ marginTop: VP(22), marginHorizontal: HP(11) }}>
                                        <ItemVerticalBox />
                                    </View>

                                    <View style={{ marginTop: VP(53) }}>
                                        <Text style={{ ...TextStyles.POPPINS_BOLD, fontSize: 40, color: "#898989", lineHeight: HP(47), textAlign: "center" }}>"Indulge your cravings."</Text>
                                    </View>
                                </View>
                                <View style={{ height: VP(30), backgroundColor: "#FDFDFD", bottom: VP(-30) }}>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </LinearGradient >
            </View >
        </>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 2,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 0,
        backgroundColor: "#FDFDFD",
        top: VP(-100)
    },
    icon: {
        // width: FS(260.97),
        // height: VP(284.76),
        width: FS(300.97),
        height: VP(294.76),
        resizeMode: "contain",
        zIndex: 1,
    },
    buttonStyle: {
        ...TextStyles.LEXEND_REGULAR,
        textTransform: "uppercase",
    },
    line: {
        height: 1,
        width: "100%",
        flex: 1,
        flexGrow: 1
    },
});

export default HomeScreen;