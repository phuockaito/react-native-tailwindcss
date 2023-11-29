import { apiNewMusic } from "@/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const asyncThunkGetTopViewsMusic = createAsyncThunk("onGetTopViewsMusic", async (_, { rejectWithValue }) => {
    try {
        const response = await apiNewMusic.getTopViewsMusic();
        return response;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});
