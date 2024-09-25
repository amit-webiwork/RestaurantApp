import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image,
    Keyboard
} from 'react-native';

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

                <TouchableOpacity
                    onPress={() => {
                        // Dismiss the keyboard and input focus when mic is pressed
                        Keyboard.dismiss();
                        console.log("Mic icon pressed");
                        // Add your voice search or mic functionality here
                    }}
                    style={{
                        position: 'absolute',
                        right: HP(10),
                        margin: 5,
                        borderLeftWidth: 1,
                        borderLeftColor: "#CCCCCC",
                        zIndex: 2
                    }}
                >
                    <Image source={require(`../../assets/icons/mic.png`)} style={[styles.inputIconRight]} />
                </TouchableOpacity>
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
        marginLeft: HP(5)
    },
    inputIconRight: {
        width: FS(22),
        height: VP(22),
        marginLeft: HP(7.5)
    },
    iconRight: {
        width: FS(16.67),
        height: VP(15),
        resizeMode: 'contain'
    },
    iconContainer: {
        backgroundColor: COLORS.HOME_ICONS,
        width: FS(36),
        height: FS(36),
        borderRadius: HP(6),
        alignItems: 'center',
        justifyContent: 'center'
    }
});
