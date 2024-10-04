import React, { memo } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
} from 'react-native';

import { FS, HP, VP } from '../../utils/Responsive';
import SkeletonLoaderSection from './SkeletonLoader';

const CategoryItemLoader: React.FunctionComponent = () => {

    return (
        <View style={styles.mainContainer}>
            <SkeletonLoaderSection width={FS(95)} height={VP(95)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={FS(95)} height={VP(95)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={FS(95)} height={VP(95)} borderRadius={FS(16.42)} style={styles.loaderStyles} />

            <SkeletonLoaderSection width={FS(95)} height={VP(95)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={FS(95)} height={VP(95)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={FS(95)} height={VP(95)} borderRadius={FS(16.42)} style={styles.loaderStyles} />

            <SkeletonLoaderSection width={FS(95)} height={VP(95)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={FS(95)} height={VP(95)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={FS(95)} height={VP(95)} borderRadius={FS(16.42)} style={styles.loaderStyles} />

            <SkeletonLoaderSection width={FS(95)} height={VP(95)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={FS(95)} height={VP(95)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={FS(95)} height={VP(95)} borderRadius={FS(16.42)} style={styles.loaderStyles} />

            <SkeletonLoaderSection width={FS(95)} height={VP(95)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={FS(95)} height={VP(95)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={FS(95)} height={VP(95)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: HP(8),
    },
    loaderStyles: {
    }
});

const CategoryItemLoaderSection = memo(CategoryItemLoader);
export default CategoryItemLoaderSection;