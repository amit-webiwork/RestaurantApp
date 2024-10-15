import React, { useEffect } from 'react';

import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import axios from 'axios';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import store from './src/redux/store';
import MainStackNavigator from './src/navigations/MainStackNavigator';
import { loadStorage, saveNotification, saveStorage } from './src/utils/Storage';
import { showFadeAlert } from './src/utils/Alert';
import { submitLogin } from './src/utils/ApiCall';
import { LogBox } from 'react-native';

let isRefreshing = false; // To track refresh token attempts

axios.interceptors.request.use(
  async config => {
    const userDetails = await loadStorage("userDetails");

    const token = userDetails?.token?.accessToken || "";

    // console.log(userDetails, token, '----userDetails')

    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    // config.headers['Content-Type'] = 'application/json';
    config.timeout = 10000; // Wait for 10 seconds before timing out
    // console.log(config, '--------config');
    return config;
  },
  error => {
    Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    // Handle network errors
    if (error?.code === 'ERR_NETWORK') {
      showFadeAlert('Network error, Try again later!');
    }

    if (error?.code === 'ECONNABORTED') {
      showFadeAlert('Request timed out');
    }

    // Check if the error is unauthorized (401 or 403)
    if ((error?.response?.status === 401 || error?.response?.status === 403) && !originalRequest._retry) {
      console.log('------------------unauthorized');

      // If already refreshing, return the promise of the refresh attempt
      if (isRefreshing) {
        showFadeAlert('Session expired, please log in again.');
        return Promise.reject(error); // To avoid multiple requests firing while refreshing
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const userDetails = await loadStorage("userDetails");

        if (userDetails && userDetails.token && userDetails.user) {
          const { email, password } = userDetails.user;

          if (email && password) {
            const dataPayload = { email, password };

            const response: any = await submitLogin(dataPayload);
            const responseData = { ...response.data };

            if (responseData.user && responseData.token) {
              responseData.user.password = password; // Save password for next refresh
              saveStorage(responseData, "userDetails");

              // Update axios headers with the new token
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + (responseData?.token?.accessToken || '');

              // Retry the original request with the updated token
              return axios(originalRequest);
            }
          }
        }

        // If userDetails or token is invalid, log out the user
        console.log('User details invalid, logging out...');
        showFadeAlert('Session expired, please log in again.');
      } catch (err) {
        console.log('Token refresh failed:', err);
        showFadeAlert('Session expired, please log in again.');
      } finally {
        isRefreshing = false; // Reset the refreshing state
      }

      return Promise.reject(error); // Reject the promise to stop the loop
    }

    return Promise.reject(error);
  }
);

const navigationRef = createNavigationContainerRef();

function customNavigate(name: string, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

async function createNotificationChannel() {
  try {
    await notifee.createChannel({
      id: 'orders',
      name: 'Order Notifications',
      importance: AndroidImportance.HIGH,
    });
  } catch (error) {
    console.error('Failed to create notification channel', error);
  }
}

// handleForegroundNotification
async function onMessageReceived(message: FirebaseMessagingTypes.RemoteMessage) {
  try {
    const { notification, data } = message;

    saveNotification(data);

    await notifee.displayNotification({
      title: notification?.title,
      body: notification?.body,
      android: {
        channelId: 'orders',
      },
      data: message.data, // Pass data for future access
    });
  } catch (error) {
    console.error('Failed to display notification', error);
  }
}

// Background event handler
notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { data } = detail.notification

  if (type === EventType.PRESS) {
    if (data && data?.screen) {
      customNavigate(data?.screen, { orderId: data?.orderId });
    }
  }
});

// Handle foreground event (when the app is in the foreground)
notifee.onForegroundEvent(async ({ type, detail }) => {
  const { data } = detail.notification;

  if (type === EventType.PRESS) {
    if (data && data.screen) {
      customNavigate(data.screen, { orderId: data.orderId });
    }
  }
});

function App(): React.JSX.Element {
  useEffect(() => {
    createNotificationChannel();

    const handleNotification = messaging().onMessage(onMessageReceived);

    // handleBackgroundNotification
    // Do not set the background handler here if Firebase is automatically handling notifications in the background.
    messaging().setBackgroundMessageHandler(async (message) => {
      // Optional: You may handle background notifications here if needed
      console.log("Handling background message", message);
      saveNotification(message?.data);
    });

    return () => {
      // Properly clean up the listeners
      handleNotification();
    };
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <MainStackNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
