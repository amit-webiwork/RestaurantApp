import React, { memo } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';

import { globalStyle } from '../../utils/GlobalStyle';

interface Props {
    navigation: any;
}

const FilterBoxSection: React.FunctionComponent<Props> = ({ navigation }) => {

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate(`FilterScreen`)}
            style={globalStyle.filterIconContainer}
        >
            <Image source={require(`../../assets/icons/filter.png`)} style={[globalStyle.filterIconRight]} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
});

const FilterBoxSectionSection = memo(FilterBoxSection);
export default FilterBoxSectionSection;