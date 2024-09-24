import React, { useRef, useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Image,
    FlatList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { FS, HP, VP } from '../../utils/Responsive';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';

const colorsBG = [[COLORS.HOME_ICONS, COLORS.HOME_ICONS], [COLORS.BACKGROUND_DEFAULT, COLORS.BACKGROUND_DEFAULT]]

const data = [
    {
        "title": "bubble tea",
    },
    {
        "title": "fruit tea",
    },
    {
        "title": "Acai drink",
    },
    {
        "title": "waffle",
    },
    {
        "title": "watermelon juice",
    }
]

const CategoryItems = ({ item, index }: { item: any, index: number }) => {

    return (
        <View style={{ marginRight: HP(6) }}>
            <TouchableOpacity
                onPress={() => void (0)}
                style={{}}
            >
                <LinearGradient
                    colors={index === 0 ? colorsBG[0] : colorsBG[1]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.categoryBox}
                >
                    <Text style={{ ...styles.categoryText, color: index === 0 ? COLORS.WHITE : COLORS.BLACK, fontFamily: index === 0 ? "RalewaySemiBold" : "RalewayRegular" }}>{item.title}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

export const CategortyTabs: React.FunctionComponent = () => {

    return (
        <View>
            <View>
                <FlatList
                    data={data}
                    renderItem={({ item, index, separators }) => <CategoryItems item={item} index={index} />}
                    contentContainerStyle={{}}
                    horizontal={true}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    categoryText: {
        fontSize: 14,
        textTransform: "capitalize",
        textAlign: "center",
    },
    categoryBox: {
        borderRadius: HP(20),
        justifyContent: "center",
        paddingTop: 9,
        paddingBottom: 9,
        paddingLeft: 18,
        paddingRight: 18,
    },
});
