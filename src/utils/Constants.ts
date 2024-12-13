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

export const APP_VERSION = '0.0.3';
export const OTP_SEND_WAIT_TIME = 60; // in seconds
export const STD_CODE = "+61";

export const pinCheck = /^[0-9]{4}$/;

// export const BACKEND_URL = "https://api.deloungecafe.com/api/v1";
// export const BACKEND_URL = "https://40b9-125-99-173-186.ngrok-free.app/api/v1";
export const BACKEND_URL = "https://current-fish-manually.ngrok-free.app/api/v1";
// export const BACKEND_URL = "https://4844-125-99-173-186.ngrok-free.app/api/v1";

export const CDN_URL = "https://cdn.deloungecafe.com/";

// local key
export const STRIPE_PUBLIC_KEY = "pk_test_51QCxBJHliBFhQl5Sfxyactla0vrLw2IO7t4pUFBwHywPjeap3iBS7sEe7bncI6NBdCoetAhdfIUxWGjuajVkJ6F4004SKA6sQ9";

// server key
// export const STRIPE_PUBLIC_KEY = "pk_test_51QEJaCEQOrAyyyQ3QvZhdpdWJ0QfJKOb5YBRLjeQ4PNNxNoveBiPf2AS5tqA3Fih2sauafz3sz9CawNcNYcXpxen00NJBglpsa";

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
    itemDetails: "/user/item",
    signupOtpResend: "/auth/user/signup-otp-resend",
    signupOtpVerify: "/auth/user/signup-otp-verify",
    googleLogin: "/auth/user/google-sign-in",
    updateProfileName: "/user/profile-name",
    updateProfilePhone: "/user/profile-phone",
    updateProfileEmail: "/user/profile-email"
};

export const errorMessage = {
    commonError: "Failed to process!",
    otp: "Invalid OTP entered.",
    commonMessage: "Something went wrong. Please try again later.",
    notificationAccessError: "Allow notification permission for get incoming message",
    cartUpdate: "Your cart options have been updated! Please review your cart before proceeding.",
    unknownError: "An unknown error occurred",
    canNotProceed: 'We can not procced your request'
}

export const responseMessage = {
    profileNameUpdate: "Name updated successfully",
    phoneChanged: "Phone number changed successfully",
    profileEmailUpdate: "Email updated successfully",
};

export const googleKeys = {
    webClientId: "910822640980-ltr2n7c7p69cgvu3sbksgm4oaptonmar.apps.googleusercontent.com"
}

// SHA1: 5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
// SHA256: FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C