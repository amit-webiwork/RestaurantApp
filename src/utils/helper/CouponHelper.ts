import store from '../../redux/store';

import { applyCoupon } from "../../redux/features/coupon";
import { AppDispatch } from "../../redux/store";

export const getCouponComponents = (data: CouponDetails, orderAmount: number) => {
    const couponData = { ...data }
    const { discountType, discountValue, minOrderAmount, maxAppliedAmount } = couponData;

    const discountValueNumber = +discountValue || 0;

    couponData['couponTopInfo'] = '';

    const moreRequireForApply = minOrderAmount > orderAmount ? minOrderAmount - orderAmount : 0;


    couponData['moreRequireForApply'] = moreRequireForApply;

    couponData['couponTopInfo'] = moreRequireForApply > 0 ? `Add $${moreRequireForApply} More To Avail This Offer` : `Click On Apply For Use`;

    const valueWithPrefix = discountType === 'fixed' ? `$${discountValueNumber}` : `${discountValueNumber}%`

    const endText = minOrderAmount > 0 ? `On Orders Above $${minOrderAmount}` : `On All Orders`;

    const cappingText = maxAppliedAmount > 0 ? `, Up To $${maxAppliedAmount}` : ``;

    couponData['couponBottomInfo'] = `Flat ${valueWithPrefix} Discount ${endText} ${cappingText}`;

    //---------------------------Calculation Part-----------------------------------

    const totalDiscounted = discountType === 'fixed' ? discountValueNumber : (orderAmount * (discountValueNumber / 100));

    const calculateApplyDiscount = maxAppliedAmount > 0 ? (totalDiscounted > maxAppliedAmount ? maxAppliedAmount : totalDiscounted) : totalDiscounted;

    couponData['calculateApplyDiscount'] = minOrderAmount <= orderAmount ? (+(calculateApplyDiscount > orderAmount ? orderAmount : calculateApplyDiscount).toFixed(2)) : 0;

    return couponData;
}

export const couponCalculationHandler = (cartTotal: number, setLoader: any, dispatch: AppDispatch) => {
    setLoader(true);
    const state = store.getState();
    const appliedCoupon = state.coupon.appliedCoupon;
    const couponList = state.coupon.list;

    // get coupon data from couponId
    const data: any = couponList.find((d: { id: number; }) => d.id === appliedCoupon);

    const couponData = getCouponComponents(data, cartTotal);

    dispatch(applyCoupon({ couponId: couponData.moreRequireForApply === 0 ? couponData?.id || 0 : 0, couponDiscount: couponData?.calculateApplyDiscount }));

    setTimeout(() => {
        setLoader(false);
    }, 100)
}