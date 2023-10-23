import { apiAccount } from "@/api";
import { PayloadLoginType } from "@/type";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const asyncThunkPostLogin = createAsyncThunk("/account/login", async (payload: PayloadLoginType) => {
    const response = await apiAccount.postLogin(payload);
    return response;
});
