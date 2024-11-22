import React, { memo, useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import { FS, HP, VP } from '../../utils/Responsive';
import { TextStyles } from '../../utils/TextStyles';
import { configureGoogleSignIn, GoogleLogin } from '../../utils/google/GoogleService';
import { showFadeAlert } from '../../utils/Alert';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

interface Props {
}

const SocialLogin: React.FunctionComponent<Props> = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const response: any = await GoogleLogin();
            console.log(response, '-----------response')
            const { idToken, user } = response;


            // if (idToken) {
            // 	const resp = await authAPI.validateToken({
            // 		token: idToken,
            // 		email: user.email,
            // 	});
            // 	await handlePostLoginData(resp.data);
            // }
        } catch (apiError: any) {
            console.log(apiError, '-----apiError')
            // showFadeAlert(`${apiError}`);
            setError(
                apiError?.response?.data?.error?.message || 'Something went wrong'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        configureGoogleSignIn();
    }, [])

    return (
        <View style={styles.main}>
            <View style={styles.top}>
                <View style={styles.line}></View>
                <Text style={styles.text1}>Or</Text>
                <View style={styles.line}></View>
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity
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
                </TouchableOpacity>

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