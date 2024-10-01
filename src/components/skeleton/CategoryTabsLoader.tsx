import React, { memo } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

import { FS, HP, VP } from '../../utils/Responsive';
import SkeletonLoaderSection from './SkeletonLoader';


const CategoryTabsLoader: React.FunctionComponent = () => {

    return (
        <View style={styles.mainContainer}>
            <SkeletonLoaderSection width={FS(100)} height={VP(25)} borderRadius={HP(20)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={FS(100)} height={VP(25)} borderRadius={HP(20)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={FS(100)} height={VP(25)} borderRadius={HP(20)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={FS(100)} height={VP(25)} borderRadius={HP(20)} style={styles.loaderStyles} />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
    },
    loaderStyles: {
        marginRight: HP(6)
    }
});

const CategoryTabsLoaderSection = memo(CategoryTabsLoader);
export default CategoryTabsLoaderSection;