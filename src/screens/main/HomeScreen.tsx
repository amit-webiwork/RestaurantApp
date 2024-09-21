import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, ImageBackground, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { FS, HP, VP } from '../../utils/Responsive.ts';
import { loadStorage, saveStorage } from '../../utils/Storage.ts';
import { COLORS } from '../../utils/Constants.ts';
import { TextStyles } from '../../utils/TextStyles.ts';
import { Button } from '../../components/Button.tsx';
import Right from '../../assets/svgs/right.svg';
import { submitLogin } from '../../utils/ApiCall.ts';

function HomeScreen({ navigation }: { navigation: any }): React.JSX.Element {
    const [showButton, setShowButton] = useState(false);

    const getStarted = async () => {
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'SignUpScreen',
                },
            ],
        });
    }

    return (
        <>
            <LinearGradient
                colors={['#24112F', '#403966']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", }}
            >
                <View style={{
                    marginTop: VP(14),
                    flex: 2
                }}>
                    <Image source={require('../../assets/images/cup-iced-tea-with-straw-it.png')} style={styles.icon} />
                </View>

                <View style={styles.parent}>
                    <ImageBackground source={require('../../assets/images/splash-bottom.png')} style={styles.bottomImg}>
                        <View style={{ alignSelf: "flex-start", paddingHorizontal: HP(37), paddingTop: VP(40), }}>
                            <Text style={styles.headingText}>AMIT</Text>
                            <Text style={{ ...styles.headingText, fontSize: FS(38) }}>drink you love</Text>
                            <Text style={{ ...TextStyles.RALEWAY_SEMI_BOLD, color: COLORS.WHITE, fontSize: FS(16), textTransform: "capitalize", marginTop: VP(13) }}>boost your energy</Text>
                        </View>

                        {showButton && (
                            <View style={{ justifyContent: "center", paddingHorizontal: HP(37) }}>
                                <Button
                                    text={'Home'}
                                    onPress={() => getStarted()}
                                    textStyle={styles.buttonStyle}
                                    isLoading={false}
                                    activeButtonText={{ opacity: .65 }}
                                    contentContainerStyle={{}}
                                    mainContainerStyle={{ top: VP(28) }}
                                    LinearGradienrColor={["#CC9AFF", "#CC9AFF"]}
                                    Icon={<View style={{ padding: 9.2, backgroundColor: "#FFFFFF", right: HP(30), borderRadius: 32, alignSelf: "center", width: HP(32), height: VP(32), alignItems: "center" }}><Right width={16} height={16} /></View>}
                                />
                            </View>
                        )}
                    </ImageBackground>
                </View>
            </LinearGradient>
        </>
    )
}

const styles = StyleSheet.create({
    icon: {
        width: HP(400),
        height: VP(457),
        resizeMode: "contain"
    },
    parent: {
        alignItems: "center",
        top: VP(-70),
        flex: 1
    },
    bottomImg: {
        width: HP(400.5),
        height: VP(371.86),
        resizeMode: "contain"
    },
    buttonStyle: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: FS(20),
        color: COLORS.WHITE,
        textTransform: "capitalize",
    },
    headingText: {
        ...TextStyles.RALEWAY_BOLD,
        color: COLORS.WHITE,
        fontSize: FS(38)
    }
});

export default HomeScreen;