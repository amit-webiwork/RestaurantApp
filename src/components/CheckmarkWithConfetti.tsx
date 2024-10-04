import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { FS, VP } from '../utils/Responsive';

const CheckmarkWithConfetti = () => {

    return (
        <View style={styles.container}>
            {/* Confetti Animation */}
            <LottieView
                source={require('../assets/animation/confetti.json')}
                autoPlay
                loop={false}
                style={styles.confetti}
            />

            {/* Checkmark and Circle */}
            <View style={[styles.circleContainer]}>
                {/* <Svg height="100" width="100" viewBox="0 0 100 100">
                    <Circle cx="50" cy="50" r="40" stroke="#d463f0" strokeWidth="4" fill="#d263f0" />
                    <Path
                        d="M30 50 L45 65 L70 40"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="5"
                    />
                </Svg> */}

                <Image source={require(`../assets/images/success-circle.png`)} style={[styles.img]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    confetti: {
        position: 'absolute',
        width: "100%",
        height: VP(300),
        zIndex: 0,
    },
    circleContainer: {
        width: FS(250),
        height: VP(250),
        zIndex: 1,
        alignItems: "center"
    },
    img: {
        resizeMode: "contain",
        width: FS(200),
        height: VP(200),
        marginTop: VP(50)
    },
});

export default CheckmarkWithConfetti;
