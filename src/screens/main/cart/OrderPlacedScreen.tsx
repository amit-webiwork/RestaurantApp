import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';

import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { globalStyle } from '../../../utils/GlobalStyle';
import { FS, HP, VP } from '../../../utils/Responsive';
import Icon, { Icons } from '../../../components/Icons';
import { TextStyles } from '../../../utils/TextStyles';
import { COLORS } from '../../../utils/Constants';
import CheckmarkWithConfetti from '../../../components/CheckmarkWithConfetti';
import { AppDispatch } from '../../../redux/store';
import { resetCart } from '../../../redux/features/cart';

function OrderPlacedScreen({ navigation }: { navigation: any }): React.JSX.Element {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(resetCart());
    }, [])

    return (
        <OuterLayout containerStyle={globalStyle.containerStyle}>
            <InnerBlock>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingVertical: HP(20), marginBottom: VP(87) }}>
                        {/* Navigation section */}
                        <View style={{ paddingHorizontal: HP(21) }}>
                            {/* Top Navigation */}
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate(`HomeScreen`)}
                                    style={{ alignSelf: "center" }}
                                >
                                    <Icon type={Icons.Feather} size={FS(18)} name={`chevron-left`} color={COLORS.BLACK} />
                                </TouchableOpacity>
                                <Text style={styles.topHeading}>order tracking</Text>
                            </View>
                            <Text style={styles.orderNo}>#8565565646</Text>

                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <View style={styles.popUpImg}>
                                    <CheckmarkWithConfetti />
                                </View>

                                <Text style={styles.heading}>order placed</Text>
                                <Text style={styles.text1}>your order is placed sucessfully</Text>
                                <Text style={[styles.text1, { marginTop: VP(50) }]}>estimated time: 1/2 hour</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <TouchableOpacity
                    onPress={() => navigation.navigate(`HomeScreen`)}
                    style={{ alignSelf: "center", padding: HP(10) }}
                >
                    <Text style={[styles.heading, { fontSize: 20 }]}>order details</Text>
                </TouchableOpacity>
            </InnerBlock>
        </OuterLayout >
    )
}

const styles = StyleSheet.create({
    popUpImg: {
        marginTop: VP(55)
    },
    topHeading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: "#000000",
        fontSize: 18,
        textTransform: "capitalize",
        textAlign: "center",
        flex: 1,
    },
    heading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 20,
        textTransform: "uppercase",
        marginTop: VP(34.07)
    },
    text1: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 14,
        textTransform: "capitalize",
        color: "#8C8C8C",
        marginTop: VP(12)
    },
    orderNo: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 14,
        textAlign: "center",
        lineHeight: 29.3
    },
});

export default OrderPlacedScreen;