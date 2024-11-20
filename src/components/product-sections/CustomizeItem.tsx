import React, { memo, useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    LayoutChangeEvent,
    Image
} from 'react-native';

import { FS, HP, VP } from '../../utils/Responsive';
import { COLORS } from '../../utils/Constants';
import { TextStyles } from '../../utils/TextStyles';
import Icon, { Icons } from '../Icons';

interface Props {
    activeTabProp: number;
    textWidthsProp: any;
    customizeTabs: any[];
    switchTabHandler: (arg: number) => void;
    handleTextLayoutHandler: (arg1: LayoutChangeEvent, arg2: number) => void;
    clickOptionHandlerProp: (arg: number) => void;
}

const CustomizeItem: React.FunctionComponent<Props> = ({ activeTabProp, textWidthsProp, customizeTabs, switchTabHandler, handleTextLayoutHandler, clickOptionHandlerProp }) => {

    const [activeTab, setActiveTab] = useState(1);
    const [textWidths, setTextWidths] = useState<any>({});

    const switchTab = (tab: number) => {
        switchTabHandler(tab);
    }

    const handleTextLayout = (event: LayoutChangeEvent, index: number) => {
        handleTextLayoutHandler(event, index);
    }

    const clickOptionHandler = (optionIndex: number) => {
        clickOptionHandlerProp(optionIndex);
    }

    useEffect(() => {
        setActiveTab(activeTabProp);
    }, [activeTabProp])

    useEffect(() => {
        setTextWidths(textWidthsProp);
    }, [textWidthsProp])

    return (
        <View>
            <Text style={styles.customizeHeading}>customize items</Text>

            {/* Tabs section */}
            <View style={styles.tabTitleSection}>

                {customizeTabs.map((d: any, i: number) => (
                    <TouchableOpacity
                        onPress={() => switchTab((i + 1))}
                        key={`tab-${i}`}
                    >
                        <Text
                            style={styles.menuText}
                            onLayout={(event) => handleTextLayout(event, i)}
                        >
                            {d?.customizeOption?.name || ``}
                        </Text>
                        {activeTab === (i + 1) && (
                            <Image
                                source={require('../../assets/images/active.png')}
                                style={[styles.activeLine, { width: (textWidths[i] || 0) }]}
                            />
                        )}
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.lineTab}></View>

            {/* Tab options section */}
            {customizeTabs[(activeTab - 1)]?.variantAttributes && (
                <View style={{ marginTop: VP(6) }}>
                    {customizeTabs[(activeTab - 1)].variantAttributes.map((d: any, i: number) => (
                        <View key={`tab-options-${i}`} style={styles.tabMain}>
                            <View style={styles.tabSub}>

                                <View style={styles.tabLeft}>
                                    {/* {d?.image ? (
                                        <Image source={d?.image} style={styles.optionImg} />
                                    ) : <></>} */}

                                    <Text style={styles.customizeOptionText}>{d?.customizeAttribute?.name || ``}</Text>
                                </View>


                                <View style={styles.tabRight}>
                                    <Text style={styles.optionPrice}>
                                        {(d?.price && +d?.price > 0) ? `+$${d.price}` : ""}
                                    </Text>

                                    <TouchableOpacity
                                        onPress={() => clickOptionHandler(i)}
                                    >
                                        <View style={[styles.checkbox, !customizeTabs[(activeTab - 1)]?.isMultiple && styles.radiobox]}>
                                            {(d?.checked && d.checked === true) && (
                                                <View
                                                    style={[styles.checkedBox, !customizeTabs[(activeTab - 1)]?.isMultiple && styles.radiobox]}
                                                >
                                                    <Icon type={Icons.Feather} size={FS(12)} name={`check`} color={COLORS.WHITE} />
                                                </View>
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.lineTab}></View>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    customizeHeading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 20,
        textTransform: 'capitalize',
        color: "#5D5959"
    },
    menuText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 14.56,
        textTransform: "capitalize",
        padding: HP(8)
    },
    lineTab: {
        height: 2,
        flex: 1,
        flexGrow: 1,
        backgroundColor: "#E6E6E6"
    },
    tabMain: {
        gap: HP(8),
        marginTop: VP(6)
    },
    tabSub: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    tabLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: HP(10.37),
        padding: HP(8)
    },
    tabRight: {
        flexDirection: "row",
        alignItems: "center",
        gap: HP(10.02)
    },
    customizeOptionText: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 14.56,
        textTransform: "capitalize"
    },
    optionPrice: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 12,
        color: "#383838"
    },
    checkbox: {
        width: FS(15.11),
        height: FS(15.11),
        borderWidth: 1,
        borderColor: '#FFAFF6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: HP(6.11)
    },
    checkedBox: {
        width: FS(15.11),
        height: FS(15.11),
        backgroundColor: COLORS.BUTTON,
        justifyContent: "center",
        alignItems: "center"
    },
    radiobox: {
        borderRadius: FS(15.11 / 2)
    },
    optionImg: {
        resizeMode: "contain",
        width: FS(19),
        height: VP(19)
    },
    activeLine: {
        height: VP(4),
        resizeMode: "stretch",
        marginTop: VP(8.9)
    },
    tabTitleSection: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: VP(14.48)
    }
});

const CustomizeItemSection = memo(CustomizeItem);
export default CustomizeItemSection;