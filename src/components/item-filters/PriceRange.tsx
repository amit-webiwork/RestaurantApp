import React, { memo, useState } from 'react';
import { StyleSheet, View, Text, StyleProp, TextStyle } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import { COLORS } from '../../utils/Constants.ts';
import { TextStyles } from '../../utils/TextStyles.ts';
import { FS, HP, VP } from '../../utils/Responsive.ts';

interface Props {
    headingTextStyle: StyleProp<TextStyle>;
    onRangeChange: any;
}

function PriceRange({ headingTextStyle, onRangeChange }: Props): React.JSX.Element {
    const [range, setRange] = useState([50, 300]);

    const setRangeHandler = (values: React.SetStateAction<number[]>) => {
        setRange(values);
        onRangeChange(values);
    }

    return (
        <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={[styles.headingText, headingTextStyle]}>price range</Text>
                <Text style={styles.priceLabel}>${range[0]} - ${range[1]}</Text>
            </View>

            <View style={{ marginTop: VP(9) }}>
                <MultiSlider
                    values={range}
                    sliderLength={FS(300)}
                    onValuesChangeFinish={setRangeHandler}
                    min={0}
                    max={500}
                    step={1}
                    selectedStyle={{
                        backgroundColor: COLORS.BUTTON,
                        height: VP(4)
                    }}
                    unselectedStyle={{
                        backgroundColor: '#C7C7C7',
                        height: VP(4)
                    }}
                    markerStyle={{
                        backgroundColor: COLORS.BUTTON,
                        height: FS(10),
                        width: VP(10),
                        marginTop: HP(2)
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headingText: {
    },
    priceLabel: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 12
    }
});

const PriceRangeSection = memo(PriceRange);
export default PriceRangeSection;