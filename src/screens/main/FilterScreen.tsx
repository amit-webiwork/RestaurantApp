import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, ScrollView } from 'react-native-gesture-handler';

import { FS, HP, VP } from '../../utils/Responsive.ts';
import { COLORS } from '../../utils/Constants.ts';
import { TextStyles } from '../../utils/TextStyles.ts';
import Icon, { Icons } from '../../components/Icons';
import PopularItemsSection from '../../components/item-filters/PopularItems.tsx';
import DietaryPreferencesSection from '../../components/item-filters/DietaryPreferences.tsx';
import CuisineSection from '../../components/item-filters/Cuisine.tsx';
import PriceRangeSection from '../../components/item-filters/PriceRange.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { cuisineList, cuisineLoaded, dietaryList, dietaryLoaded, fetchCuisine, fetchDietaries, getFilters, setFilters } from '../../redux/features/items.ts';
import { AppDispatch } from '../../redux/store.ts';

const popular_items = ["brown sugar milk tea (fresh milk)", "brownie with ice cream", "nutella waffle", "watermelon juice", "Fudge Walnut Brownie", "pearl milk tea"];

function FilterScreen({ route, navigation }: { route: any; navigation: any; }): React.JSX.Element {

    const dispatch: AppDispatch = useDispatch();

    const DietaryList = useSelector(dietaryList);
    const DietaryLoaded = useSelector(dietaryLoaded);

    const CuisineList = useSelector(cuisineList);
    const CuisineLoaded = useSelector(cuisineLoaded);

    const filterList = useSelector(getFilters);

    const [dietaryListState, setDietaryList] = useState<any[]>([]);

    const [cuisineListState, setCuisineList] = useState<any[]>([]);

    const [itemClicked, setItemClicked] = useState(-1);

    const [priceRange, setPriceRange] = useState([50, 300]);

    const handleGestureEvent = () => {
        // Handle vertical gesture, track movement
    };

    const handleStateChange = (event: { nativeEvent: { translationY: number; }; }) => {
        // console.log(event.nativeEvent.translationY, '---translationY')
        if (event.nativeEvent.translationY > 100) {
            navigation.goBack();  // Close the modal if the swipe is significant
        }
    };

    const setDietaryChecked = (id: number) => {
        setDietaryList((prevList: any[]) =>
            prevList.map((item, i) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };

    const setCuisineChecked = (id: number) => {
        setCuisineList(prevList =>
            prevList.map((item, i) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };

    const onRangeChange = (values: React.SetStateAction<number[]>) => {
        setPriceRange(values);
    };

    const itemClickedHandler = (id: React.SetStateAction<number>) => {
        setItemClicked(id);
    }

    const filterApply = () => {
        dispatch(setFilters({ key: "dietaries", data: dietaryListState.filter((d) => d.checked === true).map(d => d.id) }));

        dispatch(setFilters({ key: "cuisine", data: cuisineListState.filter((d) => d.checked === true).map(d => d.id) }));

        navigation.goBack();
    }

    useEffect(() => {
        if (!DietaryLoaded) {
            dispatch(fetchDietaries());
        } else {
            setDietaryList(DietaryList.map((d: any) => { return { ...d, "checked": filterList['dietaries'].includes(d.id) ? true : false } }))
        }
    }, [DietaryLoaded])


    useEffect(() => {
        if (!CuisineLoaded) {
            dispatch(fetchCuisine());
        } else {
            setCuisineList(CuisineList.map((d: any) => { return { ...d, "checked": filterList['cuisine'].includes(d.id) ? true : false } }))
        }
    }, [CuisineLoaded])

    return (
        <GestureHandlerRootView>
            <PanGestureHandler
                onGestureEvent={handleGestureEvent} // Add a gesture handler to capture swipes
                onHandlerStateChange={handleStateChange}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.main}>
                        <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
                            {/* Top navigation */}
                            <View style={styles.top}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    style={{}}
                                >
                                    <Icon type={Icons.Feather} size={18} name="chevron-left" color={COLORS.BLACK} />
                                </TouchableOpacity>

                                <Text style={styles.headingText}>filters</Text>

                                <TouchableOpacity onPress={filterApply} style={{}}>
                                    <Text style={[styles.headingText, { fontSize: 14 }]}>done</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Popular Items */}
                            <View style={{ marginTop: VP(1.76), paddingHorizontal: HP(24) }}>
                                <Text style={styles.headingFilterText}>popular items</Text>

                                <View style={{ marginTop: VP(14) }}>
                                    <PopularItemsSection items={popular_items} clickHandler={itemClickedHandler} />
                                </View>
                            </View>

                            <View style={styles.line}></View>

                            {/* Dietary Preferences */}
                            <View style={{ paddingHorizontal: HP(24) }}>
                                <Text style={styles.headingFilterText}>dietary preferences</Text>

                                <View style={{ marginTop: VP(17) }}>
                                    <DietaryPreferencesSection items={dietaryListState} clickHandler={setDietaryChecked} checkboxContainerStyle={styles.checkboxContainer} checkboxStyle={styles.checkbox} labelStyle={styles.dietaryText} checkedBoxStyle={styles.checkedBox} />
                                </View>
                            </View>

                            <View style={styles.line}></View>

                            {/* Cuisine */}
                            <View style={{ paddingHorizontal: HP(24) }}>
                                <Text style={styles.headingFilterText}>cuisine</Text>

                                <View style={{ marginTop: VP(17) }}>
                                    <CuisineSection items={cuisineListState} clickHandler={setCuisineChecked} checkboxContainerStyle={styles.checkboxContainer} checkboxStyle={styles.checkbox} labelStyle={styles.dietaryText} checkedBoxStyle={styles.checkedBox} />
                                </View>
                            </View>

                            <View style={styles.line}></View>

                            {/* price range */}
                            <View style={{ paddingHorizontal: HP(24) }}>
                                <PriceRangeSection headingTextStyle={styles.headingFilterText} onRangeChange={onRangeChange} />
                            </View>

                        </ScrollView>
                    </View>
                </View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',  // Aligns to the bottom
        backgroundColor: 'rgba(0,0,0,0.2)',  // Semi-transparent background
    },
    main: {
        height: '80%',
        width: '100%',
        backgroundColor: '#FFF9F9',
        borderTopLeftRadius: HP(30),
        borderTopRightRadius: HP(30),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 4,
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: HP(28),
        paddingHorizontal: HP(18)
    },
    headingText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        textTransform: 'capitalize',
        textAlign: 'center',
    },
    headingFilterText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        textTransform: 'uppercase',
        fontSize: 14,
        color: "#656565"
    },
    line: {
        height: 5,
        flex: 1,
        backgroundColor: "#EDEDED",
        marginVertical: VP(24)

    },
    dietaryText: {
        ...TextStyles.RALEWAY_MEDIUM,
        textTransform: 'capitalize',
        fontSize: 10.17
    },
    checkboxContainer: {
        flexBasis: "50%",
        paddingBottom: HP(11),
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: "wrap"
    },
    checkbox: {
        width: FS(15.89),
        height: VP(15.89),
        borderWidth: 1,
        borderColor: '#FFAFF6',  // Border color for the checkbox
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: HP(6.11),
        borderRadius: HP(2.96)
    },
    checkedBox: {
        width: FS(9.54),
        height: VP(9.54),
        backgroundColor: '#FF00E2'
    }
});

export default FilterScreen;