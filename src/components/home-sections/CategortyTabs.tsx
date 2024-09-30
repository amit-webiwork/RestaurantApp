import React, { memo } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    FlatList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

import { HP } from '../../utils/Responsive';
import { COLORS } from '../../utils/Constants';
import { categoryLoaded } from '../../redux/features/items';
import CategoryTabsLoader from '../skeleton/CategoryTabsLoader';

const colorsBG = [[COLORS.HOME_ICONS, COLORS.HOME_ICONS], [COLORS.BACKGROUND_DEFAULT, COLORS.BACKGROUND_DEFAULT]]

interface Props {
    data: any[];
    selectedCategory: number;
    setSelectedCategory: any;
}

const CategoryItems = ({ item, index, selectedCategory, setSelectedCategory }: { item: any, index: number, selectedCategory: number, setSelectedCategory: any }) => {
    return (
        <View style={{ marginRight: HP(6) }}>
            <TouchableOpacity
                onPress={() => setSelectedCategory(item.id)}
                style={{}}
            >
                <LinearGradient
                    colors={selectedCategory === item.id ? colorsBG[0] : colorsBG[1]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.categoryBox, { borderColor: selectedCategory === item.id ? COLORS.HOME_ICONS : "#D0D0D0" }]}
                >
                    <Text style={{ ...styles.categoryText, color: selectedCategory === item.id ? COLORS.WHITE : COLORS.BLACK, fontFamily: selectedCategory === item.id ? "RalewaySemiBold" : "RalewayRegular" }}>{item.title}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

const CategortyTabs: React.FunctionComponent<Props> = ({ data, selectedCategory, setSelectedCategory }) => {
    const CategoryLoaded = useSelector(categoryLoaded);

    return (
        <View>
            {!CategoryLoaded ? (
                <FlatList
                    data={data}
                    renderItem={({ item, index, separators }) => <CategoryItems item={item} index={index} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />}
                    contentContainerStyle={{}}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            ) : (<CategoryTabsLoader />)}
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
        justifyContent: "center",
        paddingTop: 9,
        paddingBottom: 9,
        paddingLeft: 18,
        paddingRight: 18,
        borderWidth: 1,
        borderRadius: HP(20),
        borderTopEndRadius: HP(20),
        borderTopStartRadius: HP(20),
        borderBottomStartRadius: HP(20),
        borderBottomEndRadius: HP(20),
    },
});

const CategortyTabsSection = memo(CategortyTabs);
export default CategortyTabsSection;