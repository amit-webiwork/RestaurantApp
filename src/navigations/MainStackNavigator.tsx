import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStackNavigator from './AuthStackNavigator';
import MainTabNavigator from './MainTabNavigator';

export type MainStackParamList = {
    AuthStackNavigator: undefined;
    MainTabNavigator: undefined;
    SignUpScreen: undefined;
};

const MainStackNavigator: React.FunctionComponent = () => {
    const Stack = createNativeStackNavigator<MainStackParamList>();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name={`AuthStackNavigator`}
                component={AuthStackNavigator}
            />
            <Stack.Screen
                name={`MainTabNavigator`}
                component={MainTabNavigator}
            />
        </Stack.Navigator>
    );
};

export default MainStackNavigator;
