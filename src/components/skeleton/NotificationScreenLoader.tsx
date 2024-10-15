import React, { memo } from 'react';
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native';

import { FS, HP, VP } from '../../utils/Responsive';
import SkeletonLoaderSection from './SkeletonLoader';
import { COLORS } from '../../utils/Constants';
import { globalStyle } from '../../utils/GlobalStyle';

const { width, height } = Dimensions.get('window');

const NotificationScreenLoader: React.FunctionComponent = () => {

    const RepeatedContainer = () => {
        return (
            <View style={styles.boxContainer}>
                <SkeletonLoaderSection width={FS(100)} height={VP(20)} borderRadius={0} style={{}} />

                <View style={{ gap: HP(19.53), marginTop: VP(19.53) }}>
                    <View style={styles.itemRow}>
                        <View style={styles.iconBtn}>
                        </View>

                        <View style={{ flexBasis: "80%", flexShrink: 1, marginTop: VP(15) }}>
                            <SkeletonLoaderSection width={FS(150)} height={VP(25)} borderRadius={0} style={{}} />

                            <SkeletonLoaderSection width={FS(225)} height={VP(20)} borderRadius={0} style={{ marginTop: VP(15) }} />

                            <SkeletonLoaderSection width={FS(100)} height={VP(10)} borderRadius={0} style={{ marginTop: VP(15) }} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <View style={{ paddingHorizontal: HP(21), flexDirection: "row", alignItems: "center", gap: HP(100) }}>
                <SkeletonLoaderSection width={FS(20)} height={VP(20)} borderRadius={0} style={{ flex: 2 }} />

                <SkeletonLoaderSection width={FS(50)} height={VP(20)} borderRadius={0} style={{ flex: 3 }} />
            </View>

            <View style={{ marginTop: VP(30), marginHorizontal: HP(20), marginVertical: VP(28) }}>

                {[1, 2, 3, 4].map((d, i) => (
                    <View key={`${i}`}>
                        <RepeatedContainer />
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        paddingVertical: HP(30),
        backgroundColor: COLORS.WHITE,
        height: height * 1
    },
    itemRow: {
        flexDirection: "row",
        gap: HP(19.53),
        alignItems: "center"
    },
    iconBtn: {
        width: FS(58),
        height: FS(58),
        borderRadius: FS(29),
        backgroundColor: "#e0e0e0",
        alignItems: "center",
        justifyContent: "center",
        flexBasis: "20%"
    },
    boxContainer: {
        borderBottomColor: "#E3E3E3",
        borderBottomWidth: 1,
        paddingBottom: VP(20),
        paddingTop: VP(20),
    },
});

const NotificationScreenLoaderSection = memo(NotificationScreenLoader);
export default NotificationScreenLoaderSection;