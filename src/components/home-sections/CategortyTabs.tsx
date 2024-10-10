import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
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
import { useFocusEffect } from '@react-navigation/native';

const colorsBG = [[COLORS.HOME_ICONS, COLORS.HOME_ICONS], [COLORS.BACKGROUND_DEFAULT, COLORS.BACKGROUND_DEFAULT]]

interface Props {
    setSelectedCategory: any;
    selectedCategory: number;
    loading?: boolean;
}

const allCategory = {
    "id": 0,
    "name": "All"
}

const CategortyTabs: React.FunctionComponent<Props> = ({ setSelectedCategory, selectedCategory, loading = false }) => {
    const dispatch: AppDispatch = useDispatch();

    const flatListRef = useRef<any>();

    const CategoryLoaded = useSelector(categoryLoaded);
    const CategoryList = useSelector(categoryList);

    // const [selected, setSelected] = useState(0);

    const handleSelect = (item: { id: number; }) => {
        setSelectedCategory(item.id);
        // setSelected(item.id);
    };

    const getItemLayout = (data: any, index: number) => ({
        length: 40,
        offset: 40 * index,
        index,
    })

    useFocusEffect(
        useCallback(() => {
            const key = CategoryList.findIndex(d => d.id === selectedCategory);
            scrollToIndex(key > -1 ? key : 0)
        }, [CategoryList])
    )

    const scrollToIndex = (index: number) => {
        flatListRef?.current?.scrollToIndex({
            animated: true,
            index: index,
        });
    }

    useEffect(() => {
        if (!CategoryLoaded) {
            dispatch(fetchCategories());
        } else {
            setSelectedCategory(selectedCategory || 0);
        }
    }, [CategoryLoaded])

    const categoryItems = ({ item }: { item: any }) => {
        return (
            <View style={{ marginRight: HP(6) }}>
                <TouchableOpacity
                    onPress={() => handleSelect(item)}
                    style={{}}
                    disabled={loading ? true : false}
                >
                    <LinearGradient
                        colors={selectedCategory === item.id ? colorsBG[0] : colorsBG[1]}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.categoryBox, { borderColor: selectedCategory === item.id ? COLORS.HOME_ICONS : "#D0D0D0" }]}
                    >
                        <Text style={{ ...styles.categoryText, color: selectedCategory === item.id ? COLORS.WHITE : COLORS.BLACK, fontFamily: selectedCategory === item.id ? "RalewaySemiBold" : "RalewayRegular" }}>{item.name}</Text>
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
                    ref={flatListRef}
                    getItemLayout={getItemLayout}
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