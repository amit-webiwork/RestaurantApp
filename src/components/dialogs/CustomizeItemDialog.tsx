import React, { memo, useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, ImageBackground } from 'react-native';

import { TextStyles } from '../../utils/TextStyles';
import { FS, HP, VP } from '../../utils/Responsive';
import { CDN_URL, COLORS } from '../../utils/Constants';
import Icon, { Icons } from '../Icons';
import CustomizeItemSection from '../product-sections/CustomizeItem';
import { useCustomizeItem } from '../../utils/customHooks/useCustomizeItem';
import CustomizeItemDialogLoader from '../skeleton/CustomizeItemDialogLoader';
import { getItemDetails } from '../../utils/ApiCall';
import { useItemSizes } from '../../utils/customHooks/useItemSizes';

interface Props {
    visible: boolean;
    slideAnim: Animated.Value;
    itemId: number;
    closeHandler: () => void;
    render: number;
}

const { width, height } = Dimensions.get('window');

const CustomizeItemDialog = ({ visible, slideAnim, itemId, closeHandler, render }: Props) => {

    const [loading, setLoading] = useState(false);
    const [itemData, setItemData] = useState<any>({});
    const [itemCall, setItemCall] = useState(false);

    const fetchItem = async (itemId: number) => {
        setLoading(true);

        try {
            const response = await getItemDetails(itemId);
            setItemData(response);
        } catch (err) {
            setItemCall(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (itemId && itemCall)
            fetchItem(itemId);
    }, [itemId, itemCall])

    useEffect(() => {
        if (visible)
            setItemCall(true);
    }, [visible])

    const { activeTab, textWidths, customizeTabs, switchTab, handleTextLayout, clickOptionHandler } = useCustomizeItem(itemData, render);

    const { sizeTab, switchTab: sizeSwitchTab, clickSizeHandler } = useItemSizes(itemData, render);

    return (
        <Modal
            transparent
            visible={visible}
            animationType="none"
            onRequestClose={closeHandler}
        >
            {/* Background overlay */}
            <TouchableOpacity style={styles.overlay} onPress={closeHandler} />

            {/* Close Icon */}
            <TouchableOpacity
                style={[styles.closeIcon, { transform: [{ translateY: slideAnim }] }]}
                onPress={closeHandler}
            >
                <Icon
                    type={Icons.Feather}
                    size={FS(20)}
                    name="x"
                    color={COLORS.WHITE}
                />
            </TouchableOpacity>

            {/* Scrollable Animated container */}
            <Animated.ScrollView
                contentContainerStyle={styles.scrollContent}
                style={[styles.drawerContainer, { transform: [{ translateY: slideAnim }] }]}
            >
                {loading ? (
                    <CustomizeItemDialogLoader />
                ) : (
                    <>
                        <ImageBackground
                            source={{ uri: `${CDN_URL}${itemData?.imgUrl}` }}
                            imageStyle={styles.imageStyle}
                            style={styles.bg}
                        />
                        <View style={styles.contentBox}>
                            <Text style={styles.boxTitle}>{itemData?.name}</Text>

                            {/* Customize item section */}
                            <View style={{ marginTop: VP(20) }}>
                                <CustomizeItemSection
                                    activeTabProp={activeTab}
                                    textWidthsProp={textWidths}
                                    customizeTabs={customizeTabs}
                                    switchTabHandler={switchTab}
                                    handleTextLayoutHandler={handleTextLayout}
                                    clickOptionHandlerProp={clickOptionHandler}
                                    sizeTab={sizeTab}
                                    sizeSwitchTab={sizeSwitchTab}
                                    clickSizeHandler={clickSizeHandler}
                                />
                            </View>
                        </View>
                    </>
                )}
            </Animated.ScrollView>
        </Modal>
    );
};

// Styles for the dialog box
const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: VP(50)
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    drawerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: height * .8,
        backgroundColor: COLORS.WHITE,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingHorizontal: HP(15),
        paddingVertical: HP(15)
    },
    bg: {
        width: "100%",
        height: VP(220),
        resizeMode: "contain"
    },
    boxTitle: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 20,
        textTransform: "capitalize",
        marginTop: VP(10)
    },
    contentBox: {
        paddingHorizontal: HP(12.46),
        paddingVertical: HP(8.04)
    },
    closeIcon: {
        position: 'absolute',
        top: height * .12,
        zIndex: 1,
        alignSelf: 'center',
        height: FS(40),
        width: FS(40),
        backgroundColor: "#00000080",
        borderRadius: FS(40 / 2),
        justifyContent: "center",
        alignItems: "center"
    },
    imageStyle: {
        borderRadius: 15
    }
});

const CustomizeItemDialogComp = memo(CustomizeItemDialog);
export default CustomizeItemDialogComp;