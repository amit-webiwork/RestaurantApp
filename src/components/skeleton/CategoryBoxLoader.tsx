import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

import { FS, HP, VP } from '../../utils/Responsive';
import SkeletonLoader from './SkeletonLoader';


const CategoryBoxLoader: React.FunctionComponent = () => {

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <SkeletonLoader width={FS(78.94)} height={VP(78.01)} borderRadius={HP(16)} style={styles.loaderStyles} />
                <SkeletonLoader width={FS(39.47)} height={VP(10)} />
            </View>
            <View style={styles.subContainer}>
                <SkeletonLoader width={FS(78.94)} height={VP(78.01)} borderRadius={HP(16)} style={styles.loaderStyles} />
                <SkeletonLoader width={FS(39.47)} height={VP(10)} style={{}} />
            </View>
            <View style={styles.subContainer}>
                <SkeletonLoader width={FS(78.94)} height={VP(78.01)} borderRadius={HP(16)} style={styles.loaderStyles} />
                <SkeletonLoader width={FS(39.47)} height={VP(10)} style={{}} />
            </View>
            <View style={styles.subContainer}>
                <SkeletonLoader width={FS(78.94)} height={VP(78.01)} borderRadius={HP(16)} style={styles.loaderStyles} />
                <SkeletonLoader width={FS(39.47)} height={VP(10)} style={{}} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        marginTop: VP(9)
    },
    subContainer: {
        alignItems: "center",
        marginRight: HP(15)
    },
    loaderStyles: {
        marginBottom: 10
    }
});

export default CategoryBoxLoader;