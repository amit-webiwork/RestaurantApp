import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../store';
import { getCouponList } from '../../utils/ApiCall';

interface CouponState {
    list: Array<CouponDetails>;
    loaded: boolean;
    appliedCoupon: number;
    couponDiscount: number;
}

const initialState: CouponState = {
    list: [],
    loaded: false,
    appliedCoupon: 0,
    couponDiscount: 0
}

export const couponSlice = createSlice({
    name: 'coupon',
    initialState: initialState,
    reducers: {
        setCouponList: (state, action) => {
            state.list = action?.payload || []
            state.loaded = true
        },
        applyCoupon: (state, action) => {
            state.appliedCoupon = action.payload.couponId
            state.couponDiscount = action.payload.couponDiscount
        },
    },
})

export const fetchCoupons = () => async (dispatch: AppDispatch) => {
    try {
        const data = await getCouponList();
        dispatch(setCouponList(data));
    } catch (err) {
        console.log(err);
    }
};

export const { setCouponList, applyCoupon } = couponSlice.actions

export const couponList = (state: { coupon: CouponState }) => state.coupon.list;
export const couponLoaded = (state: { coupon: CouponState }) => state.coupon.loaded;
export const appliedCouponId = (state: { coupon: CouponState }) => state.coupon.appliedCoupon;
export const couponDiscount = (state: { coupon: CouponState }) => state.coupon.couponDiscount;

export default couponSlice.reducer;
