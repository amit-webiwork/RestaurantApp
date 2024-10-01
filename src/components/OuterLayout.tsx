import React, { ReactNode } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';

import { COLORS } from '../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { dialogData, hideDialog } from '../redux/features/customDialog';
import CustomActionDialogComp from './dialogs/CustomActionDialog';

interface OuterLayoutProps {
    children: ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
}

const OuterLayout: React.FC<OuterLayoutProps> = ({
    children,
    containerStyle,
}) => {
    const dispatch = useDispatch();
    const { message, title, visible } = useSelector(dialogData);

    return (
        <>
            <CustomActionDialogComp
                visible={visible}
                title={title}
                message={message}
                onClose={() => dispatch(hideDialog())}
            />
            <View style={[styles.container, containerStyle]}>
                <StatusBar barStyle={'default'} />
                <SafeAreaView>{children}</SafeAreaView>
            </View>
        </>
    );
};

export default OuterLayout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.TEXT,
    },
});
