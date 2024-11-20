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
import { CDN_URL, COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';
import { getItemPriceComponents } from '../../utils/helper/ItemHelper';
import PromotionalBoxLoader from '../skeleton/PromotionalBoxLoader';

interface Props {
    data: any[];
    dataLoaded: boolean;
    navigation: any;
}

const PromotionalBox: React.FunctionComponent<Props> = ({ data, dataLoaded, navigation }) => {

    const BoxItems = ({ item, index }: { item: any, index: number }) => {
        const itemData = getItemPriceComponents(item);

        return (
            <View style={styles.main}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(`ProductScreen`, {
                        id: itemData?.id,
                        item: itemData
                    })}
                >
                    <ImageBackground
                        source={{ 'uri': `${CDN_URL}${itemData?.imgUrl}` }}
                        style={styles.bg}
                        imageStyle={{ borderRadius: FS(8.67) }}
                    >
                        <View style={styles.contentBox}>
                            <Text style={styles.boxInsideFirstText}>{itemData?.discountPercent}% OFF</Text>
                            <Text style={styles.boxInsideSecondText}>Up to ${itemData?.totalDiscounted}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.boxText}>{itemData.name}</Text>
            </View>
        )
    }

    return (
        <View>
            {dataLoaded ? (
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => <BoxItems item={item} index={index} />}
                    contentContainerStyle={styles.listContainer}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            ) : (
                <PromotionalBoxLoader />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        marginRight: HP(11.56),
        flexGrow: 1,
        // width: "30%",
        gap: HP(5)
    },
    boxText: {
        ...TextStyles.ROBOTO_REGULAR,
        fontSize: HP(12),
        textTransform: "capitalize",
        textAlign: "center"
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
    contentBox: {
        paddingHorizontal: HP(15),
        paddingBottom: HP(15)
    },
    boxInsideFirstText: {
        ...TextStyles.RALEWAY_EXTRA_BOLD,
        color: COLORS.WHITE,
        fontSize: 10.52,
        textAlign: "left"
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