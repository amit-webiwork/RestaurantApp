import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { FS, HP, VP } from '../../../utils/Responsive';
import Icon, { Icons } from '../../../components/Icons';
import { TextStyles } from '../../../utils/TextStyles';
import { COLORS } from '../../../utils/Constants';

function PaymentScreen({ navigation }: { navigation: any }): React.JSX.Element {

    return (
        <OuterLayout containerStyle={{ backgroundColor: "#FFF9F9" }}>
            <InnerBlock>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingVertical: HP(20) }}>
                        {/* Navigation section */}
                        <View style={{ paddingHorizontal: HP(16) }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                >
                                    <Icon type={Icons.Feather} size={FS(24)} name={`chevron-left`} color={`#6C6C70`} />
                                </TouchableOpacity>
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", gap: HP(5) }}>
                                    <Text style={styles.topHeading1}>bill total:</Text>
                                    <Text style={styles.topHeading2}>$25.00</Text>
                                </View>
                            </View>
                        </View>

                        {/* Body section */}
                        <View style={{ marginTop: VP(36), paddingHorizontal: HP(30) }}>

                            <View>
                                <View style={{ borderRadius: HP(17.97) }}></View>
                            </View>

                            {/* Add new card section */}
                            <View style={{ marginTop: VP(20) }}>
                                <View style={{ borderRadius: HP(7), borderWidth: 1, borderColor: "#C0C0C0", justifyContent: "space-between", flexDirection: "row", paddingHorizontal: HP(14), paddingVertical: HP(18) }}>
                                    <Text style={styles.boxText}>credit or debit card</Text>
                                    <TouchableOpacity
                                        onPress={() => void (0)}
                                        style={{}}
                                    >
                                        <Text style={styles.buttonText}>add</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </InnerBlock>
        </OuterLayout>
    )
}

const styles = StyleSheet.create({
    topHeading1: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        fontSize: 18,
        textTransform: "capitalize",
        top: VP(-2),
        textAlign: "center"
    },
    topHeading2: {
        ...TextStyles.RALEWAY_MEDIUM,
        fontSize: 18,
        top: VP(-2),
        textAlign: "center"
    },
    boxText: {
        ...TextStyles.RALEWAY_REGULAR,
        fontSize: 14,
        textTransform: "capitalize"
    },
    buttonText: {
        ...TextStyles.RALEWAY_MEDIUM,
        color: COLORS.BUTTON,
        fontSize: 14,
        textTransform: "uppercase"
    },
});

export default PaymentScreen;