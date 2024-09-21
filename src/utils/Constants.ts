export const COLORS = {
    BACKGROUND: '#FFFFFF',
    TEXT: '#7B6F72',
    WHITE: '#FFFFFF',
    RED: '#FF007D',
    PLACEHOLDER_COLOR: '#ADA4A5',
    BLACK: '#000000',
    THEME: "#DD21CD",
    BUTTON: '#FF00E2'
};

export const BACKEND_URL = "https://stable-gobbler-select.ngrok-free.app";

export const apiEndpoints = { signup: "/auth/user/sign-up", login: "/auth/user/sign-in", forgot: "/auth/user/forgot-password", otpVerify: "/auth/user/otp-verify", resetPassword: "/auth/user/reset-password" };

export const errorMessage = { commonError: "Failed to process!", otp: "Invalid OTP entered.", commonMessage: "Something went wrong. Please try again later.", }