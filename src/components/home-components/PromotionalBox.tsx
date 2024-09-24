import React, { useRef, useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
    StyleSheet,
    ActivityIndicator,
    TextStyle,
    Text,
    TextInput,
    Image,
    FlatList,
    ImageBackground
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { FS, HP, VP } from '../../utils/Responsive';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';
import LeftWhite from '../../assets/svgs/left-white.svg';
import Right from '../../assets/svgs/right.svg';

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
        <View style={{ marginRight: HP(11.56), gap: 5 }}>
            <TouchableOpacity
                onPress={() => void (0)}
                style={{}}
            >
                <ImageBackground source={item.bg} style={styles.bg}>
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

export const PromotionalBox: React.FunctionComponent = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <Text style={styles.heading}>
                    De lounge Popular Tea
                </Text>
                <TouchableOpacity
                    onPress={() => void (0)}
                    style={styles.headingRightContainer}
                >
                    <Text style={styles.headingRightTitleStyle}>view all</Text>
                    <Right width={FS(12)} height={VP(12)} />
                </TouchableOpacity>
            </View>

            <View>
                <FlatList
                    data={data}
                    renderItem={({ item, index, separators }) => <BoxItems item={item} index={index} />}
                    contentContainerStyle={styles.listContainer}
                    horizontal={true}
                />
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
    headingRightContainer: {
        flexDirection: "row",
        gap: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxText: {
        ...TextStyles.ROBOTO_REGULAR,
        fontSize: 12,
        textTransform: "capitalize",
        textAlign: "center",
    },
    listContainer: {
        marginTop: VP(9)
    },
    bg: {
        width: FS(121.37),
        height: FS(96.23),
        borderRadius: FS(8.67),
        justifyContent: "flex-end",
        resizeMode: "contain"
    },
    headingRightTitleStyle: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 12,
        textTransform: "capitalize",
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
