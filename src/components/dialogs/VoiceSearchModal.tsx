import React, { useState, useRef, useEffect, memo } from 'react';
import { Modal, View, Text, StyleSheet, Animated, Easing, TouchableOpacity, Image } from 'react-native';
import LoadingDots from 'react-native-loading-dots';

import Icon, { Icons } from '../Icons';
import { COLORS } from '../../utils/Constants';
import { FS, HP, VP } from '../../utils/Responsive';
import { TextStyles } from '../../utils/TextStyles';
import LinearGradient from 'react-native-linear-gradient';

const VoiceSearchModal = ({ visible, onClose }: { visible: boolean; onClose: any; }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    // Animation for the soundwave effect
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.2,
                    duration: 500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, [scaleAnim, visible]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <LinearGradient
                    colors={['#DF12CA', '#8027C9']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.content}
                >
                    <TouchableOpacity
                        onPress={onClose}
                        style={{
                            width: FS(28),
                            height: FS(28),
                            borderWidth: 1,
                            borderRadius: FS(14),
                            justifyContent: "center",
                            alignItems: "center",
                            borderColor: COLORS.WHITE,
                            position: "absolute",
                            right: FS(15),
                            top: VP(15)
                        }}
                    >
                        <Icon
                            type={Icons.Feather}
                            size={20}
                            name={'x'}
                            color={COLORS.WHITE} />
                    </TouchableOpacity>

                    <Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleAnim }] }]}>
                        <Icon type={Icons.FontAwesome5} size={FS(40)} name={`microphone`} color={COLORS.WHITE} />
                    </Animated.View>
                    <Text style={styles.listeningText}>Listening
                        <LoadingDots size={5} bounceHeight={2} colors={["#36e7f4", "#f43688", "#ff758c", "#cac531"]} dots={4} />
                    </Text>
                    <Image
                        source={require(`../../assets/images/waves.png`)}
                        style={[styles.img]} />

                </LinearGradient>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
        justifyContent: "center",
        alignItems: "center",
        width: '90%',
        height: '40%',
        padding: HP(20),
        backgroundColor: '#D682F9',
        borderRadius: HP(14.47)
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: FS(100),
        height: FS(100),
        borderRadius: FS(50),
        backgroundColor: '#6A29C9',
        marginTop: VP(20)
    },
    listeningText: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 20,
        color: '#fff',
        marginTop: VP(15.51)
    },
    img: {
        width: FS(274),
        height: VP(51.1),
        marginTop: VP(17)
    }
});

const VoiceSearchModalComp = memo(VoiceSearchModal);
export default VoiceSearchModalComp;