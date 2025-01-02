import AsyncStorage from "@react-native-async-storage/async-storage";

import { removeStorage } from "../Storage";

const removeItemFromAsyncStorage = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log(`Item with key ${key} removed from storage.`);
    } catch (error) {
        console.error("Error removing item from storage", error);
    }
};

export const dumpStorage = async () => {
    await Promise.all([
        removeStorage("userDetails"),
        removeStorage("forgotPasswordEmail"),
        removeStorage("forgotPasswordOTP"),
        removeStorage("cartItems"),
        removeStorage("recentSearchItems"),
        removeStorage("fcmToken"),
        removeStorage("notificationList"),
        removeItemFromAsyncStorage('fcmToken')
    ]);
}
