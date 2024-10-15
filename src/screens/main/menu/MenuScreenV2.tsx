import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { globalStyle } from '../../../utils/GlobalStyle';
import { FS, HP, VP } from '../../../utils/Responsive';
import Icon, { Icons } from '../../../components/Icons';
import { TextStyles } from '../../../utils/TextStyles';
import { COLORS } from '../../../utils/Constants';
import CartLayout from '../../../components/cart/CartLayout';
import { getItemList, getItemListWithSignal } from '../../../utils/ApiCall';
import FilterBoxSection from '../../../components/items/FilterBoxSection';
import { useDispatch, useSelector } from 'react-redux';
import { cuisineList, cuisineLoaded, fetchCuisine, getFilters, priceRangeFilter, resetFilter, setCuisineList, setFilters } from '../../../redux/features/items';
import FilterAppliedTabs from '../../../components/items/FilterAppliedTabs';
import CategoryBox from '../../../components/item-filters/CategoryBox';
import { AppDispatch } from '../../../redux/store';
import ItemVerticalBoxSection from '../../../components/home-sections/ItemVerticalBox';
import SearchBoxItemsSection from '../../../components/home-sections/SearchBoxItems';

interface HeaderProps {
    setSelectedCategoryhandler: any;
    selectedCategory: any;
    loading: boolean;
    navigation: any;
}

const HeaderComponent = ({ setSelectedCategoryhandler, selectedCategory, loading, navigation }: HeaderProps) => {
    return (
        <>
            {/* Top Navigation */}
            <View style={{ paddingHorizontal: HP(21), paddingVertical: HP(20) }}>
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
            {/* Search and filter Box */}
            <View style={{ marginTop: HP(7), paddingHorizontal: HP(18), flexDirection: "row", alignItems: "center", gap: HP(10), justifyContent: "space-between" }}>
                <SearchBoxItemsSection navigation={navigation} />

                <FilterBoxSection navigation={navigation} loading={loading} />
            </View>

            {/* Category box tab */}
            <View style={{ marginTop: VP(26.29), paddingLeft: HP(21) }}>
                <CategoryBox selectHandler={setSelectedCategoryhandler} loading={loading} />
            </View>

            <View style={styles.line}></View>

            {/* Area for applied filters */}
            <View style={{ paddingHorizontal: HP(18), marginBottom: VP(15.59) }}>
                <FilterAppliedTabs loading={loading} />
            </View>
        </>
    )
}

