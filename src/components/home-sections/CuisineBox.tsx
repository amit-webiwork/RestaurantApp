import React, { memo, useEffect, useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Image,
    FlatList,
    Dimensions
} from 'react-native';

import { FS, HP, VP } from '../../utils/Responsive';
import { TextStyles } from '../../utils/TextStyles';
import { useDispatch, useSelector } from 'react-redux';
import { cuisineList, cuisineLoaded, fetchCuisine, setCuisineList } from '../../redux/features/items';
import { AppDispatch } from '../../redux/store';
import { CDN_URL } from '../../utils/Constants';

interface Props {
    navigation: any;
}

const { width, height } = Dimensions.get('window');

const CuisineBox: React.FunctionComponent<Props> = ({ navigation }) => {
    const dispatch: AppDispatch = useDispatch();

    const CuisineList = useSelector(cuisineList);
    const CuisineLoaded = useSelector(cuisineLoaded);

    const [cuisineListState, setCuisineList] = useState<any[]>([]);

    useEffect(() => {
        if (!CuisineLoaded) {
            dispatch(fetchCuisine());
        } else {
            setCuisineList(CuisineList.slice(0, 12))
        }
    }, [CuisineLoaded])

    const BoxItem = ({ item, index }: { item: any, index: number }) => {

        return (
            <View style={styles.boxStyle}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(`MenuScreenV2`, {
                        cuisineId: item?.id
                    })}
                    style={{}}
                >
                    <View style={{ alignItems: "center" }}>
                        <Image source={{ uri: `${CDN_URL}${item.imgUrl}` }} style={styles.categoryIcon} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.categoryText}>{item?.name}</Text>
            </View>
        )
    }

    return (
        <FlatList
            numColumns={4}
            data={cuisineListState}
            renderItem={BoxItem}
            scrollEnabled={false}
        />
    );
};

const styles = StyleSheet.create({
    categoryText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 14,
        textTransform: "capitalize",
        textAlign: "center",
    },
    categoryIcon: {
        width: width * .2,
        height: width * .2,
        resizeMode: "cover",
        borderRadius: FS(50)
    },
    boxStyle: {
        // aspectRatio: .7,
        flexGrow: 1,
        width: "24%",
        gap: HP(5),
        marginBottom: HP(20)
    }
});

const CuisineBoxSection = memo(CuisineBox);
export default CuisineBoxSection;