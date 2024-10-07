import axios from "axios";

import { apiEndpoints, BACKEND_URL } from "./Constants";

const submitLogin = async (dataPayload: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(BACKEND_URL + apiEndpoints.login, dataPayload);
            resolve(res);
        } catch (error: any) {
            console.log('API ERROR (refreshAuthToken)', (error?.response?.data?.message || error?.message));
            reject(error);
        }
    });
}

const getCategoryList = async (params: any = {}) => {
    try {
        const paramsSearch = new URLSearchParams(params);
        const res = await axios.get(`${BACKEND_URL}${apiEndpoints.categoryList}?${paramsSearch}`);
        return res.data;
    } catch (error: any) {
        const { response } = error;
        const message = response?.data?.message || error?.message || "Unknown error";
        throw new Error(message);
    }
};

const getItemList = async (params = {}, limit = 10, offset = 0) => {
    try {
        const paramData = new URLSearchParams({ limit: String(limit), offset: String(offset), ...params });
        
        const res = await axios.get(`${BACKEND_URL}${apiEndpoints.itemList}?${paramData}`);

        return res.data;
    } catch (error: any) {
        const { response } = error;
        const message = response?.data?.message || error?.message || "Unknown error";
        throw new Error(message);
    }
};

const deleteAccount = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.delete(BACKEND_URL + apiEndpoints.deleteAccount);
            resolve(res);
        } catch (error: any) {
            console.log('API ERROR (deleteAccount)', (error?.response?.data?.message || error?.message));
            reject(error);
        }
    });
}

const getTopicList = async () => {
    try {
        const res = await axios.get(`${BACKEND_URL}${apiEndpoints.topicList}`);

        return res.data;
    } catch (error: any) {
        const { response } = error;
        const message = response?.data?.message || error?.message || "Unknown error";
        throw new Error(message);
    }
};

const getDietaryList = async () => {
    try {
        const res = await axios.get(`${BACKEND_URL}${apiEndpoints.dietaryList}`);
        return res.data;
    } catch (error: any) {
        const { response } = error;
        const message = response?.data?.message || error?.message || "Unknown error";
        throw new Error(message);
    }
};

const getCuisineList = async () => {
    try {
        const res = await axios.get(`${BACKEND_URL}${apiEndpoints.cuisineList}`);
        return res.data;
    } catch (error: any) {
        const { response } = error;
        const message = response?.data?.message || error?.message || "Unknown error";
        throw new Error(message);
    }
};

const getPriceRange = async () => {
    try {
        const res = await axios.get(`${BACKEND_URL}${apiEndpoints.priceRange}`);
        return res.data;
    } catch (error: any) {
        const { response } = error;
        const message = response?.data?.message || error?.message || "Unknown error";
        throw new Error(message);
    }
};

export { submitLogin, getCategoryList, getItemList, deleteAccount, getTopicList, getDietaryList, getCuisineList, getPriceRange };