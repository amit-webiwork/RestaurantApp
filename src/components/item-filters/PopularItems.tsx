import React, { memo, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { FS, HP } from '../../utils/Responsive.ts';
import { COLORS } from '../../utils/Constants.ts';
import { TextStyles } from '../../utils/TextStyles.ts';

interface Props {
    items: any[];
    clickHandler: any;
}

function PopularItems({ items, clickHandler }: Props): React.JSX.Element {
    const [selected, setSelected] = useState(-1);

    const onPresshandler = (id: number) => {
        setSelected(id);
        clickHandler(id)
    }

    return (
        <View style={{ flexDirection: "row", gap: HP(10), flexWrap: "wrap" }}>
            {items.map((d, i) => (
                <TouchableOpacity
                    key={`popular-items-${i}`}
                    onPress={() => onPresshandler(i)}
                    style={[styles.categoryButton, { borderColor: selected === i ? "#FF00E2" : "#E0E0E0" }]}
                >
                    <Text style={[styles.categoryText, { color: selected === i ? COLORS.BLACK : "#747474" }]}>{d}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    categoryText: {
        ...TextStyles.RALEWAY_MEDIUM,
        textTransform: 'capitalize',
        fontSize: 10,
        color: "#747474",
        textAlign: "center"
    },
    categoryButton: {
        borderWidth: 1,
        borderRadius: HP(35),
        padding: 12,
        maxWidth: FS(150),
        justifyContent: "center"
    }
});

const PopularItemsSection = memo(PopularItems);
export default PopularItemsSection;