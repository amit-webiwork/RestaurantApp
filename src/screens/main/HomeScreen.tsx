import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, ImageBackground, ScrollView, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { FS, HP, VP } from '../../utils/Responsive.ts';
import { loadStorage, saveStorage } from '../../utils/Storage.ts';
import { COLORS } from '../../utils/Constants.ts';
import { TextStyles } from '../../utils/TextStyles.ts';
import { Button } from '../../components/Button.tsx';
import Right from '../../assets/svgs/right.svg';
import { submitLogin } from '../../utils/ApiCall.ts';
import CustomTextInput from '../../components/CustomTextInput.tsx';
import { SearchBox } from '../../components/home-components/SearchBox.tsx';
import { CategoryBox } from '../../components/home-components/CategoryBox.tsx';
import { PromotionalBox } from '../../components/home-components/PromotionalBox.tsx';

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
                            <View style={{ flexDirection: "row", flex: 2, }}>
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

                            <View style={[styles.itemContainer]}>
                                <View style={{ flex: 1, marginVertical: VP(48), marginHorizontal: HP(20), }}>

                                    <SearchBox />

                                    <View style={{ marginTop: VP(27) }}>
                                        <CategoryBox />
                                    </View>

                                    <View style={{ marginTop: VP(23) }}>
                                        <PromotionalBox />
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>

                    {/* Bottom Bar */}
                    <View style={{
                        bottom: 0,
                        height: VP(79),
                        position: "absolute",
                        backgroundColor: "#FFFFFF",
                        flex: 1,
                        shadowColor: "#D9D9D9",
                        shadowOffset: {
                            width: -2,
                            height: 4,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                        elevation: 20,
                    }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            margin: "auto",
                            padding: "auto",
                            paddingHorizontal: 16,
                            // paddingVertical: 12, 
                            alignItems: "center",
                            // paddingTop: 40,
                            // paddingBottom: 40
                        }}>
                            <Image source={require(`../../assets/icons/shopping-bag.png`)} style={{ width: FS(30), height: VP(30) }} />

                            <Image source={require(`../../assets/icons/heart.png`)} style={{ width: FS(30), height: VP(30) }} />

                            <View style={{ backgroundColor: COLORS.HOME_ICONS, width: FS(65), height: FS(65), borderRadius: FS(32), alignItems: "center", justifyContent: "center", top: VP(-30) }}>
                                <Image source={require(`../../assets/icons/home.png`)} style={{ width: FS(31), height: VP(31) }} />
                            </View>


                            <Image source={require(`../../assets/icons/bell.png`)} style={{ width: FS(35), height: VP(30) }} />

                            <Image source={require(`../../assets/icons/user.png`)} style={{ width: FS(30), height: VP(30) }} />
                        </View>
                    </View>
                </LinearGradient >
            </View >
        </>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 3,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 0,
        backgroundColor: "#FDFDFD",
        top: VP(-90)
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
});

export default HomeScreen;