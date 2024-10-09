import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { globalStyle } from '../../../utils/GlobalStyle';
import { HP, VP } from '../../../utils/Responsive';
import Icon, { Icons } from '../../../components/Icons';
import { TextStyles } from '../../../utils/TextStyles';
import { COLORS } from '../../../utils/Constants';
import SearchBoxSection from '../../../components/home-sections/SearchBox';
import CategortyTabsSection from '../../../components/home-sections/CategortyTabs';
import MenuItemsSection from '../../../components/items/MenuItems';
import CartLayout from '../../../components/cart/CartLayout';
import { getItemList, getItemListWithSignal } from '../../../utils/ApiCall';
import FilterBoxSection from '../../../components/items/FilterBoxSection';
import { useDispatch, useSelector } from 'react-redux';
import { cuisineList, cuisineLoaded, fetchCuisine, getFilters, priceRangeFilter, resetFilter, setCuisineList, setFilters } from '../../../redux/features/items';
import FilterAppliedTabs from '../../../components/items/FilterAppliedTabs';
import CategoryBox from '../../../components/item-filters/CategoryBox';
import { AppDispatch } from '../../../redux/store';
import FilterAppliedTabsV1 from '../../../components/items/FilterAppliedTabsV1';
import ItemVerticalBoxSection from '../../../components/home-sections/ItemVerticalBox';
import SearchBoxItemsSection from '../../../components/home-sections/SearchBoxItems';

function MenuScreenV2({ route, navigation }: { route: any, navigation: any }): React.JSX.Element {
    const { cuisineId } = route.params;

    const dispatch: AppDispatch = useDispatch();

    const filterList = useSelector(getFilters);
    const PriceRangeFilter = useSelector(priceRangeFilter);

    const CuisineList = useSelector(cuisineList);
    const CuisineLoaded = useSelector(cuisineLoaded);

    const [selectedCategory, setSelectedCategory] = useState(0);
    const [itemList, setItemList] = useState([]);
    const [loader, setLoader] = useState(false);

    const setSelectedCategoryhandler = (id: number) => {
        setSelectedCategory(id);
    }

    const fetchItem = async (signal: AbortSignal) => {
        try {
            setLoader(true);

            const priceParams = PriceRangeFilter['maxValue'] > 0 ? { maxPrice: PriceRangeFilter['maxValue'], minPrice: PriceRangeFilter['minValue'] } : {};

            const categoryParams = { categoryIds: selectedCategory > 0 ? selectedCategory : '' }
            const dietaryParams = { dietaryIds: filterList['dietaries'].length > 0 ? filterList['dietaries'] : '' }
            const cuisineParams = { cuisineIds: filterList['cuisine'].length > 0 ? filterList['cuisine'] : '' }
            const popularItemParams = { itemIds: filterList['popularItems'].length > 0 ? filterList['popularItems'] : '' }

            const params = { ...categoryParams, ...dietaryParams, ...cuisineParams, ...priceParams, ...popularItemParams };

            const response = await getItemListWithSignal(params, 10, 0, signal);

            if (!signal.aborted) {
                setItemList(response.data);
            }

            setLoader(false);
        } catch (err) {
            setLoader(false);
            if (!signal.aborted) {
                setItemList([]);
            }
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
        fetchItem(controller?.signal); // Pass the signal to the fetch function

        return () => {
            // Cleanup the previous API call if a new one is made
            controller.abort();
        };
    }, [selectedCategory, JSON.stringify(filterList), JSON.stringify(PriceRangeFilter)])

    return (
        <OuterLayout containerStyle={globalStyle.containerStyle}>
            <InnerBlock>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingVertical: HP(20), marginBottom: VP(79) }}>
                        {/* Top Navigation */}
                        <View style={{ paddingHorizontal: HP(21) }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    style={{ alignSelf: "center" }}
                                >
                                    <Icon type={Icons.Feather} size={18} name={`chevron-left`} color={COLORS.BLACK} />
                                </TouchableOpacity>
                                <Text style={styles.topHeading}>Menu</Text>
                            </View>
                        </View>

                        {/* Search and filter Box */}
                        <View style={{ marginTop: HP(24), paddingHorizontal: HP(18), flexDirection: "row", alignItems: "center", gap: HP(10), justifyContent: "space-between" }}>
                            <SearchBoxItemsSection navigation={navigation} />

                            <FilterBoxSection navigation={navigation} />
                        </View>

                        {/* Category box tab */}
                        <View style={{ marginTop: VP(26.29), paddingLeft: HP(21) }}>
                            <CategoryBox selectHandler={setSelectedCategoryhandler} />
                        </View>

                        <View style={styles.line}></View>

                        {/* Area for applied filters */}
                        <View style={{ paddingHorizontal: HP(18) }}>
                            <FilterAppliedTabs />
                        </View>

                        {/* Menu Items */}
                        <View style={{ marginTop: VP(15.59), paddingHorizontal: HP(15) }}>
                            <ItemVerticalBoxSection data={itemList} dataLoaded={loader} navigation={navigation} />
                        </View>

                        {/* Bottom Text */}
                        <View style={{ marginTop: VP(41) }}>
                            <Text style={{ ...TextStyles.POPPINS_BOLD, fontSize: HP(40), color: "#898989", lineHeight: HP(47), textAlign: "center" }}>"Indulge your cravings."</Text>
                        </View>
                    </View>
                </ScrollView>
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