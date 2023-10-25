import * as React from "react";

import { ModalTypeEnum } from "@/constants";
import { Modal } from "@ant-design/react-native";

import { useModal } from "@/hooks/use-modal";
import { Text } from "react-native";
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

export const ContainerModal = () => {
    const { resultModal, handleCloseModal } = useModal();
    const { data, modal, title, type } = resultModal;

    const WrapperModal = React.useMemo(() => checkModal(type), [type]);
    if (!WrapperModal) return null;

    return (
        <Modal title={<Text className="text-left text-base">{title}</Text>} visible maskClosable onClose={handleCloseModal} {...modal}>
            <WrapperModal {...data} />
        </Modal>
    );
};
