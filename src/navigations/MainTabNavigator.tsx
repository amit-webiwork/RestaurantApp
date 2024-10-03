import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabNavigator from './BottomTabNavigator';
import NotificationScreen from '../screens/main/NotificationScreen';
import ProductScreen from '../screens/main/ProductScreen';
import FilterScreen from '../screens/main/FilterScreen';
import UpdateProfile from '../screens/main/account/UpdateProfile';
import ChangePassword from '../screens/main/account/ChangePassword';
import Support from '../screens/main/account/Support';
import Feedback from '../screens/main/account/Feedback';
import CartMenuScreen from '../screens/main/cart/CartMenuScreen';
import OrderPlacedScreen from '../screens/main/cart/OrderPlacedScreen';
import MenuScreen from '../screens/main/menu/MenuScreen';
import PopularMenuScreen from '../screens/main/menu/PopularMenuScreen';

export type MainTabParamList = {
    HomeScreen: undefined;
    BottomTab: undefined;
    NotificationScreen: undefined;
    ProductScreen: undefined;
    FilterScreen: undefined;
    UpdateProfile: undefined;
    ChangePassword: undefined;
    Support: undefined;
    Feedback: undefined;
    CartMenuScreen: undefined;
    OrderPlacedScreen: undefined;
    MenuScreen: undefined;
    PopularMenuScreen: undefined;
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
            <Stack.Screen
                name={`ChangePassword`}
                component={ChangePassword}
            />
            <Stack.Screen
                name={`Support`}
                component={Support}
            />
            <Stack.Screen
                name={`Feedback`}
                component={Feedback}
            />
            <Stack.Screen
                name={`CartMenuScreen`}
                component={CartMenuScreen}
            />
            <Stack.Screen
                name={`OrderPlacedScreen`}
                component={OrderPlacedScreen}
            />
            <Stack.Screen
                name={`MenuScreen`}
                component={MenuScreen}
            />
            <Stack.Screen
                name={`PopularMenuScreen`}
                component={PopularMenuScreen}
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