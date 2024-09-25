import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Image,
    FlatList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import { FS, HP, VP } from '../../utils/Responsive';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';
import LeftWhite from '../../assets/svgs/left-white.svg';
import RightWhite from '../../assets/svgs/right-white.svg';
import { categoryList, categoryLoaded, fetchCategories } from '../../redux/features/items';
import { AppDispatch } from '../../redux/store';
import CategoryBoxLoader from '../skeleton/CategoryBoxLoader';

const colorsBG = [["#FFDBFB99", "#FFDBFB99"], ["#DFE1FB99", "#DFE1FB99"], ["#CFF4C399", "#CFF4C399"], ["#FDD6D699", "#FDD6D699"]]

const data = [
    {
        "title": "juice",
        "icon": require(`../../assets/icons/categories/drink.png`)
    },
    {
        "title": "dessert",
        "icon": require(`../../assets/icons/categories/mousse.png`)
    },
    {
        "title": "bubble tea",
        "icon": require(`../../assets/icons/categories/bubble-tea.png`)
    },
    {
        "title": "acai",
        "icon": require(`../../assets/icons/categories/acai.png`)
    }
]

const CategoryItem = ({ item, index }: { item: any, index: number }) => {
    const backgroundColor = colorsBG[index % colorsBG.length];
    return (
        <View style={{ marginRight: HP(15), flexGrow: 1, width: "20%", }}>
            <TouchableOpacity
                onPress={() => void (0)}
                style={{}}
            >
                <LinearGradient
                    colors={backgroundColor}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.categoryBox}
                >
                    <View style={{ alignItems: "center" }}>
                        <Image source={item.icon} style={styles.categoryIcon} />
                    </View>
                </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.categoryText}>{item.title}</Text>
        </View>
    )
}

export const CategoryBox: React.FunctionComponent = () => {
    const dispatch: AppDispatch = useDispatch();

    const flatListRef = useRef<any>();

    const CategoryLoaded = useSelector(categoryLoaded);
    const CategoryList = useSelector(categoryList);

    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollLeft = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            flatListRef.current.scrollToIndex({ index: currentIndex - 1 });
        }
    };

    const scrollRight = () => {
        setCurrentIndex(currentIndex + 1);
        flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    };

    useEffect(() => {
        if (!CategoryLoaded) {
            dispatch(fetchCategories());
        }
    }, [CategoryLoaded])

    // console.log(CategoryList, CategoryLoaded, '-----------CategoryList')

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <Text style={styles.heading}>
                    categories
                </Text>
                {CategoryLoaded && (
                    <View style={styles.iconMainContainer}>
                        <TouchableOpacity
                            onPress={scrollLeft}
                            style={styles.iconContainer}
                        >
                            <LeftWhite width={FS(12)} height={VP(12)} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={scrollRight}
                            style={styles.iconContainer}
                        >
                            <RightWhite width={FS(12)} height={VP(12)} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <View>
                {CategoryLoaded ? (
                    <FlatList
                        data={data}
                        renderItem={({ item, index, separators }) => <CategoryItem item={item} index={index} />}
                        contentContainerStyle={styles.listContainer}
                        horizontal={true}
                        ref={flatListRef}
                    // getItemLayout={getItemLayout}
                    />
                ) : (<CategoryBoxLoader />)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
    },
    heading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 18,
        textTransform: "capitalize"
    },
    subContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    iconMainContainer: {
        flexDirection: "row",
        gap: 5
    },
    iconContainer: {
        width: FS(20),
        height: FS(20),
        backgroundColor: COLORS.HOME_ICONS,
        borderRadius: FS(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    categoryText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 12,
        textTransform: "capitalize",
        textAlign: "center",
    },
    listContainer: {
        marginTop: VP(9)
    },
    categoryBox: {
        width: FS(78.94),
        height: VP(78.01),
        borderRadius: HP(16),
        justifyContent: "center",
    },
    categoryIcon: {
        width: FS(45),
        height: VP(45),
        resizeMode: "contain"
    }
});
