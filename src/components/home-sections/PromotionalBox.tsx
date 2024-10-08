import React, { memo } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    FlatList,
    ImageBackground
} from 'react-native';

import { FS, HP, VP } from '../../utils/Responsive';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';

const data = [
    {
        "title": "Brown Sugar Milk..",
        "firstText": "20% OFF",
        "secondText": "Up to $12.00",
        "bg": require(`../../assets/icons/promotional/1.png`)
    },
    {
        "title": "Brown Sugar Milk..",
        "firstText": "20% OFF",
        "secondText": "Up to $12.00",
        "bg": require(`../../assets/icons/promotional/2.png`)
    },
    {
        "title": "Brown Sugar Milk..",
        "firstText": "20% OFF",
        "secondText": "Up to $12.00",
        "bg": require(`../../assets/icons/promotional/3.png`)
    }
]

const BoxItems = ({ item, index }: { item: any, index: number }) => {

    return (
        <View style={{ marginRight: HP(11.56), flexGrow: 1, width: "30%", gap: HP(5) }}>
            <TouchableOpacity
                onPress={() => void (0)}
                style={{}}
            >
                <ImageBackground source={item.bg} style={styles.bg} imageStyle={{ borderRadius: FS(8.67) }}>
                    <View style={{ paddingHorizontal: HP(15), paddingBottom: HP(15) }}>
                        <Text style={styles.boxInsideFirstText}>{item.firstText}</Text>
                        <Text style={styles.boxInsideSecondText}>{item.secondText}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
            <Text style={styles.boxText}>{item.title}</Text>
        </View>
    )
}

interface Props {
    navigation: any;
}

const PromotionalBox: React.FunctionComponent<Props> = ({ navigation }) => {
    return (
        <View style={{}}>
            <View>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => <BoxItems item={item} index={index} />}
                    contentContainerStyle={styles.listContainer}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    boxText: {
        ...TextStyles.ROBOTO_REGULAR,
        fontSize: HP(12),
        textTransform: "capitalize",
        textAlign: "center",
    },
    listContainer: {
        marginTop: VP(9)
    },
    bg: {
        width: FS(121.37),
        height: FS(96.23),
        justifyContent: "flex-end",
        resizeMode: "contain"
    },
    boxInsideFirstText: {
        ...TextStyles.RALEWAY_EXTRA_BOLD,
        color: COLORS.WHITE,
        fontSize: 10.52,
        textAlign: "left",
    },
    boxInsideSecondText: {
        ...TextStyles.KANIT_REGULAR,
        color: COLORS.WHITE,
        fontSize: 11.18,
        textAlign: "left"
    }
});

const PromotionalBoxSection = memo(PromotionalBox);
export default PromotionalBoxSection;