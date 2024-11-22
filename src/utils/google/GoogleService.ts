import { GoogleSignin, isErrorWithCode, statusCodes } from "@react-native-google-signin/google-signin";

import { googleKeys } from "../Constants";
import { Alert } from "react-native";

export const PROFILE_IMAGE_SIZE = 150;

export const configureGoogleSignIn = () => {
    GoogleSignin.configure({
        webClientId: googleKeys.webClientId
    });
};

export const GoogleLogin = async () => {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const userInfo = await GoogleSignin.signIn();
        return userInfo;
    } catch (error: any) {
        console.log(error.toString(), '----error.toString()')
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
            Alert.alert(`an error that's not related to google sign in occurred`);
        }
    }
};