import React, { memo, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput
} from 'react-native';

import { HP } from '../../utils/Responsive';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';

interface Props {
    setHandler: any;
}

const CookingRequest: React.FunctionComponent<Props> = ({ setHandler }) => {
    const [instructionText, setInstructionText] = useState<string>("");
    const [textLength, setTextLength] = useState<number>(100);
    const [errorInstruction, setErrorInstruction] = useState({ status: false, text: "" });

    const setInstructionTextHandler = (e: string) => {
        setInstructionText(e);
        setTextLength(100 - e.length);
        setHandler(e);
    }

    return (
        <View>
            <TextInput
                value={instructionText}
                onChangeText={setInstructionTextHandler}
                placeholder="e.g. Don’t make it too sweet"
                maxLength={100}
                multiline={true}
                numberOfLines={5}
                placeholderTextColor={`#A7A7A7`}
                style={{
                    ...TextStyles.RALEWAY_MEDIUM,
                    fontSize: 11.56,
                    backgroundColor: "#EAEAEA",
                    borderRadius: HP(7.71),
                    textAlignVertical: 'top',
                    padding: 10,
                    borderBottomColor: errorInstruction.status ? COLORS.RED : "transparent"
                }}
            />
            <Text style={{ ...TextStyles.RALEWAY_MEDIUM, fontSize: 11.56, color: "#A7A7A7", position: "absolute", bottom: 10, right: 10 }}>{textLength}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
});

const CookingRequestSection = memo(CookingRequest);
export default CookingRequestSection;