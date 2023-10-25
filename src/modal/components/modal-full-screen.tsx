import { useModal } from "@/hooks";
import React from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";

export const ModalFullScreen = () => {
    const { handleCloseModal } = useModal();
    return (
        <SafeAreaView>
            <View className="h-full w-full px-5">
                <View className="mb-1 flex-row justify-between">
                    <Text className="text-base font-semibold">Thông báo</Text>
                    <Pressable onPress={handleCloseModal}>
                        <EvilIcons name="close" size={20} />
                    </Pressable>
                </View>

                <Text> modal full screen</Text>
                <Text> modal full screen</Text>
                <Text> modal full screen</Text>
                <Text> modal full screen</Text>
                <Text> modal full screen</Text>
            </View>
        </SafeAreaView>
    );
};
