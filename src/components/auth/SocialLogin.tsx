import React, { memo, useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import { FS, HP, VP } from '../../utils/Responsive';
import { TextStyles } from '../../utils/TextStyles';
import { configureGoogleSignIn, GoogleLogin, GoogleSignOut } from '../../utils/google/GoogleService';
import { showFadeAlert } from '../../utils/Alert';
import { GoogleSigninButton, isErrorWithCode, statusCodes } from '@react-native-google-signin/google-signin';
import { submitGoogleLogin, submitLogin } from '../../utils/ApiCall';
import { saveStorage } from '../../utils/Storage';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setProflieDetails } from '../../redux/features/profile';
import { setInCartState } from '../../utils/helper/CartHelper';
import { setInRecentSearchState } from '../../utils/helper/SearchHelper';
import { errorMessage } from '../../utils/Constants';
import NormalLoader from '../NormalLoader';

interface Props {
    navigation: any;
}

const SocialLogin: React.FunctionComponent<Props> = ({ navigation }) => {
    const dispatch: AppDispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const response: any = await GoogleLogin();

            if (!response?.data || !response?.data?.idToken) {
                throw new Error(errorMessage.canNotProceed);
            }

            const { idToken, user } = response?.data;

            if (idToken) {
                const dataPayload = {
                    token: idToken,
                    user: user
                }

                const response: any = await submitGoogleLogin(dataPayload);
                const responseData = { ...response.data };

                if (responseData.user && responseData.token) {
                    saveStorage(responseData, "userDetails");
                    dispatch(setProflieDetails(responseData));

                    navigation.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'MainTabNavigator',
                            },
                        ],
                    });
                } else {
                    throw new Error(errorMessage.commonMessage);
                }
            }
        } catch (error: any) {
            if (isErrorWithCode(error)) {
                console.log('error', error.message);
                switch (error.code) {
                    case statusCodes.IN_PROGRESS:
                        // operation (eg. sign in) already in progress
                        Alert.alert(
                            'in progress',
                            'operation (eg. sign in) already in progress',
                        );
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        // android only
                        Alert.alert('play services not available or outdated');
                        break;
                    default:
                        Alert.alert('Something went wrong: ', error.toString());
                }
            } else {
                Alert.alert('Something went wrong: ', `${error?.message || errorMessage.commonMessage}`);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        configureGoogleSignIn();
    }, [])

    return (
        <View style={styles.main}>
            <NormalLoader visible={loading} />
            <View style={styles.top}>
                <View style={styles.line}></View>
                <Text style={styles.text1}>Or</Text>
                <View style={styles.line}></View>
            </View>
            <View style={styles.bottom}>
                {/* <TouchableOpacity
                    onPress={() => void (0)}
                    style={{}}
                >
                    <Image
                        source={require('../../assets/icons/apple.png')}
                        style={
                            [styles.icon,
                            { width: FS(26), height: VP(26) }
                            ]
                        }
                    />
                </TouchableOpacity> */}

                <TouchableOpacity
                    onPress={handleGoogleLogin}
                    disabled={loading}
                >
                    <Image
                        source={require('../../assets/icons/google.png')}
                        style={
                            [styles.icon,
                            { width: FS(24), height: VP(24) }
                            ]
                        }
                    />
                </TouchableOpacity>

                {/* <TouchableOpacity
                    onPress={GoogleSignOut}
                    disabled={loading}
                >
                    <Image
                        source={require('../../assets/icons/google.png')}
                        style={
                            [styles.icon,
                            { width: FS(24), height: VP(24) }
                            ]
                        }
                    />
                </TouchableOpacity> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        marginTop: VP(11),
    },
    top: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: HP(7)
    },
    bottom: {
        flexDirection: "row",
        marginTop: VP(20),
        justifyContent: "center",
        gap: HP(14)
    },
    line: {
        height: 1,
        backgroundColor: "#929292",
        width: "20%",
    },
    text1: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 12
    },
    icon: {
        resizeMode: "contain"
    },
});

const SocialLoginSection = memo(SocialLogin);
export default SocialLoginSection;