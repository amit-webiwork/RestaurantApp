import React, { memo, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { TextStyles } from '../../utils/TextStyles';
import { COLORS } from '../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';
import { HP, VP } from '../../utils/Responsive';
import { useDispatch } from 'react-redux';
import { hideCartNotification } from '../../redux/features/cart';

interface Props {
    isVisible: boolean;
    message?: string;
}

const CartNotificationBar = ({ isVisible, message = "Item added to cart" }: Props) => {
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
    },
    notificationText: {
        ...TextStyles.RALEWAY_BOLD,
        color: COLORS.WHITE,
        textTransform: "uppercase"
    },
});

const CartNotificationBarSection = memo(CartNotificationBar);
export default CartNotificationBarSection;