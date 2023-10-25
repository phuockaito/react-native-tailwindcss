import { useModal } from "@/hooks";
import { Flex, Modal } from "@ant-design/react-native";
import React from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const ModalScreen = () => {
    const { toggleModal, ModalTypeEnum } = useModal();
    const items = [
        {
            title: "Open Alert",
            onPress: () => {
                Modal.alert(<Text>Thông báo</Text>, <Text>Nội dung</Text>, [
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
                    modal: {
                        transparent: true,
                    },
                });
            },
        },
        {
            title: "Full screen",
            onPress: () => {
                toggleModal({
                    type: ModalTypeEnum.MODAL_FULL_SCREEN,
                    title: "Thêm mới",
                    modal: {
                        transparent: false,
                    },
                });
            },
        },
        {
            title: "popup",
            onPress: () => {
                toggleModal({
                    type: ModalTypeEnum.MODAL_POPUP,
                    title: "popup",
                    modal: {
                        popup: true,
                        animationType: "slide-up",
                    },
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
                        <Text className="text-slate-600">{item.title}</Text>
                    </Pressable>
                ))}
            </Flex>
        </SafeAreaView>
    );
};
