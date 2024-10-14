import { PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Permissions from 'react-native-permissions'
import { apiEndpoints, BACKEND_URL } from './Constants';
import { saveStorage } from './Storage';

const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');

    if (fcmToken === null) {
        try {
            const getToken = await messaging().getToken();
            if (getToken) {
                saveToken(getToken);
            }
        } catch (err) {
            console.log('Error while getting FCM Token', err);
        }
    }
};

// save token
const saveToken = async (token: string) => {
    try {
        const dataPayload = {
            deviceToken: token,
        };

        axios
            .post(BACKEND_URL + apiEndpoints.deviceToken, dataPayload)
            .then(async response => {
                await AsyncStorage.setItem('fcmToken', token);
                saveStorage({ token: token }, "fcmToken");
            })
            .catch(error => {
                console.error('Error saving token data: ', error);
            });
    } catch (error: any) {
        console.log('Permission or Token retrieval error:', error.message);
    }
};

const notificationPermission = async () => {
    try {
        if (Platform.OS === 'android') {
            const permission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            );
            return (
                permission === PermissionsAndroid.RESULTS.GRANTED ||
                permission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
            );
        } else {
            const permission = await messaging().requestPermission();
            return (
                permission === messaging.AuthorizationStatus.AUTHORIZED ||
                permission === messaging.AuthorizationStatus.PROVISIONAL
            );
        }
    } catch (err) {
        return false;
    }
};

const askInitialPermission = async () => {
    const grantedNotification = await notificationPermission();

    if (grantedNotification) {
        getFcmToken();
    }

    return grantedNotification;
};

export { askInitialPermission, notificationPermission };