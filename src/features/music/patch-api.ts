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

export const asyncThunksMusic = createAsyncThunk("asyncThunksMusic", async (id: string, { rejectWithValue }) => {
    try {
        const response = await apiNewMusic.getMusic(id);
        return response;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});

export const asyncThunksCreatePlayHistoryMusic = createAsyncThunk("asyncThunksCreatePlayHistoryMusic", async (id: string, { rejectWithValue }) => {
    try {
        const response = await apiNewMusic.createPlayHistoryMusic(id);
        return response;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});

export const asyncThunksPlayHistoryMusic = createAsyncThunk("asyncThunksPlayHistoryMusic", async (_, { rejectWithValue }) => {
    try {
        const response = await apiNewMusic.playHistoryMusic();
        return response;
    } catch (error: any) {
        return rejectWithValue(error);
    }
});
