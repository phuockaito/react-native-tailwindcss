import { CustomText } from "@/components";
import { useModal } from "@/hooks";
import { Flex, Modal } from "@ant-design/react-native";
import React from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const ModalScreen = () => {
    const { toggleModal, ModalTypeEnum } = useModal();
    const items = [
        {
            title: "Open Alert",
            onPress: () => {
                Modal.alert(<CustomText>Thông báo</CustomText>, <CustomText>Nội dung</CustomText>, [
                    {
                        text: "Đóng",
                        onPress: () => {},
                        style: "cancel",
                    },
                ]);
            },
        },
        {
            title: "Open Modal",
            onPress: () => {
                toggleModal({
                    type: ModalTypeEnum.ADD,
                    title: "Thêm mới",
                    modal_type: "DEFAULT",
                });
            },
        },
        {
            title: "Full screen",
            onPress: () => {
                toggleModal({
                    type: ModalTypeEnum.MODAL_FULL_SCREEN,
                    title: "Thêm mới",
                    modal_type: "FULL_SCREEN",
                });
            },
        },
        {
            title: "popup",
            onPress: () => {
                toggleModal({
                    type: ModalTypeEnum.MODAL_POPUP,
                    title: "popup",
                    modal_type: "POPUP",
                });
            },
        },
    ];

    return (
        <SafeAreaView className="h-full w-full items-center justify-center">
            <Flex
                style={{
                    padding: 12,
                    gap: 20,
                }}
            >
                {items.map((item, index) => (
                    <Pressable key={index} className="rounded-lg border border-slate-600 p-3" onPress={item.onPress}>
                        <CustomText className="text-slate-600">{item.title}</CustomText>
                    </Pressable>
                ))}
            </Flex>
        </SafeAreaView>
    );
};
