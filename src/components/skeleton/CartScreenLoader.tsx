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

const CartScreenLoader: React.FunctionComponent = () => {

    const RepeatedContainer = () => {
        return (
            <View style={styles.boxContainer}>
                <View style={styles.boxSubContainer}>
                    <SkeletonLoaderSection width={width} height={VP(27)} borderRadius={0} style={styles.img} />

                    <View style={styles.itemInfoContainer}>
                        <View style={{ flex: 1 }}>
                            <SkeletonLoaderSection width={FS(80)} height={VP(20)} borderRadius={0} style={{ marginRight: HP(5) }} />

                            <SkeletonLoaderSection width={FS(40)} height={VP(20)} borderRadius={0} style={{ marginTop: HP(5) }} />

                        </View>
                        <View style={{ flexDirection: "row", gap: HP(4), alignItems: "center", justifyContent: 'space-between', }}>
                            <SkeletonLoaderSection width={FS(20)} height={FS(20)} borderRadius={FS(10)} style={{ marginTop: HP(5) }} />

                            <SkeletonLoaderSection width={FS(15)} height={VP(15)} borderRadius={0} style={{ marginTop: HP(5) }} />

                            <SkeletonLoaderSection width={FS(20)} height={FS(20)} borderRadius={FS(10)} style={{ marginTop: HP(5) }} />

                            <SkeletonLoaderSection width={FS(15)} height={VP(20)} borderRadius={5} style={{ marginTop: HP(5) }} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <View style={{ paddingHorizontal: HP(21), flexDirection: "row", alignItems: "center", gap: HP(100) }}>
                <SkeletonLoaderSection width={FS(20)} height={VP(20)} borderRadius={0} style={{ flex: 2 }} />

                <SkeletonLoaderSection width={FS(50)} height={VP(20)} borderRadius={0} style={{ flex: 3 }} />
            </View>

            <View style={{ marginTop: VP(34), backgroundColor: COLORS.WHITE, borderRadius: HP(21), marginHorizontal: HP(20) }}>
                {[1, 2, 3].map((d, i) => (
                    <View key={`${i}`}>
                        <RepeatedContainer />
                    </View>
                ))}

                <View style={styles.textBox}>
                    <SkeletonLoaderSection width={FS(150)} height={VP(20)} borderRadius={0} style={{}} />

                    <SkeletonLoaderSection width={FS(30)} height={FS(30)} borderRadius={FS(15)} style={{}} />
                </View>

                <View style={styles.textBox}>
                    <SkeletonLoaderSection width={FS(200)} height={VP(20)} borderRadius={0} style={{}} />

                    <SkeletonLoaderSection width={FS(30)} height={FS(30)} borderRadius={FS(15)} style={{}} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        paddingVertical: HP(20)
    },
    boxContainer: {
        padding: HP(21),
        borderBottomColor: "#E3E3E3",
        borderBottomWidth: 1
    },
    boxSubContainer: {
        flexDirection: "row",
        gap: HP(20),
        alignItems: "center",
        justifyContent: "space-between"
    },
    img: {
        width: FS(83),
        height: VP(83),
        resizeMode: "cover",
        borderRadius: HP(14),
    },
    itemInfoContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: HP(8)
    },
    textBox: {
        flexDirection: "row",
        padding: HP(26),
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: "#E3E3E3",
        borderBottomWidth: 1
    },
    loaderStyles: {
    }
});

const CartScreenLoaderSection = memo(CartScreenLoader);
export default CartScreenLoaderSection;