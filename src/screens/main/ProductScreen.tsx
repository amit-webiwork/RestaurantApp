import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Dimensions, Animated, Platform, UIManager, LayoutAnimation, LayoutChangeEvent } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { FS, HP, VP } from '../../utils/Responsive.ts';
import { CDN_URL, COLORS } from '../../utils/Constants.ts';
import { TextStyles } from '../../utils/TextStyles.ts';
import CategortyTabsSection from '../../components/home-sections/CategortyTabs.tsx';
import Icon, { Icons } from '../../components/Icons';
import ItemBoxSection from '../../components/home-sections/ItemBox.tsx';
import OuterLayout from '../../components/OuterLayout.tsx';
import InnerBlock from '../../components/InnerBlock.tsx';
import { globalStyle } from '../../utils/GlobalStyle.ts';
import HeadingSection from '../../components/Heading.tsx';
import { productRatings } from '../../utils/MockData.ts';
import ProductRatingsSection from '../../components/product-sections/ProductRatings.tsx';
import CartQtyButtonV1Section from '../../components/product-sections/CartQtyButtonV1.tsx';
import CookingRequestSection from '../../components/product-sections/CookingRequest.tsx';
import CartLayout from '../../components/cart/CartLayout.tsx';
import { addToCart } from '../../utils/helper/CartHelper.ts';
import { fetchPopularItems, papularItemLoaded, papularItems } from '../../redux/features/items.ts';
import { AppDispatch } from '../../redux/store.ts';
import { cartItemList, getCartQty } from '../../redux/features/cart.ts';
import ProductScreenLoader from '../../components/skeleton/ProductScreenLoader.tsx';
import { getItemPriceComponents } from '../../utils/helper/ItemHelper.ts';

const { width, height } = Dimensions.get('window');

const tabs = [{ title: "toppings", options: [{ title: "herbal jelly", price: 1.20, image: require(`../../assets/images/jelly.png`) }, { title: "pudding", price: 1.20, image: require(`../../assets/images/pudding.png`) }, { title: "brown sugar pearls", price: 1.20, image: require(`../../assets/images/sugar.png`) }, { title: "coffee jelly", price: 1.20, image: require(`../../assets/images/coffee.png`) }, { title: "lychee pearls", price: 1.20 }] }, { title: "size", options: [{ title: "small", price: 12 }, { title: "medium", price: 14 }, { title: "large", price: 16 }] }, { title: "ice", options: [{ title: "normal ice" }, { title: "half ice" }, { title: "no ice" }] }, { title: "sweetness", options: [{ title: "extra sugar" }, { title: "standard sugar" }, { title: "half sugar" }, { title: "less sugar" }, { title: "no sugar" }] }, { title: "milk", options: [{ title: "fresh milk instead", image: require(`../../assets/images/milk-fresh.png`) }, { title: "soya milk instead", price: 1.20, image: require(`../../assets/images/milk-fresh.png`) }] }]

// Enable Layout Animation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

