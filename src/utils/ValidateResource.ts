import { SetStateAction } from 'react';
import * as Yup from 'yup';

const validateResource = (resourceSchema: { validate: (arg0: any) => any; }, setState: any) => async (resource: any) => {
    try {
        // throws an error if not valid
        const validData = await resourceSchema.validate(resource);
        resource = validData;
        return resource;
    } catch (err: any) {
        const path = err?.path || "";
        const errors = err?.errors?.join(", ") || "Unknown error";

        setState((pre: any) => ({
            ...pre,
            [path]: {
                status: true,
                text: errors
            }
        }));

        throw new Error(errors);
    }
};

const signup = Yup.object({
    name: Yup.string()
        .trim()
        .required("Name is required"),
    email: Yup.string()
        .email()
        .trim()
        .required("Email is required"),
    mobile: Yup.number()
        .typeError("Only number allowed")
        .required("Mobile is required"),
    password: Yup.string()
        .trim()
        .required("Password is required")
        .min(6)
});

const login = Yup.object({
    username: Yup.string()
        .trim()
        .required("Email or mobile number is required"),
    password: Yup.string()
        .trim()
        .required("Password is required")
        .min(6)
});

const forgotPassword = Yup.object({
    username: Yup.string()
        .trim()
        .required("Email or mobile number is required"),
});

const resetPassword = Yup.object({
    password: Yup.string()
        .trim()
        .required("Password is required.")
        .min(6, "The password must have at least 6 characters."),
    confirmPassword: Yup.string()
        .trim()
        .required("Confirm password is required.")
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const updateProfile = Yup.object({
    name: Yup.string()
        .trim()
        .required("Name is required"),
    email: Yup.string()
        .email()
        .trim()
        .required("Email is required"),
    phone: Yup.number()
        .typeError("Only number allowed")
        .required("Phone is required")
});

const changePassword = Yup.object({
    password: Yup.string()
        .trim()
        .required("Password is required.")
        .min(6, "The password must have at least 6 characters.")
        .test('not-same-as-old', 'New password must be different from the old password.', function (value) {
            return value !== this.parent.oldPassword; // Custom test to ensure password is different from oldPassword
        }),
    oldPassword: Yup.string()
        .trim()
        .required("Old Password is required."),
    confirmPassword: Yup.string()
        .trim()
        .required("Confirm password is required.")
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const feedbackForm = Yup.object({
    topicId: Yup.number()
        .typeError("Topic is required")
        .min(1, "Topic is required")
        .required("Topic is required"),
    feedback: Yup.string()
        .trim()
        .min(10, "Feedback must be at least 10 characters")
        .max(200, "Feedback cannot exceed 200 characters")
        .required("Feedback is required")
});

export { validateResource, signup, login, forgotPassword, resetPassword, updateProfile, changePassword, feedbackForm };