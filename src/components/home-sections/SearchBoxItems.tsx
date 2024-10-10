import React, { memo, useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image,
    Keyboard,
    StyleProp,
    ViewStyle,
    Pressable
} from 'react-native';

import { FS, HP, VP } from '../../utils/Responsive';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';

interface Props {
    inputContainerStyle?: StyleProp<ViewStyle>;
    navigation: any;
}

const SearchBoxItems: React.FunctionComponent<Props> = ({ inputContainerStyle, navigation }) => {
    const [text, setText] = useState<any>("");
    const [error, setError] = useState({ status: false, text: "" });

    const setTextHandler = (e: any) => {
        setText(e);
    }

    const openSearchScreen = () => {
        Keyboard.dismiss()
        navigation.navigate('SearchScreen');
    };

    return (
        <View style={styles.mainContainer}>
            <View style={[styles.inputContainer, inputContainerStyle]}>
                <Pressable onPress={openSearchScreen} style={{ width: "100%" }}>
                    <TextInput
                        style={[styles.input, { borderBottomColor: error.status ? COLORS.RED : "#A0A0A0" }]}
                        value={text}
                        onChangeText={setTextHandler}
                        placeholder="Search like bubble tea"
                        placeholderTextColor={`#A0A0A0`}
                        editable={false}
                    />
                </Pressable>
                <Image source={require(`../../assets/icons/search.png`)} style={[styles.inputIconLeft]} />

                <TouchableOpacity
                    onPress={() => {
                        Keyboard.dismiss();
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
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    inputContainer: {
        justifyContent: 'center',
        alignContent: "center",
        alignItems: "center",
        zIndex: 2
    },
    input: {
        ...TextStyles.RALEWAY_MEDIUM,
        color: "#A0A0A0",
        fontSize: 12,
        paddingVertical: HP(15),
        paddingHorizontal: HP(40),
        width: "100%",
        height: VP(50),
        borderRadius: HP(10),
        backgroundColor: COLORS.WHITE,
        shadowColor: "#171717",
        shadowOffset: {
            width: -2,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 20
    },
    inputIconLeft: {
        width: FS(16.67),
        height: FS(16.67),
        position: 'absolute',
        left: HP(10),
        marginLeft: HP(5)
    },
    inputIconRight: {
        width: FS(22),
        height: VP(22),
        marginLeft: HP(7.5)
    }
});

const SearchBoxItemsSection = memo(SearchBoxItems);
export default SearchBoxItemsSection;