function ProductScreen({ route, navigation }: { navigation: any, route: any }): React.JSX.Element {
    const { id, item } = route.params;

    const dispatch: AppDispatch = useDispatch();

    const PapularItemLoaded = useSelector(papularItemLoaded);
    const PapularItems = useSelector(papularItems);
    const CartItemList = useSelector(cartItemList);

    const scrollViewRef = useRef<any>(null);
    const scrollY = useRef(new Animated.Value(0)).current;

    const [instructionText, setInstructionText] = useState<string>("");
    const [errorInstruction, setErrorInstruction] = useState({ status: false, text: "" });
    const [cartQuantity, setCartQuantity] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const [itemListFiltered, setItemListFiltered] = useState<any[]>([]);
    const [itemDetails, setItemDetails] = useState<any>({});

    const [textWidths, setTextWidths] = useState<any>({});
    const [activeTab, setActiveTab] = useState(1);
    const [customizeTabs, setCustomizeTabs] = useState<any>(tabs);

    const setInstructionTextHandler = useCallback((e: string) => {
        setInstructionText(e);
    }, [setInstructionText]);

    const selectCategoryHandler = useCallback((id: number) => {
        setSelectedCategory(id);

        // find in items
        const filtered = PapularItems.filter(item => (item?.category_id === id || id === 0));

        setItemListFiltered(filtered);
    }, [PapularItems]);

    useEffect(() => {
        if (!PapularItemLoaded) {
            dispatch(fetchPopularItems());
        } else {
            setItemListFiltered(PapularItems);
        }
    }, [PapularItemLoaded])

    useEffect(() => {
        if (id) {
            setItemDetails(getItemPriceComponents(item));
            setCartQuantity(getCartQty(item?.id, CartItemList))
        }
    }, [id])

    // Ensure that when the route parameter changes, it scrolls to the top
    useEffect(() => {
        // if (scrollViewRef?.current) {
        //     scrollViewRef.current.scrollTo({ y: 0, animated: true });
        // }
    }, [id]);

    const incrementCart = useCallback(() => {
        setCartQuantity(prevQty => prevQty + 1);
    }, [setCartQuantity]);

    const decrementCart = useCallback(() => {
        setCartQuantity(prevQty => (prevQty > 1 ? prevQty - 1 : 1));
    }, [setCartQuantity]);

    const switchTab = useCallback((tab: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setActiveTab(tab);
    }, [setActiveTab]);

    const handleTextLayout = useCallback(
        (event: LayoutChangeEvent, index: number) => {
            const { width } = event.nativeEvent.layout;
            setTextWidths((prevWidths: any) => ({
                ...prevWidths,
                [index]: width,
            }));
        },
        [setTextWidths] // Dependency array
    );

    const clickOptionHandler = (optionIndex: number) => {
        const updatedTabs = customizeTabs.map((tab: { options: any[]; }, i: number) => {
            if (i === (activeTab - 1)) {
                const updatedOptions = tab.options.map((option, index) => {
                    // Toggle the "checked" key for the selected option
                    if (index === optionIndex) {
                        return { ...option, checked: !option.checked };
                    }
                    return option;
                });
                return { ...tab, options: updatedOptions };
            }
            return tab;
        });

        // Update the state with the updated tabs
        setCustomizeTabs(updatedTabs);
    }

    const imageHeight = scrollY.interpolate({
        inputRange: [0, 300],
        outputRange: [height * 0.5, height * 0.3],
        extrapolate: 'clamp',
    });

    if (!itemDetails?.name) {
        return (
            <OuterLayout containerStyle={globalStyle.containerStyle}>
                <InnerBlock>
                    <View style={{ flex: 1, backgroundColor: "#FDF6F5" }}>
                        <ProductScreenLoader />
                    </View>
                </InnerBlock>
            </OuterLayout>
        )
    }

    return (
        <>
            <OuterLayout containerStyle={globalStyle.containerStyle}>
                <InnerBlock>
                    <View style={{ flex: 1, backgroundColor: "#FDF6F5" }}>
                        <Animated.ScrollView
                            ref={scrollViewRef}
                            showsVerticalScrollIndicator={false}
                            scrollEventThrottle={16}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                                { useNativeDriver: false }
                            )}
                        >
                            {/* Top banner area */}
                            <Animated.View style={[styles.imageContainer, { height: imageHeight }]}>
                                <Image
                                    source={itemDetails?.imgUrl ? { uri: `${CDN_URL}${itemDetails.imgUrl}` } : require('../../assets/images/item-placeholder.jpg')}
                                    style={[styles.image]}
                                    resizeMode="cover"
                                />
                                {!itemDetails?.is_available && (
                                    <View style={styles.outOfStockContainer}>
                                        <Text style={styles.outOfStockText}>Out of Stock</Text>
                                    </View>
                                )}
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    style={styles.backButton}
                                >
                                    <Icon type={Icons.Feather} size={FS(20)} name={`chevron-left`} color={COLORS.WHITE} />
                                </TouchableOpacity>
                                <View style={{ position: 'absolute', top: VP(31), right: HP(20), backgroundColor: "#0000006E", padding: HP(10), borderRadius: FS(32), minWidth: FS(100) }}>
                                    <Text style={styles.title}>{itemDetails?.name}</Text>
                                </View>
                            </Animated.View>

                            {/* Under bottom area */}
                            <View style={styles.main}>
                                {/* Review count box and heart icon */}
                                <View style={{ flexDirection: "row", justifyContent: "space-evenly", top: VP(-20) }}>

                                    <View style={{ flexDirection: "row", backgroundColor: "#FFFFFF", padding: 10, borderRadius: FS(32), justifyContent: "space-between", gap: HP(47), alignItems: "center" }}>
                                        <View style={{ flexDirection: "row" }}>
                                            <Image
                                                source={require('../../assets/images/person-1.png')}
                                                style={{ height: FS(28), width: FS(28) }}
                                                resizeMode="cover"
                                            />
                                            <Image
                                                source={require('../../assets/images/person-2.png')}
                                                style={{ height: FS(28), width: FS(28), left: HP(-5) }}
                                                resizeMode="cover"
                                            />
                                        </View>

                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Text style={{ ...TextStyles.INTER_MEDIUM, }}>4.5</Text>
                                            <Icon type={Icons.MaterialIcons} size={25.66} name={`star`} color={`#FF785B`} />
                                        </View>
                                    </View>
                                </View>

                                <View style={{ paddingVertical: HP(3), }}>
                                    {/* Description and info text */}
                                    <View style={{ paddingHorizontal: HP(30) }}>
                                        <Text style={styles.descText}>description</Text>
                                        <Text style={styles.infoText}>{itemDetails?.description}</Text>
                                    </View>

                                    {/* <View style={styles.line}></View> */}

                                    {/* Cooking request */}
                                    {/* <View style={{ marginTop: VP(40), paddingHorizontal: HP(30) }}>
                                        <Text style={styles.requestText}>Add a cooking request (optional)</Text>

                                        <View style={{ marginTop: VP(14) }}>
                                            <CookingRequestSection 
                                              setHandler={setInstructionTextHandler}
                                            />
                                        </View>
                                    </View> */}

                                    {/* <View style={{ marginTop: VP(27), paddingHorizontal: HP(30) }}>
                                        <ProductRatingsSection data={productRatings} />
                                    </View> */}

                                    {/* Customize item section */}
                                    <View style={{ marginTop: VP(22), paddingHorizontal: HP(30) }}>
                                        <Text style={styles.customizeHeading}>customize items</Text>

                                        {/* Tabs section */}
                                        <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: VP(14.48) }}>

                                            {customizeTabs.map((d: any, i: number) => (
                                                <TouchableOpacity
                                                    onPress={() => switchTab((i + 1))}
                                                    key={`tab-${i}`}
                                                >
                                                    <Text
                                                        style={styles.menuText}
                                                        onLayout={(event) => handleTextLayout(event, i)}
                                                    >
                                                        {d.title}
                                                    </Text>
                                                    {activeTab === (i + 1) && (
                                                        <Image
                                                            source={require('../../assets/images/active.png')}
                                                            style={{ width: (textWidths[i] || 0), height: VP(4), resizeMode: "stretch", marginTop: VP(8.9) }}
                                                        />
                                                    )}
                                                </TouchableOpacity>
                                            ))}
                                        </View>

                                        <View style={styles.lineTab}></View>

                                        {/* Tab options section */}
                                        {customizeTabs[(activeTab - 1)]?.options && (
                                            <View style={{ marginTop: VP(6) }}>
                                                {customizeTabs[(activeTab - 1)].options.map((d: any, i: number) => (
                                                    <View key={`tab-options-${i}`} style={{ gap: HP(8), marginTop: VP(6) }}>
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                                                            <View style={{ flexDirection: "row", alignItems: "center", gap: HP(10.37), padding: HP(8) }}>
                                                                {/* {d?.image ? (
                                                                    <Image source={d?.image} style={styles.optionImg} />
                                                                ) : <></>} */}

                                                                <Text style={styles.customizeOptionText}>{d.title}</Text>
                                                            </View>


                                                            <View style={{ flexDirection: "row", alignItems: "center", gap: HP(10.02) }}>
                                                                <Text style={styles.optionPrice}>{(d.price && d.price > 0) ? `$${d.price.toFixed(2)}` : ""}</Text>

                                                                <TouchableOpacity
                                                                    onPress={() => clickOptionHandler(i)}
                                                                >
                                                                    <View style={styles.checkbox}>
                                                                        {(d?.checked && d.checked === true) && (
                                                                            <View style={styles.checkedBox}>
                                                                                <Icon type={Icons.Feather} size={FS(12)} name={`check`} color={COLORS.WHITE} />
                                                                            </View>
                                                                        )}
                                                                    </View>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>


                                                        <View style={styles.lineTab}></View>
                                                    </View>
                                                ))}
                                            </View>
                                        )}
                                    </View>

                                    {/* Cart with qty Button */}
                                    {itemDetails?.is_available && (
                                        <View style={{ paddingHorizontal: HP(30) }}>
                                            <View style={{ flexDirection: "row", marginTop: VP(44), backgroundColor: COLORS.BUTTON, borderRadius: HP(40), padding: HP(17), justifyContent: "space-between", alignItems: "center", }}>
                                                <View>
                                                    <Text style={{ ...TextStyles.RALEWAY_BOLD, fontSize: 20, color: COLORS.WHITE }}>${itemDetails?.finalPrice.toFixed(2)}</Text>
                                                </View>

                                                <CartQtyButtonV1Section
                                                    decrement={decrementCart}
                                                    qty={cartQuantity}
                                                    setQty={setCartQuantity}
                                                    increment={incrementCart}
                                                />

                                                <TouchableOpacity
                                                    onPress={() => addToCart(itemDetails, cartQuantity, dispatch)}
                                                    style={{ width: FS(31), height: FS(31), borderRadius: FS(15.5), backgroundColor: COLORS.WHITE, alignItems: "center", justifyContent: "center" }}
                                                >
                                                    <Image
                                                        source={require('../../assets/icons/cart.png')}
                                                        style={{ width: FS(21), height: FS(20), }}
                                                        resizeMode="cover"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}

                                    {/* Heading */}
                                    <View style={{ marginTop: VP(38.34), paddingHorizontal: HP(30) }}>
                                        <HeadingSection title={`MENU`} />
                                    </View>

                                    {/* Category Tab */}
                                    <View style={{ marginTop: VP(25.66), paddingLeft: HP(30) }}>
                                        <CategortyTabsSection setSelectedCategory={selectCategoryHandler} selectedCategory={selectedCategory} />
                                    </View>

                                    {/* item boxes */}
                                    <View style={{ marginTop: VP(20), paddingLeft: HP(30) }}>
                                        <ItemBoxSection data={itemListFiltered} dataLoaded={PapularItemLoaded} navigation={navigation} />
                                    </View>
                                </View>
                            </View>
                        </Animated.ScrollView>
                    </View>
                </InnerBlock>
            </OuterLayout >
            <CartLayout children={undefined} navigation={navigation}></CartLayout>
        </>
    )
}

