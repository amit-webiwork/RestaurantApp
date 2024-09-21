import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/splash/SplashScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import ForgotScreen from '../screens/auth/ForgotScreen';
import VerifyCodeScreen from '../screens/auth/VerifyCodeScreen';
import CreatePasswordScreen from '../screens/auth/CreatePasswordScreen';

export type AuthStackParamList = {
    SignUpScreen: undefined;
    SplashScreen: undefined;
    LoginScreen: undefined;
    ForgotScreen: undefined;
    VerifyCodeScreen: undefined;
    CreatePasswordScreen: undefined;
};

const AuthStackNavigator: React.FunctionComponent = () => {
    const Stack = createNativeStackNavigator<AuthStackParamList>();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name={`SplashScreen`}
                component={SplashScreen as React.FunctionComponent}
            />
            <Stack.Screen
                name={`SignUpScreen`}
                component={SignUpScreen as React.FunctionComponent}
            />
            <Stack.Screen
                name={`LoginScreen`}
                component={LoginScreen as React.FunctionComponent}
            />
            <Stack.Screen
                name={`ForgotScreen`}
                component={ForgotScreen as React.FunctionComponent}
            />
            <Stack.Screen
                name={`VerifyCodeScreen`}
                component={VerifyCodeScreen as React.FunctionComponent}
            />
            <Stack.Screen
                name={`CreatePasswordScreen`}
                component={CreatePasswordScreen as React.FunctionComponent}
            />
            
            {/* 
            <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
                <Stack.Screen name="EntryDrawer" component={EntryDrawer} />
            </Stack.Group> */}
        </Stack.Navigator>
    );
};

export default AuthStackNavigator;
