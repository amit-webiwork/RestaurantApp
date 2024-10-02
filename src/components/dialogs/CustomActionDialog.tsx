import React, { memo } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, StyleProp, TextStyle, Dimensions } from 'react-native';

import { TextStyles } from '../../utils/TextStyles';
import { FS, HP, VP } from '../../utils/Responsive';
import { ButtonSection as Button } from '../Button';
import { COLORS } from '../../utils/Constants';
import Icon, { Icons } from '../Icons';

interface Props {
    visible: boolean;
    title: string;
    message: string;
    onClose: any;
    dialogTitleStyle?: StyleProp<TextStyle>;
    dialogMessageStyle?: StyleProp<TextStyle>;
    buttonAction?: boolean;
    onAction?: any;
    buttonText1?: string;
    buttonText2?: string;
}

const { width, height } = Dimensions.get('window');

const CustomActionDialog = ({ visible, title, message, onClose, dialogTitleStyle, dialogMessageStyle, onAction, buttonAction = false, buttonText1 = 'Close', buttonText2 = "" }: Props) => {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.dialogContainer}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={[styles.dialogTitle, dialogTitleStyle]}>{title}</Text>

                        <TouchableOpacity
                            onPress={onClose}
                            style={{
                                width: FS(28),
                                height: VP(28),
                                borderWidth: 1,
                                borderRadius: HP(9.65),
                                justifyContent: "center",
                                alignItems: "center",
                                borderColor: "#EDEDED"
                            }}
                        >
                            <Icon
                                type={Icons.Feather}
                                size={22.11}
                                name={'x'}
                                color={COLORS.BLACK} />
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.dialogMessage, dialogMessageStyle]}>{message}</Text>

                    <View style={styles.dialogButtons}>

                        <Button
                            text={buttonText1}
                            onPress={onClose}
                            textStyle={styles.buttonStyle1}
                            isLoading={false}
                            activeButtonText={{ opacity: .65 }}
                            mainContainerStyle={{ flex: 1, borderRadius: HP(51) }}
                            LinearGradienrColor={[COLORS.BUTTON, COLORS.BUTTON]}
                            contentContainerStyle={{ top: -2 }}
                        />
                        {buttonAction && (
                            <Button
                                text={buttonText2}
                                onPress={onAction}
                                textStyle={styles.buttonStyle2}
                                isLoading={false}
                                activeButtonText={{ opacity: .65 }}
                                mainContainerStyle={{ flex: 1, borderColor: "#ACACAC", borderWidth: 1, borderRadius: HP(51) }}
                                LinearGradienrColor={["#F5F5F5", "#F5F5F5"]}
                                contentContainerStyle={{ top: -2 }}
                            />
                        )}
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
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialogContainer: {
        width: width * .9,
        backgroundColor: 'white',
        borderRadius: HP(14.47),
        padding: HP(20),
        alignItems: 'center',
        flexDirection: "column",
    },
    dialogTitle: {
        ...TextStyles.RALEWAY_BOLD,
        fontSize: 18,
        marginBottom: HP(10),
        color: "#000000",
        textAlign: 'center',
        flex: 1,
        start: 20
    },
    dialogMessage: {
        ...TextStyles.RALEWAY_REGULAR,
        textAlign: 'center',
        marginBottom: 20,
        color: "#000000",
        fontSize: 16.88,
        lineHeight: 24.1,
    },
    dialogButtons: {
        marginTop: VP(10),
        flexDirection: "row",
        gap: HP(5)
    },
    buttonStyle1: {
        ...TextStyles.RALEWAY_BOLD,
        fontSize: 16,
        color: COLORS.WHITE
    },
    buttonStyle2: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 16,
        color: "#303030"
    }
});

const CustomActionDialogComp = memo(CustomActionDialog);
export default CustomActionDialogComp;