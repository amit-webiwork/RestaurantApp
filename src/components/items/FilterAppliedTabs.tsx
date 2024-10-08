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

import { HP, VP } from '../../utils/Responsive';
import { COLORS } from '../../utils/Constants';
import { categoryList, categoryLoaded, fetchCategories, getAppliedFilterArray, getFilters, priceRangeFilter, removeFilter, removeFromRangeFilter, resetFilter } from '../../redux/features/items';
import CategoryTabsLoaderSection from '../skeleton/CategoryTabsLoader';
import { AppDispatch } from '../../redux/store';
import Icon, { Icons } from '../Icons';

interface Props {
}

const FilterAppliedTabs: React.FunctionComponent<Props> = () => {
    const dispatch: AppDispatch = useDispatch();

    const filterList = useSelector(getAppliedFilterArray);
    const PriceRangeFilter = useSelector(priceRangeFilter);

    const [filterData, setFilterData] = useState<any[]>([]);

    const removeFromFilter = (type: string, id: number) => {
        dispatch(removeFilter({ key: type, data: id }))
    }

    const resetAll = () => {
        dispatch(resetFilter())
    }

    const resetRangeFilter = () => {
        dispatch(removeFromRangeFilter())
    }

    useEffect(() => {
        setFilterData(filterList);
    }, [JSON.stringify(filterList)])

    const filterItems = ({ item }: { item: any }) => {
        return (
            <View style={{ marginRight: HP(6) }}>
                <TouchableOpacity
                    onPress={() => removeFromFilter(item.type, item.id)}
                    style={{}}
                >
                    <LinearGradient
                        colors={["#D3219B1A", "#D3219B1A"]}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.categoryBox]}
                    >
                        <Text style={styles.categoryText} > {item.name}</Text>

                        <Icon
                            type={Icons.Feather}
                            size={14}
                            name={'x'}
                            color={COLORS.PLACEHOLDER_COLOR} />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", gap: HP(10) }}>
            {filterList.length > 0 && (
                <TouchableOpacity
                    onPress={resetAll}
                    style={{ paddingTop: HP(9), flexDirection: "row", gap: HP(10) }}
                >
                    <Text style={[styles.categoryText, {
                        textDecorationLine: "underline",
                        textDecorationStyle: "solid"
                    }]}>Clear</Text>
                    <Text style={[styles.categoryText, { color: COLORS.PLACEHOLDER_COLOR }]}>|</Text>
                </TouchableOpacity>
            )}
            {PriceRangeFilter['maxValue'] > 0 && (
                <View style={{}}>
                    <TouchableOpacity
                        onPress={resetRangeFilter}
                        style={{ marginTop: VP(24) }}
                    >
                        <LinearGradient
                            colors={["#D3219B1A", "#D3219B1A"]}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[styles.categoryBox]}
                        >
                            <Text style={styles.categoryText}>$ {PriceRangeFilter['minValue']} - {PriceRangeFilter['maxValue']}</Text>

                            <Icon
                                type={Icons.Feather}
                                size={14}
                                name={'x'}
                                color={COLORS.PLACEHOLDER_COLOR} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            )}
            <FlatList
                data={filterData}
                renderItem={filterItems}
                keyExtractor={item => { return `filter-${item.type}-${item.id}` }}
                contentContainerStyle={{ marginTop: VP(24) }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    categoryText: {
        fontFamily: "RalewayRegular",
        fontSize: 14,
        textTransform: "capitalize",
        textAlign: "center",
        color: COLORS.BLACK
    },
    categoryBox: {
        justifyContent: "center",
        padding: HP(8),
        borderWidth: 1,
        borderRadius: HP(20),
        borderTopEndRadius: HP(20),
        borderTopStartRadius: HP(20),
        borderBottomStartRadius: HP(20),
        borderBottomEndRadius: HP(20),
        borderColor: "#D0D0D0",
        flexDirection: "row",
        gap: HP(3),
        alignItems: "baseline"
    },
});

const FilterAppliedTabsSection = memo(FilterAppliedTabs);
export default FilterAppliedTabsSection;