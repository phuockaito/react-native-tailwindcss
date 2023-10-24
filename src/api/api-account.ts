import { AccountResponse, PayloadLoginType, PayloadRegisterType } from "@/type";
import { axiosClient } from "./axios-client";

export const apiAccount = {
    postLogin: (payload: PayloadLoginType): Promise<AccountResponse> => {
        const url = "account/login";
        return axiosClient.post(url, payload);
    },
    postRegister(payload: PayloadRegisterType): Promise<AccountResponse> {
        const url = "account/register";
        return axiosClient.post(url, payload);
    },
};
