import React, { memo } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

import { FS, HP, VP } from '../../utils/Responsive';
import SkeletonLoaderSection from './SkeletonLoader';


const PromotionalBoxLoader: React.FunctionComponent = () => {

    return (
        <View style={styles.mainContainer}>
            <SkeletonLoaderSection width={FS(121.37)} height={VP(96.23)} borderRadius={FS(8.67)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={FS(121.37)} height={VP(96.23)} borderRadius={FS(8.67)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={FS(121.37)} height={VP(96.23)} borderRadius={FS(8.67)} style={styles.loaderStyles} />
            <SkeletonLoaderSection width={FS(121.37)} height={VP(96.23)} borderRadius={FS(8.67)} style={styles.loaderStyles} />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        marginTop: VP(9)
    },
    loaderStyles: {
        marginRight: HP(11.56)
    }
});

const PromotionalBoxLoaderSection = memo(PromotionalBoxLoader);
export default PromotionalBoxLoaderSection;