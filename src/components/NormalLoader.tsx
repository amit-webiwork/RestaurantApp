import React from 'react';
import { View, StyleSheet, Modal, ActivityIndicator } from 'react-native';

import { COLORS } from '../utils/Constants';

const NormalLoader = ({ visible }: { visible: boolean }) => {
    return (
        <Modal transparent={true} animationType="fade" visible={visible}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <ActivityIndicator size="large" color={COLORS.BUTTON} />
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
    },
});

export default NormalLoader;
