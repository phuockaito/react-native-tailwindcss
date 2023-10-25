import { ModalType } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialStateModal: ModalType = {
    title: "",
    data: {},
    type: "",
    modal_type: "DEFAULT",
};

export const modalSlice = createSlice({
    name: "modal",
    initialState: initialStateModal,
    reducers: {
        openModal: (state: ModalType, action: PayloadAction<ModalType>) => {
            const { title, data, modal_type, type } = action.payload;
            state.title = title;
            state.data = data;
            state.modal_type = modal_type;
            state.type = type;
        },
    },
});
const { actions, reducer } = modalSlice;
export const { openModal } = actions;
export default reducer;
