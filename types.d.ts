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
    options: any[];
    size?: any[];
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
    options?: any[];
    variants?: any[];
    size?: any[];
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

interface User {
    name: string;
    phoneNo: string;
    profileImg: string;
}

interface ErrorObject {
    status: boolean;
    text: string;
}

interface FormProps {
    text: string;
    setText: (text: string) => void;
    error: ErrorObject
}

interface OTPFormProps {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>
    error: ErrorObject
}

interface FeedbackTopics {
    id: number;
    text: string;
}

interface Photo {
    fileName: string;
    type: string;
    uri: string;
    originalPath: string;
    height: number;
    width: number;
    fileSize: number;
}