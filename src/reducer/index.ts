import { accountSlice, modalSlice, musicSlice, CommentSlice } from "@/features";

export const reducer = {
    storeMusic: musicSlice.reducer,
    storeAccount: accountSlice.reducer,
    storeModal: modalSlice.reducer,
    storeComment: CommentSlice.reducer,
};
