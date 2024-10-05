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
            <TextInput
                style={[styles.input, styleInput, { borderBottomColor: error.status ? COLORS.RED : "#A0A0A0" }]}
                value={text}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChangeText={setText}
                placeholder=""
                {...rest}
            />
            {iconName && (
                <>
                    {iconClick ? (
                        <TouchableOpacity
                            onPress={iconAction}
                            style={{ bottom: HP(0), position: 'absolute', right: HP(0) }}
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
        width: FS(18),
        height: VP(18),
        position: 'absolute',
        right: HP(0),
        bottom: HP(20)
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
        top: VP(2),
        textTransform: "capitalize"
    },
    placeholder: {
        position: 'absolute',
        left: 0,
    }
});

export default CustomTextInput;
