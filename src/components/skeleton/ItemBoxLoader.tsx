import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

import { FS, HP, VP } from '../../utils/Responsive';
import SkeletonLoader from './SkeletonLoader';


const ItemBoxLoader: React.FunctionComponent = () => {

    return (
        <View style={styles.mainContainer}>
            <SkeletonLoader width={FS(183)} height={VP(194)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
            <SkeletonLoader width={FS(183)} height={VP(194)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
            <SkeletonLoader width={FS(183)} height={VP(194)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
            <SkeletonLoader width={FS(183)} height={VP(194)} borderRadius={FS(16.42)} style={styles.loaderStyles} />
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

export default ItemBoxLoader;