import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SkeletonLoader = ({ width, height, borderRadius = 4, style }: { width: any, height: any, borderRadius?: any, style?: StyleProp<ViewStyle> }) => {
    const shimmerAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(shimmerAnimation, {
                    toValue: 1,
                    duration: 1200,
                    useNativeDriver: true,
                }),
                Animated.timing(shimmerAnimation, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, [shimmerAnimation]);

    const translateX = shimmerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-width, width],
    });

    return (
        <View style={[styles.skeletonContainer, { width, height, borderRadius }, style]}>
            <View style={styles.shimmerWrapper}>
                <Animated.View style={[styles.shimmer, { transform: [{ translateX }] }]}>
                    <LinearGradient
                        colors={['#e0e0e0', '#f2f2f2', '#e0e0e0']}
                        style={styles.gradient}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                    />
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    skeletonContainer: {
        backgroundColor: '#e0e0e0',
        overflow: 'hidden',
    },
    shimmerWrapper: {
        flex: 1,
    },
    shimmer: {
        ...StyleSheet.absoluteFillObject,
    },
    gradient: {
        flex: 1,
        width: '200%',
    },
});

export default SkeletonLoader;
