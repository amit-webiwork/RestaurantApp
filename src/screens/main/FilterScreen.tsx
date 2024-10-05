import React, { useState } from 'react';
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

const popular_items = ["brown sugar milk tea (fresh milk)", "brownie with ice cream", "nutella waffle", "watermelon juice", "Fudge Walnut Brownie", "pearl milk tea"];

const dietary_preferences = ["vegan", "sugar free", "vegetarian", "nut free", "non-vegetarian", "keto friendly", "gluten free", "low calorie", "soy free", "kosher"];

const cuisine = ["Italian", "American", "Chinese", " Spanish", "Indian", "Middle Eastern", "Mexican", "Vietnamese", "French"];

function FilterScreen({ navigation }: { navigation: any; }): React.JSX.Element {
    const [dietaryList, setDietaryList] = useState(dietary_preferences.map(d => { return { "name": d, "checked": false } }));

    const [cuisineList, setCuisineList] = useState(cuisine.map(d => { return { "name": d, "checked": false } }));

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

    const setDietaryChecked = (index: number) => {
        setDietaryList(prevList =>
            prevList.map((item, i) =>
                i === index ? { ...item, checked: !item.checked } : item
            )
        );
    };

    const setCuisineChecked = (index: number) => {
        setCuisineList(prevList =>
            prevList.map((item, i) =>
                i === index ? { ...item, checked: !item.checked } : item
            )
        );
    };

    const onRangeChange = (values: React.SetStateAction<number[]>) => {
        setPriceRange(values);
    };

    const itemClickedHandler = (id) => {
        setItemClicked(id);
    }

    return (
        <GestureHandlerRootView>
            <PanGestureHandler
                onGestureEvent={handleGestureEvent} // Add a gesture handler to capture swipes
                onHandlerStateChange={handleStateChange}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.main}>
                        <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
                            <View style={styles.top}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    style={{}}
                                >
                                    <Icon type={Icons.Feather} size={18} name="chevron-left" color={COLORS.BLACK} />
                                </TouchableOpacity>

                                <Text style={styles.headingText}>filters</Text>

                                <TouchableOpacity onPress={() => navigation.goBack()} style={{}}>
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
                                    <DietaryPreferencesSection items={dietaryList} clickHandler={setDietaryChecked} checkboxContainerStyle={styles.checkboxContainer} checkboxStyle={styles.checkbox} labelStyle={styles.dietaryText} checkedBoxStyle={styles.checkedBox} />
                                </View>
                            </View>

                            <View style={styles.line}></View>

                            {/* Cuisine */}
                            <View style={{ paddingHorizontal: HP(24) }}>
                                <Text style={styles.headingFilterText}>cuisine</Text>

                                <View style={{ marginTop: VP(17) }}>
                                    <CuisineSection items={cuisineList} clickHandler={setCuisineChecked} checkboxContainerStyle={styles.checkboxContainer} checkboxStyle={styles.checkbox} labelStyle={styles.dietaryText} checkedBoxStyle={styles.checkedBox} />
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