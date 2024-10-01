import React, { memo } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

import { FS, HP, VP } from '../../utils/Responsive';
import SkeletonLoaderSection from './SkeletonLoader';


const ItemBoxLoader: React.FunctionComponent = () => {

    return (
        <View style={styles.mainContainer}>
            <SkeletonLoaderSection width={FS(183)} height={VP(194)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={FS(183)} height={VP(194)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={FS(183)} height={VP(194)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={FS(183)} height={VP(194)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row"
    },
    loaderStyles: {
        marginRight: HP(14)
    }
});

const ItemBoxLoaderSection = memo(ItemBoxLoader);
export default ItemBoxLoaderSection;