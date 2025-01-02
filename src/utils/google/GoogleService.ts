import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { errorMessage, googleKeys } from "../Constants";

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

export const GetCurrentGoogleUser = async () => {
    try {
        const { type, data } = await GoogleSignin.signInSilently();
        if (type === 'success') {
            return data;
        } else if (type === 'noSavedCredentialFound') {
            throw new Error('User not signed in yet, please sign in :)');
        }
    } catch (error: any) {
        throw new Error(error?.message || errorMessage.unknownError);
    }
}
