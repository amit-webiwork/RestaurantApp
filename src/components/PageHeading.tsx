import React, { memo } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

import { TextStyles } from '../utils/TextStyles';
import { FS, HP } from '../utils/Responsive';
import { globalStyle } from '../utils/GlobalStyle';
import Icon, { Icons } from './Icons';
import { COLORS } from '../utils/Constants';

interface Props {
    title: string;
    navigation: any;
}

const PageHeading: React.FunctionComponent<Props> = ({ title, navigation }) => {
    return (
        <View style={styles.main}>
            <View style={styles.sub}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={globalStyle.navigationIconBox}
                >
                    <Icon
                        type={Icons.Feather}
                        size={FS(18)}
                        name={`chevron-left`}
                        color={COLORS.BLACK}
                    />
                </TouchableOpacity>
                <Text style={styles.topHeading}>{title}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        paddingHorizontal: HP(18),
        paddingBottom: HP(20)
    },
    sub: {
        flexDirection: "row",
        alignItems: "center"
    },
    topHeading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: COLORS.BLACK,
        fontSize: 18,
        textTransform: "capitalize",
        textAlign: "center",
        flex: 1
    },
});

const PageHeadingSection = memo(PageHeading);
export default PageHeadingSection;