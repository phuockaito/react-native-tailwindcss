import { apiAccount } from "@/api";
import { PayloadLoginType, PayloadRegisterType } from "@/type";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const asyncThunkPostLogin = createAsyncThunk("asyncThunkPostLogin", async (payload: PayloadLoginType, { rejectWithValue }) => {
    try {
        const response = await apiAccount.postLogin(payload);
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const asyncThunkPostRegister = createAsyncThunk("asyncThunkPostRegister", async (payload: PayloadRegisterType, { rejectWithValue }) => {
    try {
        const response = await apiAccount.postRegister(payload);
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const asyncThunkGetProfile = createAsyncThunk("asyncThunkGetProfile", async (_, { rejectWithValue }) => {
    try {
        const response = await apiAccount.getProfile();
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});
