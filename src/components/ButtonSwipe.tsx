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
import SwipeButton from 'rn-swipe-button';

import { FS, HP, VP } from '../utils/Responsive';
import { COLORS } from '../utils/Constants';
import { TextStyles } from '../utils/TextStyles';
// import Right from '../assets/svgs/right.svg';

type Props = {
    title: string;
    backgroundColor: string;
    titleStyles: StyleProp<TextStyle>
    swipeAction: () => void;
    mainContainerStyle: StyleProp<TextStyle>;
    swipeBackgroundColor: string;
};

export const ButtonSwipe: React.FunctionComponent<Props> = ({ title, backgroundColor, titleStyles, swipeAction, mainContainerStyle, swipeBackgroundColor }) => {
    return (
        <>
            <View style={mainContainerStyle}>
                <SwipeButton
                    disabled={false}
                    //disable the button by doing true (Optional)
                    swipeSuccessThreshold={100}
                    height={45}
                    //height of the button (Optional)
                    width={330}
                    //width of the button (Optional)
                    title={title}
                    titleStyles={titleStyles}
                    shouldResetAfterSuccess={true}
                    // thumbIconComponent={}
                    //Text inside the button (Optional)
                    // thumbIconImageSource={<Right width={FS(16)} height={VP(16)} />}
                    //You can also set your own icon (Optional)
                    onSwipeSuccess={swipeAction}
                    //After the completion of swipe (Optional)
                    railFillBackgroundColor={swipeBackgroundColor} //(Optional)
                    railFillBorderColor={swipeBackgroundColor} //(Optional)
                    thumbIconBackgroundColor="#FFF" //(Optional)
                    thumbIconBorderColor={backgroundColor} //(Optional)
                    railBackgroundColor={backgroundColor} //(Optional)
                    railBorderColor={backgroundColor} //(Optional)
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
