import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Animated, Easing, StyleSheet } from 'react-native';

import HomeScreen from '../screens/main/HomeScreen';
import { FS } from '../utils/Responsive';
import { TextStyles } from '../utils/TextStyles';
import BottomTabNavigator from './BottomTabNavigator';

export type MainTabParamList = {
    HomeScreen: undefined;
    BottomTab: undefined;
};

const MainTabNavigator: React.FunctionComponent = () => {
    const Stack = createNativeStackNavigator<MainTabParamList>();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
            {/* <Stack.Screen
                name={`HomeScreen`}
                component={HomeScreen}
            /> */}
        </Stack.Navigator>
    );
};

export default MainTabNavigator;