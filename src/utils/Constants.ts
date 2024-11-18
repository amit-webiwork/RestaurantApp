export const COLORS = {
    BACKGROUND: '#FFFFFF',
    TEXT: '#7B6F72',
    WHITE: '#FFFFFF',
    RED: '#FF007D',
    PLACEHOLDER_COLOR: '#ADA4A5',
    BLACK: '#000000',
    THEME: "#DD21CD",
    BUTTON: '#FF00E2',
    HOME_ICONS: "#D3219B",
    ICON_DEFAULT: "#CBCBCB",
    BACKGROUND_DEFAULT: "#F8F8F8",
    SUCCESS: "#27AE60",
    FAILED: "#D93A3A",
    NAV_ICON_BG: "#DADADA"
};

export const APP_VERSION = '0.0.4';
export const OTP_SEND_WAIT_TIME = 60; // in seconds

// export const BACKEND_URL = "https://api.deloungecafe.com/api/v1";
// export const BACKEND_URL = "https://2f43-125-99-173-186.ngrok-free.app/api/v1";
export const BACKEND_URL = "http://192.168.0.101:4000/api/v1";
// export const BACKEND_URL = "https://4844-125-99-173-186.ngrok-free.app/api/v1";

export const CDN_URL = "https://cdn.deloungecafe.com/";

// local key
// export const STRIPE_PUBLIC_KEY = "pk_test_51QCxBJHliBFhQl5Sfxyactla0vrLw2IO7t4pUFBwHywPjeap3iBS7sEe7bncI6NBdCoetAhdfIUxWGjuajVkJ6F4004SKA6sQ9";

// server key
export const STRIPE_PUBLIC_KEY = "pk_test_51QEJaCEQOrAyyyQ3QvZhdpdWJ0QfJKOb5YBRLjeQ4PNNxNoveBiPf2AS5tqA3Fih2sauafz3sz9CawNcNYcXpxen00NJBglpsa";

export const apiEndpoints = {
    signup: "/auth/user/sign-up",
    login: "/auth/user/sign-in",
    forgot: "/auth/user/forgot-password",
    otpVerify: "/auth/user/otp-verify",
    resetPassword: "/auth/user/reset-password",
    categoryList: "/user/item-category/list",
    itemList: "/user/item/list",
    updateProfile: "/user/profile",
    profileUpload: "/user/profile-upload",
    changePassword: "/user/change-password",
    deleteAccount: "/user/account",
    topicList: "/user/feedback-topics",
    feedback: "/user/feedback",
    dietaryList: "/user/dietary/list",
    cuisineList: "/user/cuisine/list",
    priceRange: "/user/item/price-range",
    deviceToken: "/user/save-device-token",
    order: "/user/order",
    cartConfirm: "/user/item/cart-confirm",
    orderList: "/user/order",
    orderFeedback: "/user/order/feedback",
    deleteOrder: "/user/order",
    couponList: "/user/coupon",
    createPaymentIntent: "/stripe/create-payment-intent",
    cardList: "/stripe/card-list",
    deleteCard: "/stripe/delete-card",
    orderTrack: "/user/order/track-order",
    orderDetails: "/user/order",
    refundOrders: "/user/order/refund-orders",
    itemDetails: "/user/item"
};

export const errorMessage = {
    commonError: "Failed to process!",
    otp: "Invalid OTP entered.",
    commonMessage: "Something went wrong. Please try again later.",
    notificationAccessError: "Allow notification permission for get incoming message",
    cartUpdate: "Your cart options have been updated! Please review your cart before proceeding."
}