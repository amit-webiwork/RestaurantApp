import React, { useState } from 'react';
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
    StyleProp,
    ViewStyle,
} from 'react-native';

import { COLORS } from '../utils/Constants';
import { FS, HP, VP } from '../utils/Responsive';
import { TextStyles } from '../utils/TextStyles';
import { globalStyle } from '../utils/GlobalStyle';

interface OutlinedTextInputProps extends TextInputProps {
    placeholder: string;
    styleInput?: TextStyle;
    formProps: FormProps;
    iconName?: ImageSourcePropType;
    iconStyle?: ImageStyle;
    styleContainer?: TextStyle;
    iconClick?: boolean;
    iconAction?: () => void;
    errorStyle?: TextStyle;
    iconContainerStyle?: StyleProp<ViewStyle>;
    prefix?: string;
}

const CustomTextInputNoEffect: React.FC<OutlinedTextInputProps> = ({
    placeholder,
    styleInput,
    formProps,
    iconName,
    iconStyle,
    styleContainer,
    iconContainerStyle,
    iconClick,
    iconAction,
    errorStyle,
    prefix,
    ...rest
}) => {
    const { text, setText, error } = formProps;

    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles.inputContainer, styleContainer]}>
            <View style={[styles.inputWrapper, { borderBottomWidth: prefix ? 0 : 0, width: prefix ? "auto" : "auto" }]}>
                {(isFocused) && prefix && <Text style={styles.prefix}>{prefix}</Text>}
                <TextInput
                    style={
                        [
                            styles.input, styleInput,
                            {
                                borderBottomColor: error.status ? COLORS.RED : "#D3D3D3"
                            }
                        ]
                    }
                    value={text}
                    onChangeText={setText}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.PLACEHOLDER_COLOR}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...rest}
                />
            </View>
            {iconName && (
                <>
                    {iconClick ? (
                        <TouchableOpacity
                            onPress={iconAction}
                            style={
                                [
                                    {
                                        bottom: HP(40),
                                        right: FS(-120)
                                    },
                                    iconContainerStyle,
                                ]
                            }
                        >
                            <Image
                                source={iconName}
                                style={[styles.icon, iconStyle]}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={() => void (0)}
                            style={{
                                bottom: HP(40),
                                right: FS(-130)
                            }}
                        >
                            <Image
                                source={iconName}
                                style={[styles.icon, iconStyle]}
                            />
                        </TouchableOpacity>
                    )}
                </>
            )}
            {error.status && (
                <Text style={[globalStyle.error, errorStyle]}>{error.text}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: FS(18),
        height: FS(18)
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
    prefix: {
        ...TextStyles.RALEWAY_MEDIUM,
        color: COLORS.BLACK,
        fontSize: 14,
        marginRight: 8
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: "#9C9C9C"
    }
});

export default CustomTextInputNoEffect;
