import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { globalStyle } from '../../../utils/GlobalStyle';
import { FS, HP, VP } from '../../../utils/Responsive';
import Icon, { Icons } from '../../../components/Icons';
import { TextStyles } from '../../../utils/TextStyles';
import { COLORS } from '../../../utils/Constants';
import CategortyTabsSection from '../../../components/home-sections/CategortyTabs';
import MenuItemsSection from '../../../components/items/MenuItems';
import CartLayout from '../../../components/cart/CartLayout';
import { getItemList } from '../../../utils/ApiCall';
import FilterBoxSection from '../../../components/items/FilterBoxSection';
import { useSelector } from 'react-redux';
import { getFilters, priceRangeFilter } from '../../../redux/features/items';
import FilterAppliedTabs from '../../../components/items/FilterAppliedTabs';
import SearchBoxItemsSection from '../../../components/home-sections/SearchBoxItems';

interface HeaderProps {
    setSelectedCategoryhandler: any;
    selectedCategory: any;
    loading: boolean;
    navigation: any;
}

const limit = 10;

const HeaderComponent = ({ setSelectedCategoryhandler, selectedCategory, loading, navigation }: HeaderProps) => {
    return (
        <>
            {/* Top Navigation */}
            <View style={{ paddingHorizontal: HP(21), paddingVertical: HP(20), }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ alignSelf: "center" }}
                    >
                        <Icon type={Icons.Feather} size={FS(18)} name={`chevron-left`} color={COLORS.BLACK} />
                    </TouchableOpacity>
                    <Text style={styles.topHeading}>Menu</Text>
                </View>
            </View>
            {/* Category box tab */}
            <View style={{ marginTop: VP(7), paddingLeft: HP(21) }}>
                <CategortyTabsSection setSelectedCategory={setSelectedCategoryhandler} selectedCategory={selectedCategory} loading={loading} />
            </View>

            {/* Search and filter Box */}
            <View style={{ marginTop: HP(24), paddingHorizontal: HP(18), flexDirection: "row", alignItems: "center", gap: HP(10), justifyContent: "space-between" }}>
                <SearchBoxItemsSection navigation={navigation} />

                <FilterBoxSection navigation={navigation} loading={loading} />
            </View>

            {/* Area for applied filters */}
            <View style={{ paddingHorizontal: HP(18), marginBottom: VP(15.59) }}>
                <FilterAppliedTabs loading={loading} />
            </View>
        </>
    )
}

function MenuScreen({ route, navigation }: { route: any, navigation: any }): React.JSX.Element {
    const { categoryId } = route.params;

    const filterList = useSelector(getFilters);
    const PriceRangeFilter = useSelector(priceRangeFilter);

    const [selectedCategory, setSelectedCategory] = useState(categoryId);
    const [itemList, setItemList] = useState<any[]>([]);
    const [loader, setLoader] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [hasMoreData, setHasMoreData] = useState<boolean>(true);

    const [filterState, setFilterState] = useState<any>({});
    const [priceRangeFilterState, setPriceRangeFilterState] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);

    const setSelectedCategoryHandler = useCallback((id: number) => {
        setLoading(true);
        setPage(1);
        setItemList([]);
        setHasMoreData(true);
        setSelectedCategory(id);
    }, [setLoading, setPage, setItemList, setHasMoreData, setSelectedCategory]);

    useEffect(() => {
        console.log('run');
        fetchItem(page);
    }, [page, selectedCategory, JSON.stringify(filterState), JSON.stringify(priceRangeFilterState)])

    const fetchItem = async (page: number) => {
        if (loader || !hasMoreData) return;

        setLoader(true);
        try {

            const priceParams = PriceRangeFilter['maxValue'] > 0 ? { maxPrice: PriceRangeFilter['maxValue'], minPrice: PriceRangeFilter['minValue'] } : {};

            const categoryParams = { categoryIds: selectedCategory > 0 ? selectedCategory : '' }
            const dietaryParams = { dietaryIds: filterList['dietaries'].length > 0 ? filterList['dietaries'] : '' }
            const cuisineParams = { cuisineIds: filterList['cuisine'].length > 0 ? filterList['cuisine'] : '' }
            const popularItemParams = { itemIds: filterList['popularItems'].length > 0 ? filterList['popularItems'] : '' }

            const params = { ...categoryParams, ...dietaryParams, ...cuisineParams, ...priceParams, ...popularItemParams };
            
            const offset = (page - 1) * limit;

            const response = await getItemList(params, limit, offset);

            if (response?.data?.length > 0) {
                setItemList(prev => [...prev, ...response?.data || []]);
            } else {
                setHasMoreData(false); // No more data to fetch
            }
        } catch (err) {
            setHasMoreData(false); // No more data to fetch
        } finally {
            setLoader(false);
            setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        setPage(1);
        setItemList([]); // Clear the current orders
        setHasMoreData(true); // Reset to allow more data fetching
        setFilterState(filterList);
        setPriceRangeFilterState(PriceRangeFilter);
    }, [JSON.stringify(filterList), JSON.stringify(PriceRangeFilter)])

    const loadMoreItems = useCallback(() => {
        if (!loader && hasMoreData) {
            setLoading(true);
            setPage(prevPage => prevPage + 1); // Increment page to fetch more data
        }
    }, [loader, hasMoreData, setLoading, setPage]);

    return (
        <OuterLayout containerStyle={[globalStyle.containerStyle]}>
            <InnerBlock>
                <View style={{ marginBottom: VP(0), flex: 1 }}>

                    {/* Menu Items */}
                    <View style={{ marginTop: VP(0), flex: 1 }}>
                        <MenuItemsSection
                            data={itemList}
                            dataLoaded={loader}
                            loadMore={loadMoreItems}
                            hasMoreData={hasMoreData}
                            loading={loading}
                            scrollEnabled={true}
                            navigation={navigation}
                            HeaderComponent={HeaderComponent}
                            setSelectedCategoryhandler={setSelectedCategoryHandler}
                            selectedCategory={selectedCategory}
                            columnWrapperStyle={{ paddingHorizontal: HP(15) }}
                        />
                    </View>
                </View>
            </InnerBlock>
            <CartLayout children={undefined} navigation={navigation}></CartLayout>
        </OuterLayout>
    )
}

const styles = StyleSheet.create({
    topHeading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: "#000000",
        fontSize: 18,
        textTransform: "capitalize",
        textAlign: "center",
        flex: 1
    },
});

export default MenuScreen;