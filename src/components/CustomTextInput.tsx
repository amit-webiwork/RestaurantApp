import React, { useState, useRef } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Animated,
    TextInputProps,
    TextStyle,
    Image,
    ImageSourcePropType,
    ImageStyle,
    TouchableOpacity,
    Text,
} from 'react-native';

import { COLORS } from '../utils/Constants';
import { FS, HP, VP } from '../utils/Responsive';
import { TextStyles } from '../utils/TextStyles';

interface OutlinedTextInputProps extends TextInputProps {
    placeholder: string;
    styleInput?: TextStyle;
    formProps: any;
    iconName?: ImageSourcePropType;
    iconStyle?: ImageStyle;
    styleContainer?: TextStyle;
    iconClick?: boolean;
    iconAction?: () => void;
}

const CustomTextInput: React.FC<OutlinedTextInputProps> = ({
    placeholder,
    styleInput,
    formProps,
    iconName,
    iconStyle,
    styleContainer,
    iconClick,
    iconAction,
    ...rest
}) => {
    const { text, setText, error } = formProps;

    return (
        <View style={[styles.inputContainer, styleContainer]}>
            <TextInput
                style={[styles.input, styleInput, { borderBottomColor: error.status ? COLORS.RED : "#A0A0A0" }]}
                value={text}
                onChangeText={setText}
                placeholder={placeholder}
                placeholderTextColor={COLORS.PLACEHOLDER_COLOR}
                {...rest}
            />
            {iconName && (
                <>
                    {iconClick ? (
                        <TouchableOpacity
                            onPress={iconAction}
                            style={{ bottom: VP(0), position: 'absolute', right: HP(0) }}
                        >
                            <Image source={iconName} style={[styles.icon, iconStyle]} />
                        </TouchableOpacity>
                    ) : (
                        <Image source={iconName} style={[styles.icon, iconStyle]} />
                    )}
                </>
            )}
            {error.status && (
                <Text style={styles.error}>{error.text}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: HP(18),
        height: VP(18),
        position: 'absolute',
        right: VP(0),
        bottom: VP(20)
    },
    input: {
        ...TextStyles.RALEWAY_MEDIUM,
        color: COLORS.BLACK,
        fontSize: FS(12),
        paddingVertical: HP(15),
        borderBottomWidth: 1,
        width: "100%"
    },
    inputContainer: {
        justifyContent: 'center',
        alignContent: "center",
        alignItems: "center"
    },
    error: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: COLORS.RED,
        fontSize: FS(10),
        alignSelf: "flex-start",
        top: VP(2),
        textTransform: "capitalize"
    }
});

export default CustomTextInput;
