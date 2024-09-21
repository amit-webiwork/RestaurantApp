import React from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { FS, HP, VP } from '../utils/Responsive';
import { COLORS } from '../utils/Constants';
import { TextStyles } from '../utils/TextStyles';

const CELL_COUNT = 4;

const OTPInput = ({ formProps }: { formProps: any }) => {
    const { value, setValue, error } = formProps;

    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    return (
        <SafeAreaView style={styles.root}>
            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <View
                        // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                        onLayout={getCellOnLayoutHandler(index)}
                        key={index}
                        style={[styles.cellRoot, isFocused && styles.focusCell, error.status && { borderBottomColor: COLORS.RED, }]}>
                        <Text style={styles.cellText}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: { padding: 0 },
    codeFieldRoot: {
        width: 280,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cellRoot: {
        width: HP(54.29),
        height: VP(70),
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#8226C9',
        borderBottomWidth: 2.5,
        backgroundColor: "#ECECEC"
    },
    cellText: {
        ...TextStyles.RALEWAY_MEDIUM,
        color: COLORS.BLACK,
        fontSize: FS(21.36),
        textAlign: 'center',
    },
    focusCell: {
        borderBottomColor: '#8226C9',
        borderBottomWidth: 2.5,
    },
});

export default OTPInput;