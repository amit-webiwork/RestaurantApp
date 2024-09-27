import React from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, ScrollView, Dimensions, TextInput, Animated } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

import { FS, HP, VP } from '../../utils/Responsive.ts';
import { COLORS } from '../../utils/Constants.ts';
import { TextStyles } from '../../utils/TextStyles.ts';
import Icon, { Icons } from '../../components/Icons';

const { width, height } = Dimensions.get('window');

function FilterScreen({ navigation }: { navigation: any; }): React.JSX.Element {
    const handleGestureEvent = (event) => {
        // Handle vertical gesture, track movement
    };

    const handleStateChange = (event: { nativeEvent: { translationY: number; }; }) => {
        // console.log(event.nativeEvent.translationY, '---translationY')
        if (event.nativeEvent.translationY > 100) {
            navigation.goBack();  // Close the modal if the swipe is significant
        }
    };

    return (
        <GestureHandlerRootView >
            <PanGestureHandler
                onGestureEvent={handleGestureEvent} // Add a gesture handler to capture swipes
                onHandlerStateChange={handleStateChange}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.main}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.top}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    style={{}}
                                >
                                    <Icon type={Icons.Feather} size={18} name="chevron-left" color={COLORS.BLACK} />
                                </TouchableOpacity>

                                <Text style={styles.headingText}>filters</Text>

                                <TouchableOpacity onPress={() => navigation.goBack()} style={{}}>
                                    <Text style={[styles.headingText, { fontSize: 14 }]}>done</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',  // Aligns to the bottom
        backgroundColor: 'rgba(0,0,0,0.2)',  // Semi-transparent background
    },
    main: {
        height: '80%',  // 70% of the screen height
        width: '100%',  // Full width
        backgroundColor: '#FFF9F9',
        borderTopLeftRadius: HP(30),
        borderTopRightRadius: HP(30),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 4,
        paddingHorizontal: 16,
        // top: "20%"
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 28,
    },
    headingText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        textTransform: 'capitalize',
        textAlign: 'center',
    },
});

export default FilterScreen;