function MenuScreenV2({ route, navigation }: { route: any, navigation: any }): React.JSX.Element {
    const { cuisineId } = route.params;

    const dispatch: AppDispatch = useDispatch();

    const filterList = useSelector(getFilters);
    const PriceRangeFilter = useSelector(priceRangeFilter);

    const CuisineList = useSelector(cuisineList);
    const CuisineLoaded = useSelector(cuisineLoaded);

    const [selectedCategory, setSelectedCategory] = useState(0);
    const [itemList, setItemList] = useState<any[]>([]);
    const [loader, setLoader] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);

    const [filterState, setFilterState] = useState<any>({});
    const [priceRangeFilterState, setPriceRangeFilterState] = useState<any>({});

    const [hasMoreData, setHasMoreData] = useState<boolean>(true);

    const setSelectedCategoryhandler = (id: number) => {
        setLoading(true)
        setPage(1);
        setItemList([]);
        setHasMoreData(true);
        setSelectedCategory(id);
    }

    const fetchItem = async (page: number, signal: AbortSignal) => {
        if (loader || !hasMoreData) return;
        setLoader(true);

        try {
            const priceParams = PriceRangeFilter['maxValue'] > 0 ? { maxPrice: PriceRangeFilter['maxValue'], minPrice: PriceRangeFilter['minValue'] } : {};

            const categoryParams = { categoryIds: selectedCategory > 0 ? selectedCategory : '' }
            const dietaryParams = { dietaryIds: filterList['dietaries'].length > 0 ? filterList['dietaries'] : '' }
            const cuisineParams = { cuisineIds: filterList['cuisine'].length > 0 ? filterList['cuisine'] : '' }
            const popularItemParams = { itemIds: filterList['popularItems'].length > 0 ? filterList['popularItems'] : '' }

            const params = { ...categoryParams, ...dietaryParams, ...cuisineParams, ...priceParams, ...popularItemParams };

            const limit = 10;
            const offset = (page - 1) * limit;

            // const response = await getItemListWithSignal(params, limit, offset, signal);
            const response = await getItemList(params, limit, offset);

            if (response?.data?.length > 0) {
                setItemList(prev => [...prev, ...response?.data || []]);
            } else {
                setHasMoreData(false); // No more data to fetch
            }

            // if (!signal.aborted) {
            //     // setItemList(response.data);
            //     if (response?.data?.length > 0) {
            //         setItemList(prev => [...prev, ...response?.data || []]);
            //     } else {
            //         setHasMoreData(false); // No more data to fetch
            //     }
            // }

            // setLoader(false);
        } catch (err) {
            // setLoader(false);
            setHasMoreData(false); // No more data to fetch
            // if (!signal.aborted) {
            //     setItemList([]);
            // }
        } finally {
            setLoader(false);
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!CuisineLoaded) {
            dispatch(fetchCuisine());
        } else {
            setCuisineList(CuisineList.map((d: any) => { return { ...d, "checked": filterList['cuisine'].includes(d.id) ? true : false } }))
        }
    }, [CuisineLoaded])

    useEffect(() => {
        if (CuisineLoaded)
            dispatch(setFilters({ key: "cuisine", data: [cuisineId] }));
    }, [cuisineId, CuisineLoaded])

    useEffect(() => {
        console.log('run v1');
        const controller = new AbortController(); // Create an AbortController
        fetchItem(page, controller?.signal); // Pass the signal to the fetch function

        return () => {
            // Cleanup the previous API call if a new one is made
            controller.abort();
        };
    }, [page, selectedCategory, JSON.stringify(filterState), JSON.stringify(priceRangeFilterState)])

    useEffect(() => {
        setLoading(true)
        setPage(1);
        setItemList([]);
        setHasMoreData(true);
        setFilterState(filterList);
        setPriceRangeFilterState(PriceRangeFilter);
    }, [JSON.stringify(filterList), JSON.stringify(PriceRangeFilter)])

    const loadMoreItems = () => {
        if (!loader && hasMoreData) {
            setLoading(true);
            setPage(prevPage => prevPage + 1); // Increment page to fetch more data
        }
    };

    console.log(`---MenuScreenV2 loading`)

    return (
        <OuterLayout containerStyle={globalStyle.containerStyle}>
            <InnerBlock>
                {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                <View style={{ marginBottom: VP(0) }}>
                    {/* Menu Items */}
                    <View style={{}}>
                        <ItemVerticalBoxSection data={itemList} dataLoaded={loader} navigation={navigation} loadMore={loadMoreItems} hasMoreData={hasMoreData} loading={loading} scrollEnabled={true} HeaderComponent={HeaderComponent} setSelectedCategoryhandler={setSelectedCategoryhandler} selectedCategory={selectedCategory} />
                    </View>

                    {/* Bottom Text */}
                    {/* <View style={{ marginTop: VP(41) }}>
                            <Text style={{ ...TextStyles.POPPINS_BOLD, fontSize: HP(40), color: "#898989", lineHeight: HP(47), textAlign: "center" }}>"Indulge your cravings."</Text>
                        </View> */}
                </View>
                {/* </ScrollView> */}
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
    line: {
        height: 2,
        width: "100%",
        flex: 1,
        flexGrow: 1,
        backgroundColor: "#E6E6E6"
    },
});

export default MenuScreenV2;