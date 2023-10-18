import { apiNewMusic } from "@/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const asyncThunkGetTopViewsMusic = createAsyncThunk("onGetTopViewsMusic", async () => {
    return await apiNewMusic.getTopViewsMusic();
});
