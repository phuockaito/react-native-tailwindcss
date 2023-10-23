import { useAccount } from "@/hooks";
import React from "react";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";

export const Profile = () => {
    const { resultStoreAccount, handleLogout } = useAccount();
    if (!resultStoreAccount.access_token) return;

    const { data } = resultStoreAccount;

    return (
        <SafeAreaView
            style={{
                backgroundColor: "#21212a",
            }}
        >
            <View className="h-full w-full px-2">
                <Image
                    width={wp(10)}
                    height={wp(10)}
                    resizeMode="cover"
                    className="rounded-lg"
                    source={{
                        uri: data?.image,
                    }}
                />
                <View className="gap-1">
                    <View className="flex-row justify-between gap-2">
                        <Text className="text-sm text-slate-200">Tài Khoản:</Text>
                        <Text className="text-sm text-slate-200">{data?.email}</Text>
                    </View>
                    <View className="flex-row justify-between gap-2">
                        <Text className="text-sm text-slate-200">Tên:</Text>
                        <Text className="text-sm text-slate-200">{data?.user_name}</Text>
                    </View>
                    <View className="flex-row justify-between gap-2">
                        <Text className="text-sm text-slate-200">Đăng xuất</Text>
                        <Pressable onPress={() => handleLogout()}>
                            <Text>
                                <AntDesign name="logout" size={20} color="red" />
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};
