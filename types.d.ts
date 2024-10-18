interface CartItemDetails {
    imgUrl: string;
    name: string;
    itemId: number;
    price: string;
    qty: number;
    finalPrice: number;
    isAvailable?: boolean;
    discountPrice: number;
    itemPrice: number;
    discountPercent: number;
}

interface ItemDetails {
    imgUrl: string;
    name: string;
    id: number;
    price: string;
    discount_price: string;
    finalPrice: number;
    discountPrice: number;
    itemPrice: number;
    discountPercent: number;
    totalDiscounted: number;
    is_available: boolean;
    category: {
        name: string;
    };
    isAvailable?: boolean;
    qty?: number;
    itemId?: number;
}

interface CouponDetails {
    id: number;
    couponCode: string;
    description: string;
    discountType: 'fixed' | 'percent';
    discountValue: string;
    startDate: string;
    endDate: string;
    minOrderAmount: number;
    maxAppliedAmount: number;
    couponBottomInfo?: string;
    couponTopInfo?: string;
    moreRequireForApply?: number;
    calculateApplyDiscount?: number;
}