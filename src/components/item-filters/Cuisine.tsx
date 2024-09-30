import React, { memo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';

import { COLORS } from '../../utils/Constants.ts';

interface Props {
    items: any[];
    clickHandler: any;
    checkboxContainerStyle: StyleProp<ViewStyle>;
    checkboxStyle: StyleProp<ViewStyle>;
    checkedBoxStyle: StyleProp<ViewStyle>;
    labelStyle: StyleProp<TextStyle>;
}

function Cuisine({ items, clickHandler, checkboxContainerStyle, checkboxStyle, checkedBoxStyle, labelStyle }: Props): React.JSX.Element {

    return (
        <View style={{ flexDirection: "row", width: "100%", flexWrap: "wrap", }}>
            {items.map((d, i) => (
                <TouchableOpacity
                    key={`dietary-preferences-${i}`}
                    onPress={() => clickHandler(i)}
                    style={[styles.checkboxContainer, checkboxContainerStyle]}
                >
                    <View style={[styles.checkbox, checkboxStyle]}>
                        {d.checked && <View style={[styles.checkedBox, checkedBoxStyle]} />}
                    </View>
                    <Text style={[styles.label, labelStyle, { color: d.checked ? COLORS.BLACK : "#747474" }]}>{d.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    checkboxContainer: {
    },
    checkbox: {
    },
    checkedBox: {
    },
    label: {
    }
});

const CuisineSection = memo(Cuisine);
export default CuisineSection;