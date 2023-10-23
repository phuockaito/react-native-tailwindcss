import { accountSlice, musicSlice } from "@/features";

export const reducer = {
    storeMusic: musicSlice.reducer,
    storeAccount: accountSlice.reducer,
};