const styles = StyleSheet.create({
    main: {
        position: "relative",
        top: VP(-40),
        borderTopLeftRadius: HP(50),
        borderTopRightRadius: HP(50),
        backgroundColor: "#FDF6F5",

    },
    descText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        textTransform: "capitalize",
        fontSize: 22.86,
        color: "#5D5959"
    },
    infoText: {
        ...TextStyles.RALEWAY_MEDIUM,
        textTransform: "capitalize",
        fontSize: 12,
        color: "#757575",
        marginTop: VP(14)
    },
    image: {
        width: width * 1,
        height: '100%',
    },
    imageContainer: {
        height: height * 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 18,
        color: COLORS.WHITE,
        textAlign: "center"
    },
    requestText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 15.42
    },
    outOfStockContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        width: '100%',
        height: '100%',
        zIndex: 2
    },
    outOfStockText: {
        ...TextStyles.RALEWAY_BOLD,
        color: COLORS.WHITE,
        fontSize: FS(24),
        fontWeight: 'bold',
        textTransform: 'uppercase',
        backgroundColor: 'rgba(255, 0, 0, 0.7)',
        padding: HP(10),
        borderRadius: FS(10),
    },
    backButton: {
        position: 'absolute',
        left: HP(15),
        top: VP(41),
        backgroundColor: "#0000006E",
        borderRadius: FS(12.5),
        alignItems: "center",
        justifyContent: "center",
        width: FS(25),
        height: FS(25),
        zIndex: 10
    },
    line: {
        height: 2,
        width: "100%",
        flex: 1,
        flexGrow: 1,
        backgroundColor: "#eee",
        marginTop: VP(27)

    },
    customizeHeading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 20.8,
        textTransform: 'capitalize'
    },
    menuText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 14.56,
        textTransform: "capitalize",
        padding: HP(8)
    },
    lineTab: {
        height: 2,
        flex: 1,
        flexGrow: 1,
        backgroundColor: "#E6E6E6"
    },
    customizeOptionText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 14.56,
        textTransform: "capitalize"
    },
    checkbox: {
        width: FS(15.11),
        height: FS(15.11),
        borderWidth: 1,
        borderColor: '#FFAFF6',  // Border color for the checkbox
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: HP(6.11),
        borderRadius: HP(2.96)
    },
    checkedBox: {
        width: FS(15.11),
        height: FS(15.11),
        backgroundColor: COLORS.BUTTON,
        justifyContent: "center",
        alignItems: "center"
    },
    optionPrice: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 12,
        color: "#383838"
    },
    optionImg: {
        resizeMode: "contain",
        width: FS(19),
        height: VP(19)
    }
});

export default ProductScreen;