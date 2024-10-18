import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';

import OuterLayout from '../../../components/OuterLayout';
import InnerBlock from '../../../components/InnerBlock';
import { FS, HP, VP } from '../../../utils/Responsive';
import Icon, { Icons } from '../../../components/Icons';
import { TextStyles } from '../../../utils/TextStyles';
import CouponItemSection from '../../../components/coupon/CouponItem';
import { useDispatch, useSelector } from 'react-redux';
import { applyCoupon, couponList, couponLoaded, fetchCoupons, setCouponList } from '../../../redux/features/coupon';
import { AppDispatch } from '../../../redux/store';
import { COLORS } from '../../../utils/Constants';
import { getCouponList } from '../../../utils/ApiCall';
import { getCartTotal } from '../../../redux/features/cart';
import NormalLoader from '../../../components/NormalLoader';

function CouponScreen({ navigation }: { navigation: any }): React.JSX.Element {
    const dispatch: AppDispatch = useDispatch();

    const CouponList = useSelector(couponList);
    const CouponLoaded = useSelector(couponLoaded);
    const GetCartTotal = useSelector(getCartTotal);

    const [coupons, setCoupons] = useState<Array<CouponDetails>>([]);
    const [loading, setLoading] = useState(false);
    const [loader, setLoader] = useState(false);

    const onRefresh = async () => {
        setLoading(true);
        setCoupons([]);

        try {
            const data = await getCouponList();
            dispatch(setCouponList(data));
            setCoupons(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const couponApplyHandler = (couponData: CouponDetails) => {
        setLoader(true);
        dispatch(applyCoupon({ couponId: couponData?.id, couponDiscount: couponData?.calculateApplyDiscount }));

        setTimeout(() => {
            navigation.navigate(`CartScreen`);
        }, 100)
    }

    useEffect(() => {
        if (!CouponLoaded) {
            dispatch(fetchCoupons());
        } else {
            setCoupons(CouponList);
        }
    }, [CouponLoaded])

    return (
        <OuterLayout containerStyle={{ backgroundColor: "#E7E7E7" }}>
            <NormalLoader visible={loader} />
            <InnerBlock>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={onRefresh}
                            tintColor={COLORS.BUTTON}
                        />
                    }
                >
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
                                {coupons?.length > 0 ? (
                                    <>
                                        {(coupons || []).map((d, i) => (
                                            <View key={`coupon-item-${i}`}>
                                                <CouponItemSection data={d} total={GetCartTotal} applyHandler={couponApplyHandler} />
                                            </View>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        {!loading && (
                                            <View style={{ padding: HP(21), borderBottomColor: "#E3E3E3", borderBottomWidth: 1 }}>
                                                <Text style={styles.notFoundText}>"No Coupon Found!"</Text>
                                            </View>
                                        )}
                                    </>
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