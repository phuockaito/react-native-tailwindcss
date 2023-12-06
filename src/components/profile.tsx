import { useAccount } from "@/hooks";
import React from "react";
import { Pressable, SafeAreaView, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { CustomText } from "./custom-text";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const Profile = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { resultStoreAccount, handleLogout } = useAccount();

    const { data, access_token } = resultStoreAccount;
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Tài khoản",
            headerStyle: {
                backgroundColor: "#21212a",
            },
            headerTintColor: "white",
            headerLeft: () => <Pressable
                onPress={() => {
                    navigation.navigate("Home");
                }}
            >
                <Feather name="chevron-left" size={25} color="#ffff" />
            </Pressable>,
        });
    }, []);

    if (!access_token) return;
    return (
        <SafeAreaView
            style={{
                backgroundColor: "#21212a",
            }}
        >
            <View className="w-full h-full px-4">
                <View className="gap-1">
                    <View className="flex-row justify-between gap-2">
                        <CustomText className="text-lg text-slate-200">Tài Khoản:</CustomText>
                        <CustomText className="text-lg text-slate-200">{data?.email}</CustomText>
                    </View>
                    <View className="flex-row justify-between gap-2">
                        <CustomText className="text-lg text-slate-200">Tên:</CustomText>
                        <CustomText className="text-lg text-slate-200">{data?.user_name}</CustomText>
                    </View>
                    <View className="flex-row justify-between gap-2">
                        <CustomText className="text-lg text-slate-200">Đăng xuất</CustomText>
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
