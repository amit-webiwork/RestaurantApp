/**
 * @format
 */

import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import App from './App';
import {name as appName} from './app.json';
import { saveNotification } from './src/utils/Storage';

// Register the background message handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage);
    saveNotification(remoteMessage?.data);
});

AppRegistry.registerComponent(appName, () => App);
