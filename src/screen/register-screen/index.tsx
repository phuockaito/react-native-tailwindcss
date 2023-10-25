import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Pressable, SafeAreaView, TextInput, View } from "react-native";
import * as yup from "yup";

import { CustomText } from "@/components";
import { useAccount } from "@/hooks";
import { PayloadRegisterType } from "@/type";
import { yupResolver } from "@hookform/resolvers/yup";
import { unwrapResult } from "@reduxjs/toolkit";
import Feather from "react-native-vector-icons/Feather";

interface ResponseErrorType {
    message: string;
    status: number;
}

const schema = yup.object().shape({
    email: yup.string().email("Email không họp lệ").required("Vui lòng nhập email của bạn!"),
    password: yup
        .string()
        .required("Vui lòng nhập mật khẩu của bạn!")
        .min(8, "Mật khẩu cần dài ít nhất 8 ký tự")
        .max(32, "Mật khẩu phải có nhiều nhất 32 ký tự")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Ký tự chữ hoa, chữ thường, ký tự đặc biệt!"),
    userName: yup.string().required("Vui lòng nhập tên của bạn!"),
});

export const RegisterScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { resultStoreAccount, handlePostRegister } = useAccount();
    const [showPassword, setShowPassword] = React.useState(true);
    const [messageError, setMessageError] = React.useState<string>("");

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data: PayloadRegisterType) => {
        try {
            if (!resultStoreAccount.loading) {
                setMessageError("");
                const response = await handlePostRegister(data);
                await unwrapResult(response);
                navigation.navigate("Person");
            }
        } catch (error: any) {
            const response: ResponseErrorType = JSON.parse(error.message);
            setMessageError(response.message);
        }
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    return (
        <SafeAreaView
            style={{
                backgroundColor: "#21212a",
            }}
        >
            <View className="gap h-full w-full flex-col justify-center px-4">
                <CustomText className="relative bottom-5 text-center text-2xl font-semibold text-white">Đăng ký</CustomText>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => {
                        return (
                            <View className="mb-6 gap-2">
                                <CustomText className="text-slate-200">Tên của bạn</CustomText>
                                <TextInput
                                    autoCapitalize="none"
                                    className="h-10 rounded-md px-3"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    placeholderTextColor="white"
                                    style={{
                                        backgroundColor: "#3e3f44",
                                        color: "#ffff",
                                    }}
                                />
                                {errors.email && <CustomText style={{ color: "#ff4d4f" }}>{errors.email.message}</CustomText>}
                            </View>
                        );
                    }}
                    name="userName"
                />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => {
                        return (
                            <View className="mb-6 gap-2">
                                <CustomText className="text-slate-200">Email</CustomText>
                                <TextInput
                                    autoCapitalize="none"
                                    className="h-10 rounded-md px-3"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    placeholderTextColor="white"
                                    style={{
                                        backgroundColor: "#3e3f44",
                                        color: "#ffff",
                                    }}
                                />
                                {errors.email && <CustomText style={{ color: "#ff4d4f" }}>{errors.email.message}</CustomText>}
                            </View>
                        );
                    }}
                    name="email"
                />
                <Controller
                    control={control}
                    rules={{
                        maxLength: 100,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => {
                        return (
                            <View className="gap-2">
                                <CustomText className="text-slate-200">Password</CustomText>
                                <View className="relative flex h-10 items-end justify-center">
                                    <TextInput
                                        secureTextEntry={showPassword}
                                        className="absolute h-full w-full rounded-md px-3 text-white"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        placeholderTextColor="white"
                                        style={{
                                            backgroundColor: "#3e3f44",
                                            color: "#ffff",
                                        }}
                                    />
                                    <View className="mr-4">
                                        <Pressable onPress={() => setShowPassword(!showPassword)}>
                                            <Feather name={showPassword ? "eye-off" : "eye"} size={18} color="#a5a6c4" />
                                        </Pressable>
                                    </View>
                                </View>
                                {errors.password && <CustomText style={{ color: "#ff4d4f" }}>{errors.password.message}</CustomText>}
                            </View>
                        );
                    }}
                    name="password"
                />
                <Pressable onPress={handleSubmit(onSubmit)}>
                    <View
                        className="mt-8 flex-row items-center justify-center rounded-md p-3"
                        style={{
                            backgroundColor: "#1890ff",
                        }}
                    >
                        {resultStoreAccount.loading ? (
                            <ActivityIndicator size="small" color="#ffff" />
                        ) : (
                            <CustomText className="text-center text-white">Đăng ký</CustomText>
                        )}
                    </View>
                </Pressable>
                {messageError && (
                    <CustomText style={{ color: "#ff4d4f" }} className="mt-2 text-center">
                        {messageError}
                    </CustomText>
                )}
                <View className="mt-4 flex-row justify-center gap-x-1">
                    <Pressable
                        onPress={() => {
                            navigation.navigate("Person");
                        }}
                    >
                        <CustomText className="font-semibold text-blue-500">Đăng nhập ngay</CustomText>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};
