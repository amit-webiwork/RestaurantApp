import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import axios from 'axios';

import store from './src/redux/store';
import MainStackNavigator from './src/navigations/MainStackNavigator';
import { loadStorage, saveStorage } from './src/utils/Storage';
import { showFadeAlert } from './src/utils/Alert';
import { submitLogin } from './src/utils/ApiCall';
import { LogBox } from 'react-native';

axios.interceptors.request.use(
  async config => {
    const userDetails = await loadStorage("userDetails");
    
    const token = userDetails?.token?.accessToken || "";

    // console.log(userDetails, token, '----userDetails')

    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    config.headers['Content-Type'] = 'application/json';
    config.timeout = 10000; // Wait for 10 seconds before timing out
    // console.log(config, '--------config');
    return config;
  },
  error => {
    Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    return response
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.code === 'ERR_NETWORK') {
      showFadeAlert('Network error, Try again later!')
    }

    if (error.code === 'ECONNABORTED') {
      showFadeAlert('Request timed out')
    }

    if (error.response.status === 401 || error.response.status === 403) {
      console.log('------------------unauthorized');
      originalRequest._retry = true;

      const userDetails = await loadStorage("userDetails");

      const dataPayload = {
        "email": userDetails?.user?.email ?? "",
        "password": userDetails?.user?.password ?? ""
      };

      const response: any = await submitLogin(dataPayload);

      const responseData = { ...response.data };

      if (responseData.user && responseData.token) {
        responseData['user']['password'] = dataPayload.password;

        saveStorage(responseData, "userDetails");

        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + (responseData?.token?.accessToken || "")
      }

      return axios(originalRequest)
    }

    return Promise.reject(error)
  }
)

function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
