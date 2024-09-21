import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
    StyleSheet,
    ActivityIndicator,
    TextStyle,
    Text
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { FS, HP, VP } from '../utils/Responsive';
import { COLORS } from '../utils/Constants';
import { TextStyles } from '../utils/TextStyles';


type Props = {
    text: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    isLoading?: boolean;
    disabled?: boolean;
    Icon?: JSX.Element;
    contentContainerStyle?: StyleProp<ViewStyle>;
    activityIndicatorColor?: string;
    textStyle?: StyleProp<TextStyle>;
    activeButtonText?: StyleProp<TextStyle>;
    LinearGradienrColor?: string[];
    mainContainerStyle?: StyleProp<TextStyle>;
};

export const Button: React.FunctionComponent<Props> = ({
    text,
    onPress,
    style,
    isLoading,
    textStyle,
    disabled,
    Icon,
    contentContainerStyle,
    activityIndicatorColor,
    activeButtonText,
    mainContainerStyle,
    LinearGradienrColor = ["#92A3FD", '#9DCEFF'] // ['#5C44E4', '#753E8D']
}) => {
    const handleButtonPress = () => {
        if (isLoading || disabled) {
            return;
        }
        onPress();
    };
    const isButtonDisabled = () => {
        return disabled || isLoading;
    };

    const getButtonStyle = () => {
        if (disabled || isLoading) {
            return styles.disabledButton;
        } else {
            return null;
        }
    };

    const renderButton = () => {
        if (isLoading) {
            return (
                <View
                    style={[
                        styles.buttonContentContainer,
                        contentContainerStyle,
                    ]}
                >
                    <ActivityIndicator
                        color={activityIndicatorColor || COLORS.WHITE}
                        size="small"
                    />
                </View>
            );
        } else {
            return (
                <>
                    <View
                        style={[
                            styles.buttonContentContainer,
                            contentContainerStyle,
                        ]}
                    >
                        {Icon ? Icon : null}
                        <Text
                            style={[
                                disabled || isLoading
                                    ? activeButtonText
                                    : styles.activeButtonText,
                                textStyle,
                            ]}
                        >
                            {text}
                        </Text>
                    </View>
                </>
            );
        }
    };

    return (
        <>
            <LinearGradient style={[{ borderRadius: 11 }, mainContainerStyle]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} colors={LinearGradienrColor}>
                <TouchableOpacity
                    onPress={handleButtonPress}
                    disabled={isButtonDisabled()}
                    style={[styles.button, getButtonStyle(), style]}
                >
                    {renderButton()}
                </TouchableOpacity>
            </LinearGradient >
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        width: FS(210),
        height: VP(50),
        justifyContent: 'center',
        alignSelf: "center",
    },
    buttonContentContainer: {
        justifyContent: 'center',
        width: '100%',
        flexDirection: "row",
    },
    disabledButton: {
        backgroundColor: "#FF00E2",
    },
    activeButtonText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: COLORS.WHITE
    },
});
