import React from 'react';
import {
    View,
    StyleProp,
    StyleSheet,
    TextStyle
} from 'react-native';
import SwipeButton from 'rn-swipe-button';

import { FS, VP } from '../utils/Responsive';
import { COLORS } from '../utils/Constants';
import { TextStyles } from '../utils/TextStyles';
import Right from '../assets/svgs/right.svg';

type Props = {
    title?: string;
    backgroundColor?: string;
    titleStyles?: StyleProp<TextStyle>;
    swipeAction: () => void;
    mainContainerStyle?: StyleProp<TextStyle>;
    swipeBackgroundColor?: string;
};

const IconButton = () => {
    return <Right width={FS(16)} height={VP(16)} />
}

export const ButtonSwipe: React.FunctionComponent<Props> = ({
    title = 'Swipe', // Default value
    backgroundColor = "#CC9AFF", // Default value
    titleStyles,
    swipeAction,
    mainContainerStyle = { top: FS(28) }, // Default styling if not provided
    swipeBackgroundColor = "#CC9AFF", // Default value
}) => {
    return (
        <>
            <View style={mainContainerStyle}>
                <SwipeButton
                    disabled={false}
                    swipeSuccessThreshold={100}
                    height={VP(45)}
                    width={FS(330)}
                    title={title}
                    titleStyles={titleStyles}
                    shouldResetAfterSuccess={true}
                    thumbIconComponent={IconButton}
                    onSwipeSuccess={swipeAction}
                    railFillBackgroundColor={swipeBackgroundColor} // Optional
                    railFillBorderColor={swipeBackgroundColor} // Optional
                    thumbIconBackgroundColor="#FFF" // Optional
                    thumbIconBorderColor={backgroundColor} // Optional
                    railBackgroundColor={backgroundColor} // Optional
                    railBorderColor={backgroundColor} // Optional
                />
            </View>
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
