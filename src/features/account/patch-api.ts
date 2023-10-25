import { apiAccount } from "@/api";
import { PayloadLoginType, PayloadRegisterType } from "@/type";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const asyncThunkPostLogin = createAsyncThunk("asyncThunkPostLogin", async (payload: PayloadLoginType) => {
    const response = await apiAccount.postLogin(payload);
    return response;
});

export const asyncThunkPostRegister = createAsyncThunk(
    "asyncThunkPostRegister",
    async (payload: PayloadRegisterType) => {
        const response = await apiAccount.postRegister(payload);
        return response;
    }
);
