import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { TextStyles } from '../utils/TextStyles';
import { HP } from '../utils/Responsive';

const CustomDialog = ({ visible, title, message, onClose }: { visible: boolean, title: string, message: string, onClose: any }) => {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.dialogContainer}>
                    <Text style={styles.dialogTitle}>{title}</Text>
                    <Text style={styles.dialogMessage}>{message}</Text>
                    <View style={styles.dialogButtons}>
                        <TouchableOpacity style={styles.dialogButton} onPress={onClose}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

// Styles for the dialog box
const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialogContainer: {
        width: HP(300),
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        flexDirection: "column",
    },
    dialogTitle: {
        ...TextStyles.RALEWAY_BOLD,
        fontSize: 18,
        marginBottom: 10,
        color: "#000000",
        textAlign: 'center',
    },
    dialogMessage: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: "#000000"
    },
    dialogButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    dialogButton: {
        padding: 10,
    },
    buttonText: {
        color: '#007BFF',
        fontSize: 16,
    },
});

export default CustomDialog;