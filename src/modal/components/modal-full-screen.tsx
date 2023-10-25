import { CustomText } from "@/components";
import { useModal } from "@/hooks";
import React from "react";
import { Pressable, SafeAreaView, View } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";

export const ModalFullScreen = () => {
    const { handleCloseModal } = useModal();
    return (
        <SafeAreaView>
            <View className="h-full w-full px-5">
                <View className="mb-1 flex-row justify-between">
                    <CustomText className="text-base font-semibold">Thông báo</CustomText>
                    <Pressable onPress={handleCloseModal}>
                        <EvilIcons name="close" size={20} />
                    </Pressable>
                </View>

                <CustomText> modal full screen</CustomText>
                <CustomText> modal full screen</CustomText>
                <CustomText> modal full screen</CustomText>
                <CustomText> modal full screen</CustomText>
                <CustomText> modal full screen</CustomText>
            </View>
        </SafeAreaView>
    );
};
