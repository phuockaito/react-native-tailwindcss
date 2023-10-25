import axios, { AxiosResponse } from "axios";
import queryString from "query-string";

import { REACT_APP_API_URL } from "@/constants";

export const axiosClient = axios.create({
    baseURL: REACT_APP_API_URL,
    headers: {
        "content-type": "application/json",
    },
    responseType: "json",
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
    (config) => {
        return config;
    },
    function error() {
        console.log("request error", error);
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error: any) => {
        throw new Error(
            JSON.stringify({
                status: error.response.status,
                message: error.response.data.message,
            })
        );
    }
);

export default axiosClient;
