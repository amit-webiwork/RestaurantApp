import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import { FS, HP, VP } from '../../utils/Responsive.ts';
import { COLORS } from '../../utils/Constants.ts';
import { TextStyles } from '../../utils/TextStyles.ts';
import { ButtonSection as Button } from '../../components/Button.tsx';
import SearchBoxSection from '../../components/home-sections/SearchBox.tsx';
import CategoryBoxSection from '../../components/home-sections/CategoryBox.tsx';
import PromotionalBoxSection from '../../components/home-sections/PromotionalBox.tsx';
import CategortyTabsSection from '../../components/home-sections/CategortyTabs.tsx';
import BannerOneSection from '../../components/home-sections/BannerOne.tsx';
import FeatureCategoryBoxSection from '../../components/home-sections/FeatureCategoryBox.tsx';
import BannerTwoSection from '../../components/home-sections/BannerTwo.tsx';
import ItemVerticalBoxSection from '../../components/home-sections/ItemVerticalBox.tsx';
import Icon, { Icons } from '../../components/Icons';
import ItemBoxSection from '../../components/home-sections/ItemBox.tsx';
import HeadingSection from '../../components/Heading.tsx';
import { categoryData } from '../../utils/MockData.ts';
import { fetchPopularItems, getFeaturedCategory, papularItemLoaded, papularItems } from '../../redux/features/items.ts';
import { AppDispatch } from '../../redux/store.ts';
import Right from '../../assets/svgs/right.svg';
import { globalStyle } from '../../utils/GlobalStyle.ts';

