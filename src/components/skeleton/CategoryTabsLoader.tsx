import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

import { FS, HP, VP } from '../../utils/Responsive';
import SkeletonLoader from './SkeletonLoader';


const CategoryTabsLoader: React.FunctionComponent = () => {

    return (
        <View style={styles.mainContainer}>
            <SkeletonLoader width={FS(100)} height={VP(25)} borderRadius={HP(20)} style={styles.loaderStyles} />
            <SkeletonLoader width={FS(100)} height={VP(25)} borderRadius={HP(20)} style={styles.loaderStyles} />
            <SkeletonLoader width={FS(100)} height={VP(25)} borderRadius={HP(20)} style={styles.loaderStyles} />
            <SkeletonLoader width={FS(100)} height={VP(25)} borderRadius={HP(20)} style={styles.loaderStyles} />
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

export default CategoryTabsLoader;