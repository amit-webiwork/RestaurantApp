import React, { memo, useEffect, useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    FlatList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import { HP } from '../../utils/Responsive';
import { COLORS } from '../../utils/Constants';
import { categoryList, categoryLoaded, fetchCategories } from '../../redux/features/items';
import CategoryTabsLoaderSection from '../skeleton/CategoryTabsLoader';
import { AppDispatch } from '../../redux/store';

const colorsBG = [[COLORS.HOME_ICONS, COLORS.HOME_ICONS], [COLORS.BACKGROUND_DEFAULT, COLORS.BACKGROUND_DEFAULT]]

interface Props {
    setSelectedCategory: any;
    selectedCategory?: number;
}

const allCategory = {
    "id": 0,
    "name": "All"
}

const CategortyTabs: React.FunctionComponent<Props> = ({ setSelectedCategory, selectedCategory }) => {
    const dispatch: AppDispatch = useDispatch();

    const CategoryLoaded = useSelector(categoryLoaded);
    const CategoryList = useSelector(categoryList);

    const [selected, setSelected] = useState(0);

    const handleSelect = (item: { id: number; }) => {
        setSelectedCategory(item.id);
        setSelected(item.id);
    };

    useEffect(() => {
        if (!CategoryLoaded) {
            dispatch(fetchCategories());
        } else {
            setSelected(selectedCategory || 0);
        }
    }, [CategoryLoaded])

    const categoryItems = ({ item }: { item: any }) => {
        return (
            <View style={{ marginRight: HP(6) }}>
                <TouchableOpacity
                    onPress={() => handleSelect(item)}
                    style={{}}
                >
                    <LinearGradient
                        colors={selected === item.id ? colorsBG[0] : colorsBG[1]}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.categoryBox, { borderColor: selected === item.id ? COLORS.HOME_ICONS : "#D0D0D0" }]}
                    >
                        <Text style={{ ...styles.categoryText, color: selected === item.id ? COLORS.WHITE : COLORS.BLACK, fontFamily: selected === item.id ? "RalewaySemiBold" : "RalewayRegular" }}>{item.name}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View>
            {CategoryLoaded ? (
                <FlatList
                    data={[allCategory, ...CategoryList]}
                    renderItem={categoryItems}
                    contentContainerStyle={{}}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            ) : (<CategoryTabsLoaderSection />)}
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