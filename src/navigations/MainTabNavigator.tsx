import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabNavigator from './BottomTabNavigator';
import NotificationScreen from '../screens/main/NotificationScreen';

export type MainTabParamList = {
    HomeScreen: undefined;
    BottomTab: undefined;
    NotificationScreen: undefined;
};

const MainTabNavigator: React.FunctionComponent = () => {
    const Stack = createNativeStackNavigator<MainTabParamList>();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
            <Stack.Screen
                name={`NotificationScreen`}
                component={NotificationScreen}
            />
        </Stack.Navigator>
    );
};

export default MainTabNavigator;