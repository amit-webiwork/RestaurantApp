import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'

import store from './src/redux/store';
import MainStackNavigator from './src/navigations/MainStackNavigator';

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
