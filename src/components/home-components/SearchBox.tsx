import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
    StyleSheet,
    ActivityIndicator,
    TextStyle,
    Text,
    TextInput,
    Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { FS, HP, VP } from '../../utils/Responsive';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';

export const SearchBox: React.FunctionComponent = () => {
    const [searchText, setSearchText] = useState<any>("");
    const [error, setError] = useState({ status: false, text: "" });

    return (
        <View style={styles.mainContainer}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, { borderBottomColor: error.status ? COLORS.RED : "#A0A0A0" }]}
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder="Search like bubble tea"
                    placeholderTextColor={`#A0A0A0`}
                />
                <Image source={require(`../../assets/icons/search.png`)} style={[styles.inputIconLeft]} />
                <Image source={require(`../../assets/icons/mic.png`)} style={[styles.inputIconRight]} />
            </View>
            <TouchableOpacity
                onPress={() => void (0)}
                style={styles.iconContainer}
            >
                <Image source={require(`../../assets/icons/filter.png`)} style={[styles.iconRight]} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        gap: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    inputContainer: {
        // marginVertical: VP(48),
        // marginHorizontal: HP(20),
        justifyContent: 'center',
        alignContent: "center",
        alignItems: "center",
        zIndex: 2,
        flexBasis: "85%"
    },
    input: {
        ...TextStyles.RALEWAY_MEDIUM,
        color: "#A0A0A0",
        fontSize: 12,
        paddingVertical: HP(15),
        paddingHorizontal: HP(40),
        width: "100%",
        height: VP(50),
        borderRadius: 10,
        backgroundColor: COLORS.WHITE,
        shadowColor: "#171717",
        shadowOffset: {
            width: -2,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 20,
    },
    inputIconLeft: {
        width: FS(16.67),
        height: VP(16.67),
        position: 'absolute',
        left: HP(10),
        margin: HP(5)
    },
    inputIconRight: {
        width: FS(22),
        height: VP(22),
        position: 'absolute',
        right: HP(10),
        margin: HP(5),
        borderLeftWidth: 1,
        borderLeftColor: "#666",
    },
    iconRight: {
        width: FS(16.67),
        height: VP(15),
        resizeMode: 'contain'
    },
    iconContainer: {
        backgroundColor: COLORS.HOME_ICONS,
        width: FS(36), // Set width and height to make it square
        height: FS(36), // Matches width to make a square
        borderRadius: HP(6), // Adjust this to make rounded corners
        alignItems: 'center',
        justifyContent: 'center', // Centers the image inside the container
    }
});
