import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
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
    errorStyle?: TextStyle
}

const CustomTextInputNoEffect: React.FC<OutlinedTextInputProps> = ({
    placeholder,
    styleInput,
    formProps,
    iconName,
    iconStyle,
    styleContainer,
    iconClick,
    iconAction,
    errorStyle,
    ...rest
}) => {
    const { text, setText, error } = formProps;

    return (
        <View style={[styles.inputContainer, styleContainer]}>
            <TextInput
                style={[styles.input, styleInput, { borderBottomColor: error.status ? COLORS.RED : "#D3D3D3" }]}
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
                            style={{ bottom: HP(40), right: FS(-120) }}
                        >
                            <Image source={iconName} style={[styles.icon, iconStyle]} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={() => void (0)}
                            style={{ bottom: HP(40), right: FS(-130) }}
                        >
                            <Image source={iconName} style={[styles.icon, iconStyle]} />
                        </TouchableOpacity>
                    )}
                </>
            )}
            {error.status && (
                <Text style={[styles.error, errorStyle]}>{error.text}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: FS(18),
        height: VP(18)
    },
    input: {
        ...TextStyles.RALEWAY_MEDIUM,
        color: COLORS.BLACK,
        fontSize: 12,
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
        fontSize: 10,
        alignSelf: "flex-start",
        textTransform: "capitalize"
    }
});

export default CustomTextInputNoEffect;
