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

export { submitLogin };