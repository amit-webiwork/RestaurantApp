import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    Keyboard,
    ScrollView
} from 'react-native';
import { CDN_URL, COLORS } from '../../utils/Constants';
import { HP, VP, FS } from '../../utils/Responsive';
import Icon, { Icons } from '../../components/Icons';
import { TextStyles } from '../../utils/TextStyles';
import HeadingSection from '../../components/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularItems, papularItemLoaded, papularItems } from '../../redux/features/items';
import { AppDispatch } from '../../redux/store';
import { proflieDetails } from '../../redux/features/profile';
import CuisineBox from '../../components/home-sections/CuisineBox';

const SearchScreen = ({ navigation }: { navigation: any }) => {
    const dispatch: AppDispatch = useDispatch();

    const ProflieDetails = useSelector(proflieDetails);

    const { user } = ProflieDetails;

    const PapularItemLoaded = useSelector(papularItemLoaded);
    const PapularItems = useSelector(papularItems);

    const [papularItemsList, setPapularItemsList] = useState<any[]>([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]); // Placeholder for suggestion data
    const [searchResults, setSearchResults] = useState<string[]>([]); // Placeholder for search result data
    const [recentSearches, setRecentSearches] = useState<string[]>([]); // Placeholder recent searches

    useEffect(() => {
        // Optionally fetch suggestions or popular items here
        fetchSuggestions();
    }, []);

    useEffect(() => {
        if (!PapularItemLoaded) {
            dispatch(fetchPopularItems());
        } else {
            setPapularItemsList(PapularItems.slice(0, 4));
        }
    }, [PapularItemLoaded])

    const fetchSuggestions = () => {
        // Simulate API call to fetch suggestions/popular searches
        setSuggestions(['Pizza', 'Burger', 'Pasta', 'Sushi']);
    };

    const handleSearch = (text: string) => {
        setSearchQuery(text);

        // Simulate API call to fetch search results based on query
        if (text) {
            const results = suggestions.filter(item => item.toLowerCase().includes(text.toLowerCase()));
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const handleSuggestionPress = (item: any) => {
        setSearchQuery(item?.name);
        navigation.navigate(`ProductScreen`, {
            id: item?.id,
            item: item
        })
    };

    const handleBackPress = () => {
        navigation.goBack();
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
    };

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
                    <TouchableOpacity onPress={clearSearch} style={[styles.clearIcon, { position: 'absolute', right: HP(55), borderRadius: HP(8), backgroundColor: "#CBCBCB", height: VP(16), width: FS(16), alignItems: "center", justifyContent: "center" }]}>
                        <Icon type={Icons.Feather} size={HP(12)} name={`x`} color={COLORS.WHITE} />
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    onPress={() => {
                        Keyboard.dismiss();
                    }}
                    style={{
                        position: 'absolute',
                        right: HP(10),
                        margin: 5,
                        borderLeftWidth: 1,
                        borderLeftColor: "#CCCCCC",
                        zIndex: 2
                    }}
                >
                    <Image source={require(`../../assets/icons/mic.png`)} style={[styles.inputIconRight]} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Recent Searches */}
                {recentSearches.length > 0 && searchQuery.length === 0 && (
                    <View style={styles.sectionContainer}>
                        <HeadingSection title={`your recent searches`} textStyle={{ textTransform: "uppercase", ...TextStyles.POPPINS_REGULAR, fontSize: 18 }} />
                        <FlatList
                            data={recentSearches}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
                                    <Text style={styles.suggestionText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                )}

                {/* Search Suggestions */}
                {suggestions.length > 0 && searchQuery.length === 0 && (
                    <View style={styles.sectionContainer}>
                        <HeadingSection title={`Popular Searches`} textStyle={{ textTransform: "uppercase", ...TextStyles.POPPINS_REGULAR, fontSize: 18 }} />
                        <FlatList
                            data={papularItemsList}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handleSuggestionPress(item)}
                                    style={{ flexDirection: "row", alignItems: "center", gap: HP(14), marginBottom: HP(12) }}
                                >
                                    <View style={{
                                        borderRadius: HP(11.97), width: FS(50), height: VP(50), borderColor: COLORS.BUTTON, borderWidth: 1, alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <Image source={{ uri: `${CDN_URL}${item.imgUrl}` }} style={styles.itemIcon} />
                                    </View>
                                    <View style={{}}>
                                        <Text style={styles.suggestionText}>{item?.name}</Text>
                                        <Text style={styles.suggestionSubText}>{item?.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{ marginTop: VP(17.61) }}
                        />
                    </View>
                )}

                {/* Search Results */}
                {searchResults.length > 0 && searchQuery.length > 0 && (
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Search Results</Text>
                        <FlatList
                            data={searchResults}
                            renderItem={({ item }) => (
                                <Text style={styles.resultText}>{item}</Text>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                )}

                {/* whats on your mind */}
                {searchQuery.length === 0 && (
                    <View style={styles.sectionContainer}>
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
        width: FS(16),
        height: FS(16)
    },
    sectionContainer: {
        marginTop: HP(20)
    },
    sectionTitle: {
        fontSize: FS(16),
        color: COLORS.BLACK,
        fontWeight: 'bold',
        marginBottom: HP(10)
    },
    suggestionText: {
        ...TextStyles.POPPINS_MEDIUM
    },
    suggestionSubText: {
        ...TextStyles.POPPINS_LIGHT,
        fontSize: 12,
        color: "#6C6C70"
    },
    resultText: {
        fontSize: FS(14),
        color: COLORS.BLACK,
        marginBottom: HP(10)
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
    }
});

export default SearchScreen;
