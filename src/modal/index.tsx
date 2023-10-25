import * as React from "react";

import { ModalTypeEnum } from "@/constants";
import { Modal } from "@ant-design/react-native";

import { CustomText } from "@/components";
import { useModal } from "@/hooks/use-modal";
import { ModalAdd, ModalFullScreen, ModalPopup } from "./components";

const checkModal = (modalType: string) => {
    switch (modalType) {
        case ModalTypeEnum.ADD:
            return ModalAdd;
        case ModalTypeEnum.MODAL_FULL_SCREEN:
            return ModalFullScreen;
        case ModalTypeEnum.MODAL_POPUP:
            return ModalPopup;
        default:
            return null;
    }
};

const propsModal = (modalType: string) => {
    switch (modalType) {
        case "DEFAULT": {
            return {
                transparent: true,
            };
        }
        case "FULL_SCREEN": {
            return {
                transparent: false,
            };
        }
        case "POPUP":
            return {
                popup: true,
                animationType: "slide-up",
            };
    }
};

export const ContainerModal = () => {
    const { resultModal, handleCloseModal } = useModal();
    const { data, modal_type, title, type } = resultModal;

    const WrapperModal = React.useMemo(() => checkModal(type), [type]);
    if (!WrapperModal) return null;

    return (
        <Modal
            title={<CustomText className="font-semibold text-left">{title}</CustomText>}
            visible
            maskClosable
            onClose={handleCloseModal}
            {...propsModal(modal_type)}
        >
            <WrapperModal {...data} />
        </Modal>
    );
};
