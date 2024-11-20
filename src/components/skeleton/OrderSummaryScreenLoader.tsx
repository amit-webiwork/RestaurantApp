import React, { memo } from 'react';
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native';

import { FS, HP, VP } from '../../utils/Responsive';
import SkeletonLoaderSection from './SkeletonLoader';
import { COLORS } from '../../utils/Constants';

const { width, height } = Dimensions.get('window');

const OrderSummaryScreenLoader: React.FunctionComponent = () => {

    return (
        <View style={styles.mainContainer}>
            <View style={{ paddingHorizontal: HP(21), flexDirection: "row", alignItems: "center", gap: HP(100) }}>
                <View>
                    <SkeletonLoaderSection width={FS(15)} height={VP(20)} borderRadius={0} style={{}} />
                </View>

                <View>
                    <SkeletonLoaderSection width={FS(100)} height={VP(20)} borderRadius={0} style={{}} />
                </View>
            </View>

            <View style={styles.boxContainer}>
                <View style={styles.boxSubContainer}>
                    <View style={{ flexDirection: "row", gap: HP(19), alignItems: "center" }}>
                        <SkeletonLoaderSection width={FS(53)} height={VP(41.31)} borderRadius={HP(4.17)} style={{}} />
                        <SkeletonLoaderSection width={FS(75)} height={VP(20)} borderRadius={0} style={{}} />
                    </View>
                    <SkeletonLoaderSection width={FS(280)} height={VP(1)} borderRadius={0} style={{}} />
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: HP(10) }}>
                        <View style={{ gap: HP(12) }}>
                            <SkeletonLoaderSection width={FS(200)} height={VP(20)} borderRadius={0} style={{}} />
                            <SkeletonLoaderSection width={FS(200)} height={VP(20)} borderRadius={0} style={{}} />
                            <SkeletonLoaderSection width={FS(200)} height={VP(20)} borderRadius={0} style={{}} />
                            <SkeletonLoaderSection width={FS(200)} height={VP(20)} borderRadius={0} style={{}} />
                        </View>
                        <SkeletonLoaderSection width={FS(25)} height={VP(15)} borderRadius={0} style={{ alignSelf: "flex-end" }} />
                    </View>
                    <SkeletonLoaderSection width={FS(280)} height={VP(1)} borderRadius={0} style={{}} />
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: HP(10) }}></View>

                    <View style={{ paddingHorizontal: HP(10), gap: HP(12) }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <SkeletonLoaderSection width={FS(150)} height={VP(15)} borderRadius={0} style={{}} />
                            <SkeletonLoaderSection width={FS(50)} height={VP(15)} borderRadius={0} style={{}} />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <SkeletonLoaderSection width={FS(150)} height={VP(15)} borderRadius={0} style={{}} />
                            <SkeletonLoaderSection width={FS(50)} height={VP(15)} borderRadius={0} style={{}} />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <SkeletonLoaderSection width={FS(150)} height={VP(15)} borderRadius={0} style={{}} />
                            <SkeletonLoaderSection width={FS(50)} height={VP(15)} borderRadius={0} style={{}} />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <SkeletonLoaderSection width={FS(150)} height={VP(15)} borderRadius={0} style={{}} />
                            <SkeletonLoaderSection width={FS(50)} height={VP(15)} borderRadius={0} style={{}} />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <SkeletonLoaderSection width={FS(150)} height={VP(15)} borderRadius={0} style={{}} />
                            <SkeletonLoaderSection width={FS(50)} height={VP(15)} borderRadius={0} style={{}} />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <SkeletonLoaderSection width={FS(150)} height={VP(15)} borderRadius={0} style={{}} />
                            <SkeletonLoaderSection width={FS(50)} height={VP(15)} borderRadius={0} style={{}} />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <SkeletonLoaderSection width={FS(150)} height={VP(15)} borderRadius={0} style={{}} />
                            <SkeletonLoaderSection width={FS(50)} height={VP(15)} borderRadius={0} style={{}} />
                        </View>
                    </View>
                </View>
                <SkeletonLoaderSection width={FS(250)} height={VP(45)} borderRadius={0} style={{ marginTop: VP(30), borderRadius: HP(8.02), alignSelf: "center" }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        paddingVertical: HP(20),
        backgroundColor: COLORS.WHITE,
        height
    },
    boxContainer: {
        marginTop: VP(32),
        marginHorizontal: (width * .05)
    },
    boxSubContainer: {
        shadowColor: "#171717",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: COLORS.WHITE,
        borderRadius: HP(10),
        padding: HP(14),
        gap: HP(14.69),
    },
});

const OrderSummaryScreenLoaderSection = memo(OrderSummaryScreenLoader);
export default OrderSummaryScreenLoaderSection;