import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { TextStyles } from '../utils/TextStyles';

import Icon, { Icons } from './Icons';
import { COLORS } from '../utils/Constants';

interface Props {
    label: string;
    data: any[];
    onSelect: any;
}

const DropDown = ({ label, data, onSelect }: Props) => {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);

    const toggleDropdown = () => {
        setVisible(!visible);
    };

    const handleSelect = (item: any) => {
        setSelected(item.text);
        onSelect(item);
        setVisible(false);
    };

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
            <Text style={styles.itemText}>{item.text}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>{label}</Text>
                    <Text style={styles.selectedText}>
                        {selected ? selected : 'Select an option'}
                    </Text>
                </View>
                <View>
                    <Icon
                        type={Icons.Feather}
                        size={18}
                        name={visible ? 'chevron-up' : 'chevron-down'}
                        color={COLORS.BLACK} />
                </View>
            </TouchableOpacity>
            {visible && (
                <Modal transparent animationType="fade" visible={visible}>
                    <TouchableOpacity style={styles.overlay} onPress={toggleDropdown}>
                        <View style={styles.dropdownList}>
                            <FlatList
                                data={data}
                                renderItem={renderItem}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    dropdown: {
        padding: 10,
        // borderWidth: 1,
        borderColor: '#C0C0C0',
        borderRadius: 7,
        backgroundColor: '#fff',
        flexDirection: "row",
        alignItems: "center",

        shadowOpacity: 0.2,
        shadowColor: COLORS.BUTTON,
        shadowOffset: {
            width: -2,
            height: 4,
        },
        shadowRadius: 1,
        elevation: 3
    },
    label: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 14,
        color: '#333',
    },
    selectedText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 12,
        color: '#727272',
        marginTop: 5,
        textTransform: "capitalize"
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    dropdownList: {
        width: '80%',
        maxHeight: 300,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 0.4,
        borderBottomColor: '#CACACA',
    },
    itemText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 14,
        color: "#313131",
        textTransform: "capitalize"
    },
});

export default DropDown;