import { accountSlice, modalSlice, musicSlice } from "@/features";

export const reducer = {
    storeMusic: musicSlice.reducer,
    storeAccount: accountSlice.reducer,
    storeModal: modalSlice.reducer,
};
