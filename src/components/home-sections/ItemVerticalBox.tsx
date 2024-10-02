import React, { memo } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    FlatList,
    ImageBackground
} from 'react-native';

import Icon, { Icons } from '../Icons';
import { FS, HP, VP } from '../../utils/Responsive';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';

const data = [
    {
        "title": "brownie with ice-cream",
        "firstText": "1 piece",
        "secondText": "20% OFF up to $4.00",
        "price": 12.00,
        "bg": require(`../../assets/images/items/full-1.png`)
    },
    {
        "title": "brownie with ice-cream",
        "firstText": "1 piece",
        "secondText": "20% OFF up to $4.00",
        "price": 12.00,
        "bg": require(`../../assets/images/items/2.png`)
    },
    {
        "title": "brownie with ice-cream",
        "firstText": "1 piece",
        "secondText": "20% OFF up to $4.00",
        "price": 12.00,
        "bg": require(`../../assets/images/items/3.png`)
    }
]

const BoxItems = ({ item, index }: { item: any, index: number }) => {

    return (
        <View style={styles.boxContainer}>
            <View style={styles.boxSubContainer}>
                <View
                    style={{ width: "100%" }}
                >
                    <ImageBackground source={item.bg} style={styles.bg} imageStyle={{ borderRadius: FS(24.42) }}>
                        <View style={styles.priceBox}>
                            <View style={styles.priceSubBox}>
                                <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => void (0)}
                            >
                                <Icon type={Icons.Feather} size={20} name={`heart`} color={COLORS.WHITE} />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>

                <View style={styles.contentBox}>
                    <TouchableOpacity
                        onPress={() => void (0)}
                    >
                        <Text style={styles.boxTitle}>{item.title}</Text>
                        <Text style={styles.boxText}>{item.firstText}</Text>
                    </TouchableOpacity>

                    <View style={styles.line}>
                    </View>

                    <View style={styles.offerBox}>
                       <Icon type={Icons.MaterialCommunityIcons} size={21.39} name={`sale`} color={COLORS.HOME_ICONS} />
                        <Text style={styles.offerText}> {item.secondText}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const ItemVerticalBox: React.FunctionComponent = () => {
    return (
        <FlatList
            data={data}
            renderItem={({ item, index }) => <BoxItems item={item} index={index} />}
            contentContainerStyle={{}}
            scrollEnabled={false}
        />
    );
};

const styles = StyleSheet.create({
    boxContainer: {
        paddingBottom: HP(16),
        paddingLeft: HP(5),
        paddingRight: HP(5),
    },
    boxSubContainer: {
        paddingHorizontal: HP(6.46),
        paddingVertical: HP(7.67),
        borderRadius: FS(25.35),
        shadowOpacity: 0.2,
        backgroundColor: COLORS.WHITE,
        shadowColor: "#000",
        shadowOffset: {
            width: -2,
            height: 4,
        },
        shadowRadius: 3,
        elevation: 4,
        flexDirection: "column",
        width: "100%",
        flex: 1
    },
    contentBox: {
        paddingHorizontal: HP(12.46),
        paddingVertical: HP(8.04),
    },
    boxTitle: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 20,
        textTransform: "capitalize"
    },
    boxText: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 14,
        paddingTop: HP(1.22),
        color: "#787878"
    },
    bg: {
        width: "100%",
        height: VP(234.33),
        resizeMode: "contain",
        flex: 1
    },
    priceBox: {
        marginHorizontal: HP(17.67),
        marginVertical: HP(16.67),
        flexDirection: "row",
        justifyContent: "space-between"
    },
    priceSubBox: {
        backgroundColor: "#00000080",
        padding: 5,
        alignSelf: 'flex-start',
        borderRadius: 4.75,
    },
    priceText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 12.67,
        color: COLORS.WHITE,
        top: VP(-2)
    },
    line: {
        height: 1,
        backgroundColor: "#B4B4B4",
        marginVertical: HP(6.2),
        flex: 1
    },
    offerBox: {
        marginTop: HP(4.01),
        flexDirection: 'row',
        alignItems: "center",
        gap: HP(2)
    },
    offerText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 16,
        color: COLORS.HOME_ICONS,
        top: VP(-2)
    }
});

const ItemVerticalBoxSection = memo(ItemVerticalBox);
export default ItemVerticalBoxSection;
