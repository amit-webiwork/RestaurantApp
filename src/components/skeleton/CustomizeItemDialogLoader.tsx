import React, { memo } from 'react';
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native';

import { FS, HP, VP } from '../../utils/Responsive';
import SkeletonLoaderSection from './SkeletonLoader';

const { width, height } = Dimensions.get('window');

const CustomizeItemDialogLoader: React.FunctionComponent = () => {

    return (
        <View style={styles.mainContainer}>
            <SkeletonLoaderSection width={width * .93} height={VP(220)} borderRadius={HP(15)} style={{ margin: "auto" }} />

            <View style={styles.contentBox}>
                <SkeletonLoaderSection width={width * .6} height={VP(20)} borderRadius={0} style={{ marginTop: VP(10) }} />

                <SkeletonLoaderSection width={width * .5} height={VP(20)} borderRadius={0} style={{ marginTop: VP(15) }} />

                <View style={{ marginTop: VP(34), flexDirection: "row", gap: HP(10) }}>
                    <SkeletonLoaderSection width={width * .15} height={VP(15)} borderRadius={0} style={{}} />
                    <SkeletonLoaderSection width={width * .15} height={VP(15)} borderRadius={0} style={{}} />
                    <SkeletonLoaderSection width={width * .15} height={VP(15)} borderRadius={0} style={{}} />
                    <SkeletonLoaderSection width={width * .15} height={VP(15)} borderRadius={0} style={{}} />
                    <SkeletonLoaderSection width={width * .15} height={VP(15)} borderRadius={0} style={{}} />
                </View>

                <View style={{ marginTop: VP(20), flexDirection: "row", justifyContent: "space-between" }}>
                    <SkeletonLoaderSection width={width * .3} height={VP(15)} borderRadius={0} style={{}} />

                    <SkeletonLoaderSection width={FS(15)} height={VP(15)} borderRadius={0} style={{}} />
                </View>
                <View style={styles.lineTab}></View>

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <SkeletonLoaderSection width={width * .3} height={VP(15)} borderRadius={0} style={{}} />

                    <SkeletonLoaderSection width={FS(15)} height={VP(15)} borderRadius={0} style={{}} />
                </View>

                <View style={styles.lineTab}></View>

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <SkeletonLoaderSection width={width * .3} height={VP(15)} borderRadius={0} style={{}} />

                    <SkeletonLoaderSection width={FS(15)} height={VP(15)} borderRadius={0} style={{}} />
                </View>

                <View style={styles.lineTab}></View>

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <SkeletonLoaderSection width={width * .3} height={VP(15)} borderRadius={0} style={{}} />

                    <SkeletonLoaderSection width={FS(15)} height={VP(15)} borderRadius={0} style={{}} />
                </View>

                <View style={styles.lineTab}></View>

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <SkeletonLoaderSection width={width * .3} height={VP(15)} borderRadius={0} style={{}} />

                    <SkeletonLoaderSection width={FS(15)} height={VP(15)} borderRadius={0} style={{}} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
    },
    loaderStyles: {
    },
    contentBox: {
        paddingHorizontal: HP(12.46),
        paddingVertical: HP(8.04)
    },
    lineTab: {
        height: 1,
        flex: 1,
        flexGrow: 1,
        backgroundColor: "#E6E6E6",
        marginTop: VP(7.5),
        marginBottom: VP(7.5)
    },
});

const CustomizeItemDialogLoaderSection = memo(CustomizeItemDialogLoader);
export default CustomizeItemDialogLoaderSection;