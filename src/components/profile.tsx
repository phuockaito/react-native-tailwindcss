import { useAccount } from "@/hooks";
import React from "react";
import { Image, Pressable, SafeAreaView, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import { CustomText } from "./custom-text";

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
                        <CustomText className="text-sm text-slate-200">Tài Khoản:</CustomText>
                        <CustomText className="text-sm text-slate-200">{data?.email}</CustomText>
                    </View>
                    <View className="flex-row justify-between gap-2">
                        <CustomText className="text-sm text-slate-200">Tên:</CustomText>
                        <CustomText className="text-sm text-slate-200">{data?.user_name}</CustomText>
                    </View>
                    <View className="flex-row justify-between gap-2">
                        <CustomText className="text-sm text-slate-200">Đăng xuất</CustomText>
                        <Pressable onPress={() => handleLogout()}>
                            <CustomText>
                                <AntDesign name="logout" size={20} color="red" />
                            </CustomText>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};
