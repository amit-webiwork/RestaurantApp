import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabNavigator from './BottomTabNavigator';
import NotificationScreen from '../screens/main/NotificationScreen';
import ProductScreen from '../screens/main/ProductScreen';
import FilterScreen from '../screens/main/FilterScreen';
import UpdateProfile from '../screens/main/account/UpdateProfile';

export type MainTabParamList = {
    HomeScreen: undefined;
    BottomTab: undefined;
    NotificationScreen: undefined;
    ProductScreen: undefined;
    FilterScreen: undefined;
    UpdateProfile: undefined;
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
            <Stack.Screen
                name={`ProductScreen`}
                component={ProductScreen}
            />
            <Stack.Screen
                name={`UpdateProfile`}
                component={UpdateProfile}
            />

            <Stack.Group screenOptions={{
                presentation: 'transparentModal',
                animation: 'slide_from_bottom',   // Slide from bottom animation
            }}>
                <Stack.Screen name="FilterScreen" component={FilterScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default MainTabNavigator;