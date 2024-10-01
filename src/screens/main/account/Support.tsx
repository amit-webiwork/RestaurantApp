import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';

import Icon, { Icons } from '../../../components/Icons';
import { COLORS } from '../../../utils/Constants';
import { FS, HP, VP } from '../../../utils/Responsive';
import { TextStyles } from '../../../utils/TextStyles';
import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { globalStyle } from '../../../utils/GlobalStyle';

const { width, height } = Dimensions.get('window');


function Support({ navigation }: { navigation: any }): React.JSX.Element {

    return (
        <OuterLayout containerStyle={globalStyle.containerStyle}>
            <InnerBlock>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingHorizontal: HP(20), paddingVertical: HP(27.79) }}>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{ alignSelf: "center", marginTop: VP(10) }}
                            >
                                <Icon type={Icons.Feather} size={18} name={`chevron-left`} color={COLORS.BLACK} />
                            </TouchableOpacity>
                            <Text style={styles.topHeading}>support / help</Text>
                        </View>

                        <View style={{ marginTop: VP(69) }}>
                            <View style={{ width: FS(293.23), height: VP(128.23), paddingHorizontal: HP(38) }}>
                                <Image source={require(`../../../assets/images/support.png`)} style={styles.img} />
                            </View>

                            <View style={{ marginTop: VP(40.77), gap: 16, }}>
                                <Text style={styles.heading}>how can we help?</Text>
                                <Text style={styles.info}>welcome to our app support. ask anything. support community can help you find answers to all your queries.</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", marginTop: VP(49), gap: 13.11, justifyContent: "center" }}>
                            <View style={styles.mainBox}>
                                <View style={styles.box}>
                                    <Image source={require(`../../../assets/icons/phone.png`)} style={styles.boxImg1} />
                                </View>

                                <Text style={styles.label}>call us</Text>
                                <Text style={styles.subLabel}>+61390880378</Text>
                            </View>

                            <View style={styles.mainBox}>
                                <View style={styles.box}>
                                    <Image source={require(`../../../assets/icons/mail.png`)} style={styles.boxImg2} />
                                </View>

                                <Text style={styles.label}>mail us</Text>
                                <Text style={styles.subLabel}>delounge22@gmail.com</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </InnerBlock>
        </OuterLayout>
    )
}

const styles = StyleSheet.create({
    label: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 16,
        lineHeight: 22.4,
        color: "#595959",
        textTransform: "capitalize",
    },
    subLabel: {
        ...TextStyles.LATO_REGULAR,
        lineHeight: 22.4,
        textAlign: "center"
    },
    topHeading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: "#101010",
        fontSize: 18,
        textTransform: "capitalize",
        textAlign: "center",
        flex: 1,
        lineHeight: 28.8
    },
    heading: {
        ...TextStyles.RALEWAY_BOLD,
        color: COLORS.BUTTON,
        fontSize: 24,
        textTransform: "capitalize",
        textAlign: "center"
    },
    info: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: "#7C7C7C",
        fontSize: 16,
        lineHeight: 24,
        textAlign: "center",
        textTransform: "capitalize",
    },
    img: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    boxImg1: {
        width: FS(24.2),
        height: VP(24.2),
        resizeMode: "contain"
    },
    boxImg2: {
        width: FS(24.4),
        height: VP(24.4),
        resizeMode: "contain"
    },
    box: {
        backgroundColor: "#FFD6FA",
        width: FS(51),
        height: VP(51),
        borderRadius: HP(51) / 2,
        alignItems: "center",
        justifyContent: "center",
        marginTop: VP(12)
    },
    mainBox: {
        borderRadius: HP(7.55),
        borderColor: "#C0C0C0",
        flexBasis: "49%",
        alignItems: "center",
        gap: 12,
        padding: HP(10),
        shadowOpacity: 0.2,
        shadowColor: "#000",
        shadowOffset: {
            width: -2,
            height: 4,
        },
        shadowRadius: 1,
        elevation: 2
    }
});

export default Support;