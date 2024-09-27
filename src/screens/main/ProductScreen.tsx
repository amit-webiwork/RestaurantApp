import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, ScrollView, Dimensions, TextInput, Animated } from 'react-native';

import { FS, HP, VP } from '../../utils/Responsive.ts';
import { COLORS } from '../../utils/Constants.ts';
import { TextStyles } from '../../utils/TextStyles.ts';
import CategortyTabsSection from '../../components/home-sections/CategortyTabs.tsx';
import Icon, { Icons } from '../../components/Icons';
import ItemBoxSection from '../../components/home-sections/ItemBox.tsx';
import OuterLayout from '../../components/OuterLayout.tsx';
import InnerBlock from '../../components/InnerBlock.tsx';
import { globalStyle } from '../../utils/GlobalStyle.ts';
import CartQtyButtonSection from '../../components/product-sections/CartQtyButton.tsx';
import HeadingSection from '../../components/Heading.tsx';
import { categoryTabData, itemData } from '../../utils/MockData.ts';

const { width, height } = Dimensions.get('window');

function ProductScreen({ route, navigation }: { navigation: any, route: any }): React.JSX.Element {
    const { id } = route.params;

    const scrollY = useRef(new Animated.Value(0)).current;

    const [instructionText, setInstructionText] = useState<string>("");
    const [errorInstruction, setErrorInstruction] = useState({ status: false, text: "" });
    const [textLength, setTextLength] = useState<number>(100);
    const [cartQuantity, setCartQuantity] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<number>(1);
    const [itemList, setItemList] = useState<any[]>(itemData);
    const [itemListFiltered, setItemListFiltered] = useState<any[]>(itemData);

    const setInstructionTextHandler = (e: string) => {
        setInstructionText(e);
        setTextLength(100 - e.length);
    }

    const selectCategoryHandler = useCallback((id: number) => {
        setSelectedCategory(id);

        // find in items
        const filtered = itemList.filter(item => item['category'] === id);

        setItemListFiltered(filtered);
    }, [itemList]);

    const incrementCart = () => setCartQuantity(prevQty => prevQty + 1);
    const decrementCart = () => setCartQuantity(prevQty => (prevQty > 1 ? prevQty - 1 : 1));

    const imageHeight = scrollY.interpolate({
        inputRange: [0, 300], // Adjust the second value to control how quickly the image scales
        outputRange: [height * 0.5, height * 0.1], // Adjust the values to control the min and max image height
        extrapolate: 'clamp',
    });

    return (
        <>
            <OuterLayout containerStyle={globalStyle.containerStyle}>
                <InnerBlock>
                    <View style={{ flex: 1, backgroundColor: "#FDF6F5" }}>
                        <Animated.ScrollView
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
                                    // source={{ uri: 'https://example.com/mango-boba-tea.png' }}
                                    source={require('../../assets/images/fruit.png')}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                                <TouchableOpacity
                                    onPress={() => navigation.navigate(`HomeScreen`)}
                                    style={{ position: 'absolute', left: HP(20), top: VP(41) }}
                                >
                                    <Icon type={Icons.Feather} size={25.66} name={`chevron-left`} color={COLORS.WHITE} />
                                </TouchableOpacity>
                                <View style={{ position: 'absolute', top: VP(31), right: HP(20), backgroundColor: "#0000006E", padding: HP(10), borderRadius: FS(32) }}>
                                    <Text style={styles.title}>Mango Boba Tea</Text>
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
                                                style={{ height: VP(28), width: FS(28) }}
                                                resizeMode="cover"
                                            />
                                            <Image
                                                source={require('../../assets/images/person-2.png')}
                                                style={{ height: VP(28), width: FS(28), left: HP(-5) }}
                                                resizeMode="cover"
                                            />
                                        </View>

                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Text style={{ ...TextStyles.INTER_MEDIUM, }}>4.5</Text>
                                            <Icon type={Icons.MaterialIcons} size={25.66} name={`star`} color={`#FF785B`} />
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => void (0)}
                                        style={{
                                            backgroundColor: "#FFFFFF",
                                            width: FS(38),
                                            height: VP(38),
                                            borderRadius: FS(19),
                                            borderWidth: 2,
                                            borderColor: COLORS.BUTTON,
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <Icon type={Icons.Feather} size={FS(24.1)} name={`heart`} color={COLORS.BUTTON} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ paddingHorizontal: HP(30), paddingVertical: HP(3), }}>
                                    {/* Description and info text */}
                                    <View>
                                        <Text style={styles.descText}>description</Text>
                                        <Text style={styles.infoText}>Our Mango Boba Tea is crafted from the finest ingredients and fresh, juicy mangoes. Every drink is blended with smooth milk and natural mango puree for a burst of tropical flavor. Each cup is served with our signature chewy tapioca pearls and a complimentary smile!</Text>
                                    </View>

                                    {/* Cooking request */}
                                    <View style={{ marginTop: VP(40) }}>
                                        <Text style={styles.requestText}>Add a cooking request (optional)</Text>

                                        <View style={{ marginTop: VP(14) }}>
                                            <TextInput
                                                value={instructionText}
                                                onChangeText={setInstructionTextHandler}
                                                placeholder="e.g. Don’t make it too sweet"
                                                maxLength={100}
                                                multiline={true}
                                                numberOfLines={5}
                                                placeholderTextColor={`#A7A7A7`}
                                                style={{
                                                    ...TextStyles.RALEWAY_MEDIUM,
                                                    fontSize: 11.56,
                                                    backgroundColor: "#EAEAEA",
                                                    borderRadius: HP(7.71),
                                                    textAlignVertical: 'top',
                                                    padding: 10,
                                                    borderBottomColor: errorInstruction.status ? COLORS.RED : "transparent"
                                                }}
                                            />
                                            <Text style={{ ...TextStyles.RALEWAY_MEDIUM, fontSize: 11.56, color: "#A7A7A7", position: "absolute", bottom: 10, right: 10 }}>{textLength}</Text>
                                        </View>
                                    </View>

                                    {/* Cart with qty Button */}
                                    <View style={{ flexDirection: "row", marginTop: VP(44), backgroundColor: COLORS.BUTTON, borderRadius: HP(40), padding: HP(17), justifyContent: "space-between", alignItems: "center" }}>
                                        <View>
                                            <Text style={{ ...TextStyles.RALEWAY_BOLD, fontSize: 20, color: COLORS.WHITE }}>$12.00</Text>
                                        </View>

                                        <CartQtyButtonSection decrement={decrementCart} qty={cartQuantity} setQty={setCartQuantity} increment={incrementCart} />

                                        <TouchableOpacity
                                            onPress={() => void (0)}
                                            style={{ width: FS(31), height: VP(31), borderRadius: HP(15.5), backgroundColor: COLORS.WHITE, alignItems: "center", justifyContent: "center" }}
                                        >
                                            <Image
                                                source={require('../../assets/icons/cart.png')}
                                                style={{ width: FS(21), height: VP(20), }}
                                                resizeMode="cover"
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    {/* Heading */}
                                    <View style={{ marginTop: VP(38.34) }}>
                                        <HeadingSection title={`MENU`} />
                                    </View>

                                    <View style={{ marginTop: VP(25.66) }}>
                                        <CategortyTabsSection data={categoryTabData} selectedCategory={selectedCategory} setSelectedCategory={selectCategoryHandler} />
                                    </View>

                                    <View style={{ marginTop: VP(20) }}>
                                        <ItemBoxSection data={itemListFiltered} navigation={navigation} />
                                    </View>
                                </View>

                            </View>
                        </Animated.ScrollView>
                    </View>
                </InnerBlock>
            </OuterLayout>
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
        color: COLORS.WHITE
    },
    requestText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 15.42
    }
});

export default ProductScreen;