import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { googleKeys } from "../Constants";

GoogleSignin.configure({
    webClientId: googleKeys.webClientId,
    scopes: googleKeys.scopes
});

export const GoogleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;

//     try {
//         await GoogleSignin.hasPlayServices();
//         const userInfo = await GoogleSignin.signIn();
//         return userInfo;
//     } catch (error) {
//         console.error('Sign-In Error:', error.code, error.message);
//     }
};