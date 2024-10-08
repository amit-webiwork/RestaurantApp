import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react'
import { SafeAreaView, StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import CartScreen from '../screens/main/cart/CartScreen';
import OrderScreen from '../screens/main/OrderScreen';
import HomeScreen from '../screens/main/HomeScreen';
import AccountScreen from '../screens/main/AccountScreen';
import { COLORS } from '../utils/Constants';
import { FS, VP } from '../utils/Responsive';
import { TextStyles } from '../utils/TextStyles';
import Icon, { Icons } from '../components/Icons';
import CategoryScreen from '../screens/main/CategoryScreen';
import MenuScreen from '../screens/main/menu/MenuScreen';
import CartNotificationBarSection from '../components/cart/CartNotificationBar';
import { itemAdded } from '../redux/features/cart';

export type MenuStackParamList = {
    CategoryScreen: undefined;
    MenuScreen: undefined;
};

function MenuStack() {
    const Stack = createNativeStackNavigator<MenuStackParamList>();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
            <Stack.Screen name="MenuScreen" options={{ title: `Menu` }} component={MenuScreen} />
        </Stack.Navigator>
    );
}

const TabArr = [
    { route: 'CartScreen', label: 'Cart', type: Icons.Ionicons, icon: 'bag-handle', component: CartScreen },
    { route: 'OrderScreen', label: 'Orders', type: Icons.MaterialIcons, icon: 'receipt', component: OrderScreen },
    { route: 'HomeScreen', label: 'Home', type: Icons.FontAwesome5, icon: 'home', component: HomeScreen },
    { route: 'Category', label: 'Category', type: Icons.FontAwesome5, icon: 'concierge-bell', component: MenuStack },
    { route: 'AccountScreen', label: 'Account', type: Icons.FontAwesome5, icon: 'user-alt', component: AccountScreen },
];

const Tab = createBottomTabNavigator();

const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -34 }, 1: { scale: 1.2, translateY: -24 } }
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }

const circle1 = { 0: { scale: 0 }, 0.3: { scale: .9 }, 0.5: { scale: .2 }, 0.8: { scale: .7 }, 1: { scale: 1 } }
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }

const TabButton = (props: { item: any; onPress: any; accessibilityState: any; }) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef<any>(null);
    const circleRef = useRef<any>(null);
    const textRef = useRef<any>(null);
    const isDarkMode = useColorScheme() === 'dark';

    const color = COLORS.BLACK;
    const bgColor = COLORS.BACKGROUND;

    useEffect(() => {
        if (focused) {
            viewRef.current.animate(animate1);
            circleRef.current.animate(circle1);
            textRef.current.transitionTo({ scale: 1 });
        } else {
            viewRef.current.animate(animate2);
            circleRef.current.animate(circle2);
            textRef.current.transitionTo({ scale: 0 });
        }
    }, [focused])

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={[styles.container]}>
            <Animatable.View
                ref={viewRef}
                duration={1000}
                style={[styles.container]}>
                <View style={[styles.btn, { borderColor: bgColor, backgroundColor: bgColor }]}>
                    <Animatable.View
                        ref={circleRef}
                        style={styles.circle} />
                    <Icon type={item.type} size={FS(31)} name={item.icon} color={focused ? COLORS.WHITE : COLORS.ICON_DEFAULT} />
                </View>
                <Animatable.Text
                    ref={textRef}
                    style={[styles.text, { color }]}>
                    {item.label}
                </Animatable.Text>
            </Animatable.View>
        </TouchableOpacity>
    )
}

export default function BottomTabNavigator() {
    const navigation = useNavigation(); // Access navigation prop
    const ItemAdded = useSelector(itemAdded);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CartNotificationBarSection isVisible={ItemAdded} navigation={navigation} />
            <Tab.Navigator
                initialRouteName="HomeScreen"
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: [styles.tabBar, styles.shadow],
                }}
            >
                {TabArr.map((item, index) => {
                    return (
                        <Tab.Screen key={index} name={item.route} component={item.component}
                            options={{
                                tabBarShowLabel: false,
                                tabBarStyle: (item.route === 'CartScreen') ? { display: 'none' } : [styles.tabBar, styles.shadow],
                                tabBarButton: (props) => <TabButton {...props} item={item} />
                            }}
                        />
                    )
                })}
            </Tab.Navigator>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: VP(79),
    },
    shadow: {
        shadowColor: "#000",  // iOS shadow color
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.65,
        elevation: 20,
        zIndex: 5,
    },
    tabBar: {
        height: VP(79),
        position: 'absolute',
        backgroundColor: COLORS.BACKGROUND,
        bottom: 0
    },
    btn: {
        width: FS(65),
        height: FS(65),
        borderRadius: FS(32.5),
        borderWidth: 4,
        borderColor: COLORS.WHITE,
        backgroundColor: COLORS.WHITE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.HOME_ICONS,
        borderRadius: FS(32.5),
    },
    text: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 12,
        textAlign: 'center',
        color: "#636363"
    }
})