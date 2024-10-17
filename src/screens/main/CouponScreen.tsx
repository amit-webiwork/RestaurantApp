import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

import OuterLayout from '../../components/OuterLayout';
import InnerBlock from '../../components/InnerBlock';
import { FS, HP, VP } from '../../utils/Responsive';
import Icon, { Icons } from '../../components/Icons';
import { TextStyles } from '../../utils/TextStyles';
import CouponItemSection from '../../components/coupon/CouponItem';

const data = [
    {
        text1: "flat off",
        text2: "axis120",
        text3: "add $260 more to avail this offer",
        text4: "get flat &120 discount using axis bank MY ZONE credit cards",
        text5: "flat $120 discount on orders above $700"
    },
    {
        text1: "flat off",
        text2: "axis120",
        text3: "add $260 more to avail this offer",
        text4: "get flat &120 discount using axis bank MY ZONE credit cards",
        text5: "flat $120 discount on orders above $700"
    },
    {
        text1: "flat off",
        text2: "axis120",
        text3: "add $260 more to avail this offer",
        text4: "get flat &120 discount using axis bank MY ZONE credit cards",
        text5: "flat $120 discount on orders above $700"
    }
]

function CouponScreen({ navigation }: { navigation: any }): React.JSX.Element {

    return (
        <OuterLayout containerStyle={{ backgroundColor: "#E7E7E7" }}>
            <InnerBlock>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingVertical: HP(20) }}>
                        {/* Navigation section */}
                        <View style={{ paddingHorizontal: HP(16) }}>
                            <View style={{ flexDirection: "row", gap: HP(12.72) }}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                >
                                    <Icon type={Icons.Feather} size={FS(24)} name={`chevron-left`} color={`#6C6C70`} />
                                </TouchableOpacity>
                                <Text style={styles.topHeading}>apply coupon</Text>
                            </View>
                        </View>

                        {/* Body section */}
                        <View style={{}}>
                            {/* First section including cart, add more item, coocking request */}
                            <View style={{ marginTop: VP(39), marginHorizontal: HP(20), gap: HP(28) }}>
                                {data.length > 0 ? (
                                    <>
                                        {(data || []).map((d, i) => (
                                            <View key={`coupon-item-${i}`}>
                                                <CouponItemSection data={d} />
                                            </View>
                                        ))}
                                    </>
                                ) : (
                                    <View style={{ padding: HP(21), borderBottomColor: "#E3E3E3", borderBottomWidth: 1 }}>
                                        <Text style={styles.notFoundText}>"No coupon found!"</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </InnerBlock>
        </OuterLayout>
    )
}

const styles = StyleSheet.create({
    topHeading: {
        ...TextStyles.RALEWAY_SEMI_BOLD,
        color: "#000000",
        fontSize: 18,
        textTransform: "capitalize",
        top: VP(-2)
    },
    notFoundText: {
        ...TextStyles.POPPINS_BOLD,
        fontSize: HP(18),
        color: "#898989",
        lineHeight: HP(47),
        textAlign: "center"
    }
});

export default CouponScreen;