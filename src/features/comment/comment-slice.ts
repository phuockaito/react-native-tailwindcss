import { InitialStateCommentSliceType } from "@/type";
import { createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { asyncThunkCreateComment, asyncThunkGetComment } from "./patch-api";

const initialState: InitialStateCommentSliceType = {
    data: [],
    loading: true,
};

export const CommentSlice = createSlice({
    name: "CommentSlice",
    initialState,
    reducers: {},
    extraReducers(builder: ActionReducerMapBuilder<InitialStateCommentSliceType>) {
        builder
            .addCase(asyncThunkGetComment.pending, (state) => {
                state.loading = true;
            })
            .addCase(asyncThunkGetComment.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.loading = false;
                state.data = data;
            })
            .addCase(asyncThunkGetComment.rejected, (state) => {
                state.loading = false;
            });
        builder
            .addCase(asyncThunkCreateComment.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.data.unshift(data);
            })
    }
})