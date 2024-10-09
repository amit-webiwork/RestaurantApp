import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    Keyboard,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { debounce } from 'lodash';

import { CDN_URL, COLORS } from '../../utils/Constants';
import { HP, VP, FS } from '../../utils/Responsive';
import Icon, { Icons } from '../../components/Icons';
import { TextStyles } from '../../utils/TextStyles';
import HeadingSection from '../../components/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularItems, getRecentSearchItems, mergeRecentSearchItems, papularItemLoaded, papularItems, removeRecentSearchItems, setRecentSearchItems } from '../../redux/features/items';
import { AppDispatch } from '../../redux/store';
import { proflieDetails } from '../../redux/features/profile';
import CuisineBox from '../../components/home-sections/CuisineBox';
import { getItemList } from '../../utils/ApiCall';

const SearchScreen = ({ navigation }: { navigation: any }) => {
    const dispatch: AppDispatch = useDispatch();

    const ProflieDetails = useSelector(proflieDetails);
    const recentSearchItems = useSelector(getRecentSearchItems);

    const { user } = ProflieDetails;

    const PapularItemLoaded = useSelector(papularItemLoaded);
    const PapularItems = useSelector(papularItems);

    const [papularItemsList, setPapularItemsList] = useState<any[]>([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const [loader, setLoader] = useState(false);

    // Use debounce for handling search input changes
    const debouncedSearch = useCallback(
        debounce(async (query: string) => {
            try {
                if (query) {
                    console.log('-----search run query')
                    const params = { keyword: query };
                    const data = await getItemList(params, 5, 0);
                    setSearchResults(data?.data || []);
                } else {
                    setSearchResults([]);
                }
            } catch (err) {
                console.log(err);
                setSearchResults([]);
            }
            setLoader(false);
        }, 500), // 500ms debounce delay
        []
    );

    const handleSearch = async (text: string) => {
        setLoader(true);
        setSearchQuery(text);
        debouncedSearch(text);
    };

    const handlePopularPress = (item: any) => {
        setTimeout(() => {
            navigation.navigate(`ProductScreen`, {
                id: item?.id,
                item: item
            })
        }, 100)
    };

    const handlSearchItemPress = (item: any) => {
        // save into recent search state
        dispatch(mergeRecentSearchItems(item));
        setTimeout(() => {
            navigation.navigate(`ProductScreen`, {
                id: item?.id,
                item: item
            })
        }, 100)
    };

    const handleBackPress = () => {
        navigation.goBack();
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
    };

    const handleRecentSearchRemove = (item: ItemDetails) => {
        dispatch(removeRecentSearchItems(item?.id));
    }

    useEffect(() => {
        if (!PapularItemLoaded) {
            dispatch(fetchPopularItems());
        } else {
            setPapularItemsList(PapularItems.slice(0, 4));
        }
    }, [PapularItemLoaded])

    return (
        <View style={styles.container}>
            {/* Search Input */}
            <View style={styles.searchBarContainer}>
                <TouchableOpacity
                    onPress={handleBackPress}
                    style={styles.backIcon}
                >
                    <Icon type={Icons.Feather} size={20} name={`chevron-left`} color={COLORS.BUTTON} />
                </TouchableOpacity>
                <TextInput
                    value={searchQuery}
                    onChangeText={handleSearch}
                    placeholder="Search like bubble tea"
                    style={styles.searchInput}
                    placeholderTextColor="#A0A0A0"
                    autoFocus={true}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={clearSearch} style={styles.clearIcon}>
                        <Icon type={Icons.Feather} size={HP(12)} name={`x`} color={COLORS.WHITE} />
                    </TouchableOpacity>
                )}
                {loader ? (
                    <View style={styles.searchIconContainer}>
                        <ActivityIndicator style={{ marginLeft: HP(7.5) }} size="small" color={COLORS.BUTTON} />
                    </View>
                ) : (
                    <TouchableOpacity
                        onPress={() => {
                            Keyboard.dismiss();
                        }}
                        style={styles.searchIconContainer}
                    >
                        <Image source={require(`../../assets/icons/mic.png`)} style={[styles.inputIconRight]} />
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Recent Searches */}
                {recentSearchItems.length > 0 && searchQuery.length === 0 && (
                    <View style={styles.sectionContainer}>
                        <HeadingSection title={`your recent searches`} textStyle={styles.heading} />
                        <FlatList
                            data={recentSearchItems}
                            renderItem={({ item }) => (
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: HP(12) }}>
                                    <TouchableOpacity
                                        onPress={() => handlePopularPress(item)}
                                        style={[styles.itemMainContainer, { marginBottom: 0 }]}
                                    >
                                        <View style={styles.itemImgBox}>
                                            <Image source={{ uri: `${CDN_URL}${item?.imgUrl}` }} style={styles.itemIcon} />
                                        </View>
                                        <View>
                                            <Text style={styles.suggestionText}>{item?.name}</Text>
                                            <Text style={styles.suggestionSubText}>{item?.category?.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleRecentSearchRemove(item)}
                                    >
                                        <Icon type={Icons.Feather} size={FS(18)} name={`x`} color={COLORS.BLACK} />
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={styles.listContainerStyle}
                            scrollEnabled={false}
                        />
                    </View>
                )}

                {/* Popular Search Suggestions */}
                {recentSearchItems.length === 0 && papularItemsList.length > 0 && searchQuery.length === 0 && (
                    <View style={styles.sectionContainer}>
                        <HeadingSection title={`Popular Searches`} textStyle={styles.heading} />
                        <FlatList
                            data={papularItemsList}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handlePopularPress(item)}
                                    style={styles.itemMainContainer}
                                >
                                    <View style={styles.itemImgBox}>
                                        <Image source={{ uri: `${CDN_URL}${item.imgUrl}` }} style={styles.itemIcon} />
                                    </View>
                                    <View style={{}}>
                                        <Text style={styles.suggestionText}>{item?.name}</Text>
                                        <Text style={styles.suggestionSubText}>{item?.category?.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={styles.listContainerStyle}
                            scrollEnabled={false}
                        />
                    </View>
                )}

                {/* Search Results */}
                {searchResults.length > 0 && searchQuery.length > 0 && (
                    <View style={styles.sectionContainer}>
                        <HeadingSection title={`Search Results`} textStyle={styles.heading} />
                        <FlatList
                            data={searchResults}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handlSearchItemPress(item)}
                                    style={styles.itemMainContainer}
                                >
                                    <View style={styles.itemImgBox}>
                                        <Image source={{ uri: `${CDN_URL}${item?.imgUrl}` }} style={styles.itemIcon} />
                                    </View>
                                    <View style={{}}>
                                        <Text style={styles.suggestionText}>{item?.name}</Text>
                                        <Text style={styles.suggestionSubText}>{item?.category?.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={styles.listContainerStyle}
                            scrollEnabled={false}
                        />
                    </View>
                )}

                {/* No results */}
                {!loader && searchResults.length === 0 && searchQuery.length > 0 && (
                    <View style={styles.sectionContainer}>
                        <View style={{}}>
                            <Text style={[styles.noResultText, { fontSize: HP(18) }]}>Uh-oh!</Text>

                            <Text style={[styles.noResultText, { fontSize: HP(14) }]}>No results for {searchQuery} in items. Please try something else.</Text>
                        </View>
                    </View>
                )}

                {/* whats on your mind */}
                {searchQuery.length === 0 && (
                    <View style={[styles.sectionContainer, { marginTop: HP(30) }]}>
                        <HeadingSection title={`${user?.name}, what’s on your mind?`} textStyle={{ textTransform: "uppercase", ...TextStyles.POPPINS_REGULAR, fontSize: 18 }} />

                        <View style={{ marginTop: VP(17.61) }}>
                            <CuisineBox navigation={navigation} />
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: HP(20)
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: HP(20),
        borderRadius: HP(10),
        backgroundColor: COLORS.WHITE,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        paddingHorizontal: HP(10),
        height: VP(50)
    },
    searchInput: {
        ...TextStyles.RALEWAY_MEDIUM,
        flex: 1,
        fontSize: FS(12),
        color: COLORS.BLACK,
        marginLeft: HP(10)
    },
    backIcon: {
        width: FS(20),
        height: FS(20)
    },
    clearIcon: {
        position: 'absolute',
        right: HP(55),
        borderRadius: HP(8),
        backgroundColor: "#CBCBCB",
        height: VP(16),
        width: FS(16),
        alignItems: "center",
        justifyContent: "center"
    },
    sectionContainer: {
        marginTop: HP(20)
    },
    suggestionText: {
        ...TextStyles.POPPINS_MEDIUM
    },
    suggestionSubText: {
        ...TextStyles.POPPINS_LIGHT,
        fontSize: 12,
        color: "#6C6C70"
    },
    inputIconRight: {
        width: FS(22),
        height: VP(22),
        marginLeft: HP(7.5)
    },
    itemIcon: {
        width: FS(46.75),
        height: VP(46.75),
        resizeMode: "cover",
        borderRadius: HP(11.97)
    },
    heading: {
        ...TextStyles.POPPINS_REGULAR,
        textTransform: "uppercase",
        fontSize: 18
    },
    itemMainContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: HP(14),
        marginBottom: HP(12)
    },
    itemImgBox: {
        borderRadius: HP(11.97),
        width: FS(50),
        height: VP(50),
        borderColor: COLORS.BUTTON,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    listContainerStyle: {
        marginTop: VP(17.61)
    },
    searchIconContainer: {
        position: 'absolute',
        right: HP(10),
        margin: 5,
        borderLeftWidth: 1,
        borderLeftColor: "#CCCCCC",
        zIndex: 2,
    },
    noResultText: {
        ...TextStyles.POPPINS_BOLD,
        fontSize: HP(18),
        color: "#898989",
        textAlign: "center"
    },
});

export default SearchScreen;
