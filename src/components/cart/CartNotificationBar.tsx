import React, { memo, useRef } from 'react';
import { Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';

import { TextStyles } from '../../utils/TextStyles';
import { COLORS } from '../../utils/Constants';
import { FS, HP, VP } from '../../utils/Responsive';
import { hideCartNotification } from '../../redux/features/cart';
import Icon, { Icons } from '../Icons';

interface Props {
    isVisible: boolean;
    navigation: any;
    message?: string;
}

const CartNotificationBar = ({ isVisible, navigation, message = "Item added to cart" }: Props) => {
    const dispatch = useDispatch();

    const translateY = useRef(new Animated.Value(100)).current; // start hidden

    // Animate the notification bar
    React.useEffect(() => {
        if (isVisible) {
            Animated.timing(translateY, {
                toValue: 0, // slide in
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                // Hide after 3 seconds
                dispatch(hideCartNotification({}))
                setTimeout(() => {
                    Animated.timing(translateY, {
                        toValue: 100, // slide out
                        duration: 300,
                        useNativeDriver: true,
                    }).start();
                }, 2000); // Display for 2 seconds
            });
        }
    }, [isVisible]);

    return (
        <Animated.View style={[styles.notificationBar, { transform: [{ translateY }] }]}>
            <LinearGradient
                colors={['#DF12CA', '#8027C9']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBar}
            >
                <Text style={styles.notificationText}>{message}</Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate(`CartScreen`)}
                    style={styles.iconBox}
                >
                    <Icon type={Icons.Feather} size={16} name={`arrow-right`} color={`#8027C9`} />
                </TouchableOpacity>
            </LinearGradient>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    notificationBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999
    },
    gradientBar: {
        padding: HP(16),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        gap: HP(6)
    },
    notificationText: {
        ...TextStyles.RALEWAY_BOLD,
        color: COLORS.WHITE,
        textTransform: "uppercase"
    },
    iconBox: {
        alignItems: "center",
        width: FS(20),
        height: FS(20),
        backgroundColor: COLORS.WHITE,
        borderRadius: FS(10),
        justifyContent: "center",
        borderWidth: 1,
        borderColor: COLORS.WHITE
    }
});

const CartNotificationBarSection = memo(CartNotificationBar);
export default CartNotificationBarSection;