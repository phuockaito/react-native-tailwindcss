import { ModalTypeEnum } from "@/constants";
import { modalStore, openModal } from "@/features";
import { ModalType } from "@/type";
import React from "react";
import { useAppDispatch, useAppSelector } from "./use-react-redux";

export const useModal = () => {
    const resultModal = useAppSelector(modalStore);
    const dispatch = useAppDispatch();
    const toggleModal = React.useCallback((data: ModalType) => dispatch(openModal(data)), [dispatch]);

    const handleCloseModal = () => {
        toggleModal({
            title: "",
            type: ModalTypeEnum.NULL,
            modal_type: "DEFAULT",
        });
    };

    return {
        resultModal,
        ModalTypeEnum,
        handleCloseModal,
        toggleModal,
    };
};
