import React, { memo } from 'react';
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native';

import { FS, HP, VP } from '../../utils/Responsive';
import SkeletonLoaderSection from './SkeletonLoader';

const { width, height } = Dimensions.get('window');

const MenuItemLoader: React.FunctionComponent = () => {

    return (
        <View style={styles.mainContainer}>
            <SkeletonLoaderSection width={(width / 2) - HP(20.25)} height={VP(160.16)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={(width / 2) - HP(20.25)} height={VP(160.16)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={(width / 2) - HP(20.25)} height={VP(160.16)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={(width / 2) - HP(20.25)} height={VP(160.16)} borderRadius={FS(16.42)} style={styles.loaderStyles} />

            <SkeletonLoaderSection width={(width / 2) - HP(20.25)} height={VP(160.16)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={(width / 2) - HP(20.25)} height={VP(160.16)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: HP(6)
    },
    loaderStyles: {
    }
});

const MenuItemLoaderSection = memo(MenuItemLoader);
export default MenuItemLoaderSection;