function HomeScreen({ navigation }: { navigation: any }): React.JSX.Element {
    const dispatch: AppDispatch = useDispatch();

    const PapularItemLoaded = useSelector(papularItemLoaded);
    const PapularItems = useSelector(papularItems);
    const featuredCategory = useSelector(getFeaturedCategory);

    const [searchText, setSearchText] = useState<any>("");

    const [selectedCategory, setSelectedCategory] = useState<number>(1);
    const [itemListFiltered, setItemListFiltered] = useState<any[]>([]);

    const selectCategoryHandler = useCallback((id: number) => {
        setSelectedCategory(id);

        // find in items
        const filtered = PapularItems.filter(item => (item?.category_id === id || id === 0));

        setItemListFiltered(filtered);
    }, [PapularItems]);

    const setSearchTextHandler = (e: any) => {
        setSearchText(e);
    }

    useEffect(() => {
        if (!PapularItemLoaded) {
            dispatch(fetchPopularItems());
        } else {
            setItemListFiltered(PapularItems);
        }
    }, [PapularItemLoaded])

    return (
        <>
            <View style={{ flex: 1 }}>
                <LinearGradient
                    colors={['#24112F', '#EB05D0', '#403966']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", }}
                >
                    <View style={{ flex: 1 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* Top banner area */}
                            <View style={{ flexDirection: "row", flex: 1, }}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate(`NotificationScreen`)}
                                    style={{ position: "absolute", marginVertical: HP(20), right: HP(20) }}
                                >
                                    <Icon type={Icons.Feather} size={18} name={`bell`} color={COLORS.WHITE} />
                                </TouchableOpacity>
                                <View style={{ flexBasis: "35%", gap: HP(13) }}>
                                    <View style={{ left: HP(17), marginTop: VP(30) }}>
                                        <Text style={{ ...TextStyles.ARCHITECTS_DAUGHTER_REGULAR, color: COLORS.WHITE, fontSize: HP(30) }}>
                                            not your
                                            average
                                            bubble
                                            tea.
                                        </Text>
                                    </View>
                                    <View style={{ left: HP(17), marginTop: VP(13) }}>
                                        <Button
                                            text={'BUY NOW >'}
                                            onPress={() => void (0)}
                                            textStyle={styles.buttonStyle}
                                            activeButtonText={{ opacity: .65 }}
                                            mainContainerStyle={{ borderRadius: FS(16) }}
                                            LinearGradienrColor={["#FFFFFF", "#FFFFFF"]}
                                            contentContainerStyle={{ top: -2 }}
                                            style={{ width: FS(104), height: FS(30) }}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexBasis: "65%", marginVertical: VP(50) }}>
                                    <Image source={require('../../assets/images/bubble-tea-boba-milk-tea.png')} style={styles.icon} />
                                </View>
                            </View>

                            {/* Under bottom area */}
                            <View style={styles.itemContainer}>
                                <View style={{ flex: 1, marginVertical: VP(48), }}>

                                    {/* Search Box */}
                                    <View style={{ marginHorizontal: HP(20), flexDirection: "row", alignItems: "center", gap: HP(10), justifyContent: "space-between" }}>
                                        <SearchBoxSection setHandler={setSearchTextHandler} navigation={navigation} />

                                        <TouchableOpacity
                                            onPress={() => navigation.navigate(`FilterScreen`)}
                                            style={globalStyle.filterIconContainer}
                                        >
                                            <Image source={require(`../../assets/icons/filter.png`)} style={[globalStyle.filterIconRight]} />
                                        </TouchableOpacity>
                                    </View>

                                    {/* Category Boxes */}
                                    <View style={{ marginTop: VP(27), marginHorizontal: HP(17) }}>
                                        <CategoryBoxSection navigation={navigation} />
                                    </View>

                                    {/* Promotional Box */}
                                    <View style={{ marginTop: VP(23), marginHorizontal: HP(21) }}>
                                        <View style={styles.subContainer}>
                                            <Text style={styles.heading}>
                                                De lounge Popular {featuredCategory && featuredCategory?.name ? featuredCategory.name : `items`}
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate(`PopularMenuScreen`, {
                                                    categoryId: featuredCategory && featuredCategory?.id ? featuredCategory.id : 0,
                                                    name: featuredCategory && featuredCategory?.name ? featuredCategory.name : `Items`
                                                })}
                                                style={styles.headingRightContainer}
                                            >
                                                <Text style={styles.headingRightTitleStyle}>view all</Text>
                                                <Right width={FS(12)} height={VP(12)} />
                                            </TouchableOpacity>
                                        </View>
                                        <PromotionalBoxSection navigation={navigation} />
                                    </View>

                                    {/* Heading Menu */}
                                    <View style={{ marginTop: VP(37), marginHorizontal: HP(21) }}>
                                        <HeadingSection title={`MENU`} />
                                    </View>

                                    {/* Category Tabs */}
                                    <View style={{ marginTop: VP(24.66), marginHorizontal: HP(21) }}>
                                        <CategortyTabsSection setSelectedCategory={selectCategoryHandler} />
                                    </View>

                                    {/* Item Boxes */}
                                    <View style={{ marginTop: VP(20), marginHorizontal: HP(21) }}>
                                        <ItemBoxSection data={itemListFiltered} dataLoaded={PapularItemLoaded} navigation={navigation} />
                                    </View>

                                    {/* Banner One */}
                                    <View style={{ marginTop: VP(31.66), marginHorizontal: HP(16) }}>
                                        <BannerOneSection />
                                    </View>

                                    {/* Heading Section */}
                                    <View style={{ marginTop: VP(32.87), marginHorizontal: HP(21) }}>
                                        <HeadingSection textStyle={{ textTransform: "uppercase" }} title={`Kylie, what’s on your mind?`} />
                                    </View>

                                    {/* Feature Category Boxes */}
                                    <View style={{ marginTop: VP(20), marginHorizontal: HP(16) }}>
                                        <FeatureCategoryBoxSection />
                                    </View>

                                    {/* Banner Two */}
                                    <View style={{ marginTop: VP(20) }}>
                                        <BannerTwoSection />
                                    </View>

                                    {/* Heading Section */}
                                    <View style={{ marginTop: VP(32.87), marginHorizontal: HP(20) }}>
                                        <HeadingSection textStyle={{ fontSize: 16, textTransform: "capitalize" }} title={`"Sip and savor 50+ drinks and desserts"`} />
                                    </View>

                                    {/* Item Vertical Boxes */}
                                    <View style={{ marginTop: VP(22), marginHorizontal: HP(11) }}>
                                        <ItemVerticalBoxSection />
                                    </View>

                                    {/* Bottom Heading */}
                                    <View style={{ marginTop: VP(53) }}>
                                        <Text style={{ ...TextStyles.POPPINS_BOLD, fontSize: HP(40), color: "#898989", lineHeight: HP(47), textAlign: "center" }}>"Indulge your cravings."</Text>
                                    </View>
                                </View>
                                <View style={{ height: VP(30), backgroundColor: "#FDFDFD", bottom: VP(-30) }}>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </LinearGradient >
            </View >
        </>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: "#FDFDFD",
        flex: 2,
        // borderTopLeftRadius: 60,
        top: VP(-100),
    },
    icon: {
        // width: FS(260.97),
        // height: VP(284.76),
        width: FS(300.97),
        height: VP(294.76),
        resizeMode: "contain",
        zIndex: 1,
    },
    buttonStyle: {
        ...TextStyles.LEXEND_REGULAR,
        textTransform: "uppercase",
    },
    line: {
        height: 1,
        width: "100%",
        flex: 1,
        flexGrow: 1
    },
    subContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    heading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 18,
        textTransform: "capitalize"
    },
    headingRightContainer: {
        flexDirection: "row",
        gap: HP(2),
        alignItems: 'center',
        justifyContent: 'center'
    },
    headingRightTitleStyle: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: HP(12),
        textTransform: "capitalize",
    },
});

export default HomeScreen;