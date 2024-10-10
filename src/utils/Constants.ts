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
};

export const BACKEND_URL = "http://54.66.64.243/api/v1";
// export const BACKEND_URL = "http://192.168.0.112:3000/api/v1";
// export const BACKEND_URL = "https://stable-gobbler-select.ngrok-free.app/api/v1";
export const CDN_URL = "https://d1wn3ec1bju3mm.cloudfront.net/";

export const apiEndpoints = { signup: "/auth/user/sign-up", login: "/auth/user/sign-in", forgot: "/auth/user/forgot-password", otpVerify: "/auth/user/otp-verify", resetPassword: "/auth/user/reset-password", categoryList: "/user/item-category/list", itemList: "/user/item/list", updateProfile: "/user/profile", profileUpload: "/user/profile-upload", changePassword: "/user/change-password", deleteAccount: "/user/account", topicList: "/user/feedback-topics", feedback: "/user/feedback", dietaryList: "/user/dietary/list", cuisineList: "/user/cuisine/list", priceRange: "/user/item/price-range" };

export const errorMessage = { commonError: "Failed to process!", otp: "Invalid OTP entered.", commonMessage: "Something went wrong. Please try again later.", }