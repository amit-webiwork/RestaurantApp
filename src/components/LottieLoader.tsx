import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import LottieView from 'lottie-react-native';
import { FS, VP } from '../utils/Responsive';

const LottieLoader = ({ visible }: { visible: boolean }) => {
    return (
        <Modal transparent={true} animationType="fade" visible={visible}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <LottieView
                        source={require('../assets/loader/loader.json')}
                        autoPlay
                        loop
                        style={styles.lottie}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: FS(200),
        height: VP(200)
    },
    lottie: {
        width: '100%',
        height: '100%',
    },
});

export default LottieLoader;
