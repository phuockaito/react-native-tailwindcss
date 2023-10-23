import { AccountResponse, PayloadLoginType } from "@/type";
import { axiosClient } from "./axios-client";

export const apiAccount = {
    postLogin: (payload: PayloadLoginType): Promise<AccountResponse> => {
        const url = "account/login";
        return axiosClient.post(url, payload);
    },
};
