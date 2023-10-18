import { InitialStateType } from "@/type";
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { asyncThunkGetTopViewsMusic } from "./patch-api";

const initialState: InitialStateType = {
    data: [],
    loading: true,
};

export const musicSlice = createSlice({
    name: "music",
    initialState,
    reducers: {},
    extraReducers(builder: ActionReducerMapBuilder<InitialStateType>) {
        builder
            .addCase(asyncThunkGetTopViewsMusic.pending, (state) => {
                state.loading = true;
            })
            .addCase(asyncThunkGetTopViewsMusic.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(asyncThunkGetTopViewsMusic.rejected, (state) => {
                state.loading = false;
                state.data = [];
            });
    },
});

const { reducer } = musicSlice;
export default reducer;
