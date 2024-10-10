import React, { memo, useEffect, useRef, useState } from 'react';
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
import { CDN_URL, COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';
import LeftWhite from '../../assets/svgs/left-white.svg';
import RightWhite from '../../assets/svgs/right-white.svg';
import { categoryList, categoryLoaded, fetchCategories } from '../../redux/features/items';
import { AppDispatch } from '../../redux/store';
import CategoryBoxLoaderSection from '../skeleton/CategoryBoxLoader';

interface Props {
    selectHandler: any;
    loading: boolean;
}

const allCategory = {
    "id": 0,
    "name": "All"
}

const colorsBG = [["#FFDBFB99", "#FFDBFB99"], ["#DFE1FB99", "#DFE1FB99"], ["#CFF4C399", "#CFF4C399"], ["#FDD6D699", "#FDD6D699"]];

const CategoryBox: React.FunctionComponent<Props> = ({ selectHandler, loading = false }) => {
    const dispatch: AppDispatch = useDispatch();

    const flatListRef = useRef<any>();

    const CategoryLoaded = useSelector(categoryLoaded);
    const CategoryList = useSelector(categoryList);

    const [selected, setSelected] = useState(0);

    const handleSelect = (item: { id: number; }) => {
        selectHandler(item.id);
        setSelected(item.id);
    };

    useEffect(() => {
        if (!CategoryLoaded) {
            dispatch(fetchCategories());
        } else {
            setSelected(0);
        }
    }, [CategoryLoaded])

    const CategoryItem = ({ item, index }: { item: any, index: number }) => {
        const backgroundColor = colorsBG[index % colorsBG.length];

        return (
            <View style={{ marginRight: HP(15), flexGrow: 1, gap: HP(5), alignItems: "center" }}>
                <TouchableOpacity
                    onPress={() => handleSelect(item)}
                    style={{}}
                    disabled={loading ? true : false}
                >
                    <LinearGradient
                        colors={backgroundColor}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.categoryBox]}
                    >
                        <View style={{ alignItems: "center" }}>
                            <Image
                                source={item.id === 0 ? require('../../assets/images/categories/all.png') : { uri: `${CDN_URL}${item?.imgUrl}` }}
                                style={styles.categoryIcon}
                            />
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
                <Text style={styles.categoryText}>{item.name}</Text>

                {selected === item.id && (
                    <Image
                        source={require('../../assets/images/active.png')}
                        style={{ width: FS(64), height: VP(4), resizeMode: "contain" }}
                    />
                )}
            </View>
        )
    }

    return (
        <View>
            <View>
                {CategoryLoaded ? (
                    <FlatList
                        data={[allCategory, ...CategoryList]}
                        renderItem={CategoryItem}
                        contentContainerStyle={styles.listContainer}
                        horizontal={true}
                        ref={flatListRef}
                        showsHorizontalScrollIndicator={false}
                    />
                ) : (<CategoryBoxLoaderSection />)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    heading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 18,
        textTransform: "capitalize"
    },
    iconMainContainer: {
        flexDirection: "row",
        gap: HP(5)
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
        width: FS(50),
        height: VP(50),
        resizeMode: "contain"
    }
});

const CategoryBoxSection = memo(CategoryBox);
export default CategoryBoxSection;