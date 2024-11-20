import React, { useState, useRef, useEffect } from 'react';
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
    prefix?: string;
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
    prefix,
    ...rest
}) => {
    const { text, setText, error } = formProps;

    const [isFocused, setIsFocused] = useState(false);
    const animatedLabel = useRef(new Animated.Value(text ? 1 : 0)).current; // Initial position if there's text

    useEffect(() => {
        Animated.timing(animatedLabel, {
            toValue: isFocused || text ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isFocused, text]);

    const labelStyle = {
        position: 'absolute',
        left: 0,
        top: animatedLabel.interpolate({
            inputRange: [0, 1],
            outputRange: [40, 10], // Moves label up
        }),
        fontSize: animatedLabel.interpolate({
            inputRange: [0, 1],
            outputRange: [12, 12], // Reduces font size
        }),
        color: animatedLabel.interpolate({
            inputRange: [0, 1],
            outputRange: ['#A0A0A0', '#ADA4A5'], // Placeholder color when focused
        }),
    };

    return (
        <View style={[styles.inputContainer, styleContainer]}>
            <Animated.Text style={[styles.placeholder, labelStyle]}>
                {placeholder}
            </Animated.Text>
            <View style={styles.inputWrapper}>
                {(isFocused || text) && prefix && <Text style={styles.prefix}>{prefix}</Text>}
                <TextInput
                    style={[
                        styles.input,
                        styleInput,
                        { borderBottomColor: error.status ? COLORS.RED : "#A0A0A0" },
                    ]}
                    value={text}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChangeText={setText}
                    placeholder=""
                    {...rest}
                />
            </View>
            {iconName && (
                <>
                    {iconClick ? (
                        <TouchableOpacity
                            onPress={iconAction}
                            style={{ bottom: HP(30), right: FS(-120) }}
                        >
                            <Image source={iconName} style={[styles.icon, iconStyle]} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={() => void 0}
                            style={{ bottom: HP(30), right: FS(-130) }}
                        >
                            <Image source={iconName} style={[styles.icon, iconStyle]} />
                        </TouchableOpacity>
                    )}
                </>
            )}
            {error.status && <Text style={styles.error}>{error.text}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: FS(18),
        height: VP(18),
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#9C9C9C",
        width: '100%',
    },
    prefix: {
        ...TextStyles.RALEWAY_MEDIUM,
        color: COLORS.BLACK,
        fontSize: 12,
        marginRight: 8,
        top: VP(7)
    },
    input: {
        ...TextStyles.RALEWAY_MEDIUM,
        color: COLORS.BLACK,
        fontSize: 12,
        paddingVertical: HP(15),
        flex: 1
    },
    inputContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    error: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: COLORS.RED,
        fontSize: 10,
        alignSelf: 'flex-start',
        top: VP(2),
        textTransform: 'capitalize',
    },
    placeholder: {
        position: 'absolute',
        left: 0,
    },
});

export default CustomTextInput;
