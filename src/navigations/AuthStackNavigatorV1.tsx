import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUpScreen from '../screens/auth/SignUpScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import ForgotScreen from '../screens/auth/ForgotScreen';
import VerifyCodeScreen from '../screens/auth/VerifyCodeScreen';
import CreatePasswordScreen from '../screens/auth/CreatePasswordScreen';
import SignupVerifyCodeScreen from '../screens/auth/SignupVerifyCodeScreen';

export type AuthStackParamList = {
    SignUpScreen: undefined;
    LoginScreen: undefined;
    ForgotScreen: undefined;
    VerifyCodeScreen: undefined;
    CreatePasswordScreen: undefined;
    SignupVerifyCodeScreen: undefined;
};

const AuthStackNavigatorV1: React.FunctionComponent = () => {
    const Stack = createNativeStackNavigator<AuthStackParamList>();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name={`SignUpScreen`}
                component={SignUpScreen as React.FunctionComponent}
            />
            <Stack.Screen
                name={`SignupVerifyCodeScreen`}
                component={SignupVerifyCodeScreen as React.FunctionComponent}
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
        </Stack.Navigator>
    );
};

export default AuthStackNavigatorV1;
