import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import OuterLayout from '../../components/OuterLayout';
import { globalStyle } from '../../utils/GlobalStyle';
import InnerBlock from '../../components/InnerBlock';
import { FS, HP, VP } from '../../utils/Responsive';
import Icon, { Icons } from '../../components/Icons';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';
import SearchBoxSection from '../../components/home-sections/SearchBox';
import LinearGradient from 'react-native-linear-gradient';
import { AppDispatch } from '../../redux/store';
import { categoryList, categoryLoaded, fetchCategories } from '../../redux/features/items';
import CategoryItemLoaderSection from '../../components/skeleton/CategoryItemLoader';

const colorsBG = [["#FFDBFB99", "#FFDBFB99"], ["#DFE1FB99", "#DFE1FB99"], ["#CFF4C399", "#CFF4C399"], ["#FDD6D699", "#FDD6D699"]];

function CategoryScreen({ navigation }: { navigation: any }): React.JSX.Element {
    const dispatch: AppDispatch = useDispatch();

    const CategoryLoaded = useSelector(categoryLoaded);
    const CategoryList = useSelector(categoryList);

    const [searchText, setSearchText] = useState<any>("");
    const [categoryListFiltered, setCategoryListFiltered] = useState<any[]>();

    useEffect(() => {
        if (!CategoryLoaded) {
            dispatch(fetchCategories());
        } else {
            setCategoryListFiltered(CategoryList);
        }
    }, [CategoryLoaded])

    const searchTextHandler = useCallback((e: string) => {
        // find in Categories
        const filtered = CategoryList.filter(item => item['name'].toLowerCase().indexOf(e.toLowerCase()) > -1);

        setCategoryListFiltered(filtered);
    }, [CategoryList]);

    const CategoryItem = ({ item, index }: { item: any, index: number }) => {
        const backgroundColor = colorsBG[index % colorsBG.length];
        return (
            <View style={styles.boxStyle}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(`MenuScreen`, {
                        categoryId: item?.id
                    })}
                    style={{}}
                >
                    <LinearGradient
                        colors={backgroundColor}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.categoryBox}
                    >
                        <View style={{ alignItems: "center" }}>
                            <Image source={{ uri: item.imgUrl }} style={styles.categoryIcon} />
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
                <Text style={styles.categoryText}>{item.name}</Text>
            </View>
        )
    }

    return (
        <>
            <OuterLayout containerStyle={globalStyle.containerStyle}>
                <InnerBlock>
                    <View style={styles.main}>
                        {/* Top Navigation */}
                        <View style={styles.top}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate(`HomeScreen`)}
                                style={{ position: 'absolute', left: 0 }}
                            >
                                <Icon type={Icons.Feather} size={18} name={`chevron-left`} color={COLORS.BLACK} />
                            </TouchableOpacity>

                            {/* Text centered */}
                            <Text style={styles.headingText}>
                                categories
                            </Text>
                        </View>

                        <View style={{ marginTop: HP(24), flexDirection: "row", alignItems: "center", gap: HP(10), justifyContent: "space-between" }}>
                            <SearchBoxSection setHandler={searchTextHandler} inputContainerStyle={{}} navigation={navigation} />

                            <TouchableOpacity
                                onPress={() => navigation.navigate(`FilterScreen`)}
                                style={globalStyle.filterIconContainer}
                            >
                                <Image source={require(`../../assets/icons/filter.png`)} style={[globalStyle.filterIconRight]} />
                            </TouchableOpacity>
                        </View>

                        <View>
                            {CategoryLoaded ? (
                                <FlatList
                                    numColumns={3}
                                    data={categoryListFiltered}
                                    renderItem={({ item, index }) => <CategoryItem item={item} index={index} />}
                                    contentContainerStyle={styles.listContainer}
                                    columnWrapperStyle={styles.columnWrapper}
                                    showsVerticalScrollIndicator={false}
                                />
                            ) : (
                                <View style={styles.listContainer}>
                                    <CategoryItemLoaderSection />
                                </View>
                            )}
                        </View>
                    </View>
                </InnerBlock>
            </OuterLayout>
        </>
    )
}

const styles = StyleSheet.create({
    main: {
        marginHorizontal: HP(20),
        marginVertical: VP(28),
        flex: 1
    },
    top: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
    },
    headingText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: "#424242",
        textTransform: "capitalize",
        fontSize: 18,
        textAlign: 'center'
    },
    boxStyle: {
        // aspectRatio: .6,
        flexGrow: 0,
        width: "30%",
        gap: HP(5.38)
    },
    categoryIcon: {
        width: "100%",
        height: FS(60),
        resizeMode: "contain"
    },
    categoryText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 16,
        textTransform: "capitalize",
        textAlign: "center",
    },
    listContainer: {
        marginTop: VP(34)
    },
    categoryBox: {
        width: "100%",
        height: VP(104.89),
        borderRadius: HP(18.82),
        justifyContent: "center"
    },
    columnWrapper: {
        justifyContent: 'space-between', // Adds space between items
        marginBottom: VP(32), // Adds space between rows
    },
});

export default CategoryScreen; 