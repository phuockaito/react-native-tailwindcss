import { AccountResponse, InitialStateAccountSliceType } from "@/type";
import { ActionReducerMapBuilder, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { asyncThunkGetProfile, asyncThunkPostLogin, asyncThunkPostRegister } from "./patch-api";

const initialState: InitialStateAccountSliceType = {
    data: null,
    loading: false,
    access_token: "",
};

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        onLogout: (state) => {
            state.access_token = null;
            state.data = null;
        },
    },
    extraReducers(builder: ActionReducerMapBuilder<InitialStateAccountSliceType>) {
        builder
            .addCase(asyncThunkPostLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(asyncThunkPostLogin.fulfilled, (state, action: PayloadAction<AccountResponse>) => {
                const { data, accessToken } = action.payload;
                state.loading = false;
                state.data = data;
                state.access_token = accessToken;
            })
            .addCase(asyncThunkPostLogin.rejected, (state) => {
                state.loading = false;
            });

        builder
            .addCase(asyncThunkPostRegister.pending, (state) => {
                state.loading = true;
            })
            .addCase(asyncThunkPostRegister.fulfilled, (state, action: PayloadAction<AccountResponse>) => {
                const { data, accessToken } = action.payload;
                state.loading = false;
                state.data = data;
                state.access_token = accessToken;
            })
            .addCase(asyncThunkPostRegister.rejected, (state) => {
                state.loading = false;
            });

        builder
            .addCase(asyncThunkGetProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(asyncThunkGetProfile.fulfilled, (state, action) => {
                const { data, accessToken } = action.payload;
                state.loading = false;
                state.data = data;
                state.access_token = accessToken;
            })
            .addCase(asyncThunkGetProfile.rejected, (state) => {
                state.loading = false;
                state.data = null;
                state.access_token = null;
            });
    },
});

const { reducer, actions } = accountSlice;
export const { onLogout } = actions;
export default reducer;
