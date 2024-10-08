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

const MenuVerticalItemLoader: React.FunctionComponent = () => {

    return (
        <>
            <View style={styles.mainContainer}>
                <SkeletonLoaderSection width={(width * 1) - HP(50)} height={VP(234.33)} borderRadius={FS(24.42)} style={styles.loaderStyles} />

                <SkeletonLoaderSection width={FS(235)} height={VP(23)} borderRadius={0} style={{ marginHorizontal: HP(10), marginTop: VP(8.4), alignSelf: "flex-start" }} />

                <SkeletonLoaderSection width={FS(46)} height={VP(16)} borderRadius={0} style={{ marginHorizontal: HP(10), marginTop: VP(1.22), alignSelf: "flex-start" }} />

                <SkeletonLoaderSection width={width * .9} height={VP(2)} borderRadius={0} style={{ marginHorizontal: HP(10), marginTop: VP(6.2), alignSelf: "flex-start" }} />

                <View style={{ marginHorizontal: HP(10), marginTop: VP(10.22), flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignSelf: "flex-start", paddingVertical: HP(8.04), }}>
                    <SkeletonLoaderSection width={FS(180)} height={VP(37)} borderRadius={0} style={{}} />

                    <SkeletonLoaderSection width={FS(24)} height={VP(24)} borderRadius={HP(12)} style={{ left: "30%" }} />
                </View>
            </View>

            <View style={styles.mainContainer}>
                <SkeletonLoaderSection width={(width * 1) - HP(50)} height={VP(234.33)} borderRadius={FS(24.42)} style={styles.loaderStyles} />

                <SkeletonLoaderSection width={FS(235)} height={VP(23)} borderRadius={0} style={{ marginHorizontal: HP(10), marginTop: VP(8.4), alignSelf: "flex-start" }} />

                <SkeletonLoaderSection width={FS(46)} height={VP(16)} borderRadius={0} style={{ marginHorizontal: HP(10), marginTop: VP(1.22), alignSelf: "flex-start" }} />

                <SkeletonLoaderSection width={width * .9} height={VP(2)} borderRadius={0} style={{ marginHorizontal: HP(10), marginTop: VP(6.2), alignSelf: "flex-start" }} />

                <View style={{ marginHorizontal: HP(10), marginTop: VP(10.22), flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignSelf: "flex-start", paddingVertical: HP(8.04), }}>
                    <SkeletonLoaderSection width={FS(180)} height={VP(37)} borderRadius={0} style={{}} />

                    <SkeletonLoaderSection width={FS(24)} height={VP(24)} borderRadius={HP(12)} style={{ left: "30%" }} />
                </View>
            </View>

            <View style={styles.mainContainer}>
                <SkeletonLoaderSection width={(width * 1) - HP(50)} height={VP(234.33)} borderRadius={FS(24.42)} style={styles.loaderStyles} />

                <SkeletonLoaderSection width={FS(235)} height={VP(23)} borderRadius={0} style={{ marginHorizontal: HP(10), marginTop: VP(8.4), alignSelf: "flex-start" }} />

                <SkeletonLoaderSection width={FS(46)} height={VP(16)} borderRadius={0} style={{ marginHorizontal: HP(10), marginTop: VP(1.22), alignSelf: "flex-start" }} />

                <SkeletonLoaderSection width={width * .9} height={VP(2)} borderRadius={0} style={{ marginHorizontal: HP(10), marginTop: VP(6.2), alignSelf: "flex-start" }} />

                <View style={{ marginHorizontal: HP(10), marginTop: VP(10.22), flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignSelf: "flex-start", paddingVertical: HP(8.04), }}>
                    <SkeletonLoaderSection width={FS(180)} height={VP(37)} borderRadius={0} style={{}} />

                    <SkeletonLoaderSection width={FS(24)} height={VP(24)} borderRadius={HP(12)} style={{ left: "30%" }} />
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: VP(6),
        paddingHorizontal: HP(6.46),
        paddingVertical: HP(7.67),
        borderRadius: FS(24.42),
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
        flex: 1,
        alignItems: "center"
    },
    loaderStyles: {
    }
});

const MenuVerticalItemLoaderSection = memo(MenuVerticalItemLoader);
export default MenuVerticalItemLoaderSection;