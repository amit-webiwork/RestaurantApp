import React, { memo } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
} from 'react-native';

import { FS, HP, VP } from '../../utils/Responsive';
import SkeletonLoaderSection from './SkeletonLoader';

const MenuItemLoader: React.FunctionComponent = () => {

    return (
        <View style={styles.mainContainer}>
            <SkeletonLoaderSection width={FS(140.45)} height={VP(160.16)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={FS(140.45)} height={VP(160.16)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={FS(140.45)} height={VP(160.16)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={FS(140.45)} height={VP(160.16)} borderRadius={FS(16.42)} style={styles.loaderStyles} />

            <SkeletonLoaderSection width={FS(140.45)} height={VP(160.16)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={FS(140.45)} height={VP(160.16)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: HP(8)
    },
    loaderStyles: {
    }
});

const MenuItemLoaderSection = memo(MenuItemLoader);
export default MenuItemLoaderSection;