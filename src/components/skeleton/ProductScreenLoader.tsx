import React, { memo } from 'react';
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native';

import { FS, HP, VP } from '../../utils/Responsive';
import SkeletonLoaderSection from './SkeletonLoader';

const { width, height } = Dimensions.get('window');

const ProductScreenLoader: React.FunctionComponent = () => {

    return (
        <View style={styles.mainContainer}>
            <SkeletonLoaderSection width={width} height={height * 0.5} borderRadius={0} style={{ borderBottomLeftRadius: FS(50), borderBottomRightRadius: FS(50) }} />

            <View style={{ marginLeft: HP(30), marginRight: HP(30) }}>
                <SkeletonLoaderSection width={width - HP(60)} height={VP(27)} borderRadius={0} style={{ marginTop: VP(43) }} />

                <SkeletonLoaderSection width={width - HP(60)} height={VP(70)} borderRadius={0} style={{ marginTop: VP(14) }} />

                <SkeletonLoaderSection width={width - HP(60)} height={VP(27)} borderRadius={0} style={{ marginTop: VP(14) }} />

                <SkeletonLoaderSection width={width - HP(60)} height={VP(70)} borderRadius={0} style={{ marginTop: VP(14) }} />

                <SkeletonLoaderSection width={width - HP(60)} height={VP(27)} borderRadius={0} style={{ marginTop: VP(14) }} />

                <SkeletonLoaderSection width={width - HP(60)} height={VP(70)} borderRadius={0} style={{ marginTop: VP(14) }} />

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
    },
    loaderStyles: {
    }
});

const ProductScreenLoaderSection = memo(ProductScreenLoader);
export default ProductScreenLoaderSection;