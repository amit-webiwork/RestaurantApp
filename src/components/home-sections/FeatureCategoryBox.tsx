import React, { memo } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Image,
    FlatList
} from 'react-native';

import { FS, HP, VP } from '../../utils/Responsive';
import { TextStyles } from '../../utils/TextStyles';

const data = [
    {
        "title": "Milk Tea",
        "icon": require(`../../assets/images/categories/1.png`)
    },
    {
        "title": "acai",
        "icon": require(`../../assets/images/categories/2.png`)
    },
    {
        "title": "dessert",
        "icon": require(`../../assets/images/categories/3.png`)
    },
    {
        "title": "yeti yoghurt",
        "icon": require(`../../assets/images/categories/4.png`)
    },
    {
        "title": "lemonade",
        "icon": require(`../../assets/images/categories/5.png`)
    },
    {
        "title": "fruit tea",
        "icon": require(`../../assets/images/categories/6.png`)
    },
    {
        "title": "mango crusher",
        "icon": require(`../../assets/images/categories/7.png`)
    },
    {
        "title": "Milk Tea",
        "icon": require(`../../assets/images/categories/1.png`)
    },
]

const CategoryItem = ({ item, index }: { item: any, index: number }) => {

    return (
        <View style={styles.boxStyle}>
            <TouchableOpacity
                onPress={() => void (0)}
                style={{}}
            >
                <View style={{ alignItems: "center" }}>
                    <Image source={item.icon} style={styles.categoryIcon} />
                </View>
            </TouchableOpacity>
            <Text style={styles.categoryText}>{item.title}</Text>
        </View>
    )
}

const FeatureCategoryBox: React.FunctionComponent = () => {
    return (
        <FlatList
            numColumns={4}
            data={data}
            renderItem={({ item, index }) => <CategoryItem item={item} index={index} />}
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
        width: FS(100),
        height: VP(60),
        resizeMode: "contain"
    },
    boxStyle: {
        aspectRatio: .7,
        flexGrow: 1,
        width: "24%",
        gap: 5
    }
});

const FeatureCategoryBoxSection = memo(FeatureCategoryBox);
export default FeatureCategoryBoxSection;