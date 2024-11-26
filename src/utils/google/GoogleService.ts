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
        throw new Error(error);
    }
};

export const GoogleSignOut = async () => {
    try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();

    } catch (error) {
        console.log(error, '----------error signOut')
    }
};