import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';

import { FS, HP, VP } from '../../utils/Responsive.ts';
import { loadStorage, saveStorage } from '../../utils/Storage.ts';
import { COLORS } from '../../utils/Constants.ts';
import { TextStyles } from '../../utils/TextStyles.ts';
import { submitLogin } from '../../utils/ApiCall.ts';
import { ButtonSwipe } from '../../components/ButtonSwipe.tsx';
import { setProflieDetails } from '../../redux/features/profile.ts';
import { setInRecentSearchState } from '../../utils/helper/SearchHelper.ts';
import { setInCartState } from '../../utils/helper/CartHelper.ts';

function SplashScreen({ navigation }: { navigation: any }): React.JSX.Element {
    const dispatch = useDispatch();

    const [showButton, setShowButton] = useState(false);

    const getStarted = async () => {
        // navigation.navigate('SignUpScreen');
        // return;
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'SignUpScreen',
                },
            ],
        });
    }

    useEffect(() => {
        // return;
        setTimeout(async () => {
            try {
                const userDetails = await loadStorage("userDetails");

                if (userDetails && userDetails.hasOwnProperty("token") && userDetails.hasOwnProperty("user")) {
                    // get user details
                    const dataPayload = {
                        "email": userDetails?.user?.email ?? "",
                        "password": userDetails?.user?.password ?? ""
                    };

                    const response: any = await submitLogin(dataPayload);

                    const responseData = { ...response.data };

                    if (responseData.user && responseData.token) {
                        responseData['user']['password'] = dataPayload.password;
                        saveStorage(responseData, "userDetails");

                        dispatch(setProflieDetails(responseData));

                        // set cart items from storage to state
                        setInCartState(dispatch);

                        // set searched items from storage to state
                        setInRecentSearchState(dispatch)

                        navigation.reset({
                            index: 0,
                            routes: [
                                {
                                    name: 'MainTabNavigator',
                                },
                            ],
                        });
                    } else {
                        throw new Error('Logged Out User');
                    }
                } else {
                    throw new Error('Logged Out User');
                }
            } catch (err) {
                console.log(err, 'err');
                setShowButton(true);
            }
        }, 1000)
    }, [])

    return (
        <>
            <LinearGradient
                colors={['#DF12CA', '#8027C9']}
                start={{ x: 1, y: 0 }}
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
                        <View style={{ alignSelf: "flex-start", paddingHorizontal: FS(37), paddingTop: FS(40), }}>
                            <Text style={styles.headingText}>choose the</Text>
                            <Text style={{ ...styles.headingText, fontSize: 38 }}>drink you love</Text>
                            <Text style={{ ...TextStyles.RALEWAY_SEMI_BOLD, color: COLORS.WHITE, fontSize: 16, textTransform: "capitalize", marginTop: FS(13) }}>boost your energy</Text>
                        </View>

                        {showButton && (
                            <View style={{ justifyContent: "center", marginHorizontal: HP(30) }}>
                                <ButtonSwipe title="swipe to get started" backgroundColor="#CC9AFF" titleStyles={styles.titleStyles} swipeAction={getStarted} mainContainerStyle={{ top: "50%", alignItems: "center" }} swipeBackgroundColor="#CC9AFF" />
                                {/* VP(28) */}
                                {/* #DF12CA */}
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
        width: FS(400),
        height: VP(457),
        resizeMode: "contain"
    },
    parent: {
        alignItems: "center",
        top: VP(-70),
        flex: 1
    },
    bottomImg: {
        width: FS(400.5),
        height: FS(371.86),
        resizeMode: "contain"
    },
    buttonStyle: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 20,
        color: COLORS.WHITE,
        textTransform: "capitalize",
    },
    headingText: {
        ...TextStyles.RALEWAY_BOLD,
        color: COLORS.WHITE,
        fontSize: 38
    },
    titleStyles: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 20,
        color: COLORS.WHITE,
        textTransform: "capitalize",
    }
});

export default SplashScreen;