import React, { memo } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';

import { HP, VP } from '../../utils/Responsive';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';
import Icon, { Icons } from '../Icons';

interface Props {
    data: any;
}

const ProductRatings: React.FunctionComponent<Props> = ({ data }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>ratings & reviews</Text>

            <View style={{ flexDirection: "row", marginTop: VP(6.9), gap: HP(9.78), justifyContent: "center", alignItems: "center" }}>
                <View style={styles.ratingBox}>
                    <Text style={styles.ratingText}>{data?.avgRating || 0}</Text>
                    <Icon type={Icons.MaterialIcons} size={11} name={`star`} color={COLORS.WHITE} />
                </View>

                <Text style={styles.ratingInfoText}>{data?.totalRating || 0} ratings | {data?.totalReviews || 0} reviews</Text>
            </View>

            <View style={{ marginTop: VP(18.34) }}>
                <Text style={[styles.heading]}>Customer Reviews ({data?.totalReviews || 0})</Text>

                {(data?.ratings || []).slice(0, 2).map((d, i) => (
                    <View key={`ratings-${i}`} style={{ gap: HP(17.12) }}>
                        <View style={{ flexDirection: "row", marginTop: VP(6.9), gap: HP(9.78), justifyContent: "center", alignItems: "center" }}>
                            <View style={styles.ratingBox}>
                                <Text style={styles.ratingText}>{d?.rating || 0}</Text>
                                <Icon type={Icons.MaterialIcons} size={11} name={`star`} color={COLORS.WHITE} />
                            </View>

                            <Text style={styles.ratingInfoText}>1 month ago</Text>
                        </View>

                        <Text style={styles.ratingDesc}>{d.description}</Text>

                        <View style={styles.line}></View>
                    </View>
                ))}
                <TouchableOpacity
                    onPress={() => void (0)}
                >
                    <Text style={styles.ratingLink}>view all 50 reviews {`>`}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    heading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 17.12
    },
    ratingBox: {
        flexDirection: "row",
        backgroundColor: COLORS.BUTTON,
        padding: HP(6),
        alignItems: "center",
        borderRadius: HP(5.54)
    },
    ratingText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 13.86,
        color: COLORS.WHITE,
        top: VP(-3)
    },
    ratingInfoText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 14.67,
        color: "#848484",
        flex: 1
    },
    ratingDesc: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 14,
        color: "#5F5F5F"
    },
    line: {
        height: 1,
        width: "100%",
        flex: 1,
        flexGrow: 1,
        backgroundColor: "#CDCDCD",
        marginBottom: HP(9.78)
    },
    ratingLink: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 17.12,
        color: COLORS.BUTTON
    }
});

const ProductRatingsSection = memo(ProductRatings);
export default ProductRatingsSection;