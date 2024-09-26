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

export const BACKEND_URL = "http://192.168.0.111:3000";

export const apiEndpoints = { signup: "/auth/user/sign-up", login: "/auth/user/sign-in", forgot: "/auth/user/forgot-password", otpVerify: "/auth/user/otp-verify", resetPassword: "/auth/user/reset-password", categoryList: "/user/item-category/list", itemList: "/user/item/list" };

export const errorMessage = { commonError: "Failed to process!", otp: "Invalid OTP entered.", commonMessage: "Something went wrong. Please try again later.", }