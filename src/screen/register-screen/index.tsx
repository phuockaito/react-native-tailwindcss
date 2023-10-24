import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import * as yup from "yup";

import { useAccount } from "@/hooks";
import { PayloadRegisterType } from "@/type";
import { yupResolver } from "@hookform/resolvers/yup";
import Feather from "react-native-vector-icons/Feather";
import { unwrapResult } from "@reduxjs/toolkit";

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
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Ký tự chữ hoa, chữ thường, ký tự đặc biệt!"
        ),
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
                navigation.navigate("Person")
            }
        } catch (error: any) {
            const response: ResponseErrorType = JSON.parse(error.message);
            setMessageError(response.message)
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
            <View className="flex-col justify-center w-full h-full px-4 gap">
                <Text className="relative text-2xl font-semibold text-center text-white bottom-5">Đăng ký</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => {
                        return (
                            <View className="gap-2 mb-6">
                                <Text className="text-slate-200">Tên của bạn</Text>
                                <TextInput
                                    autoCapitalize="none"
                                    className="h-10 px-3 rounded-md"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    placeholderTextColor="white"
                                    style={{
                                        backgroundColor: "#3e3f44",
                                        color: "#ffff",
                                    }}
                                />
                                {errors.email && <Text style={{ color: "#ff4d4f" }}>{errors.email.message}</Text>}
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
                            <View className="gap-2 mb-6">
                                <Text className="text-slate-200">Email</Text>
                                <TextInput
                                    autoCapitalize="none"
                                    className="h-10 px-3 rounded-md"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    placeholderTextColor="white"
                                    style={{
                                        backgroundColor: "#3e3f44",
                                        color: "#ffff",
                                    }}
                                />
                                {errors.email && <Text style={{ color: "#ff4d4f" }}>{errors.email.message}</Text>}
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
                                <Text className="text-slate-200">Password</Text>
                                <View className="relative flex items-end justify-center h-10">
                                    <TextInput
                                        secureTextEntry={showPassword}
                                        className="absolute w-full h-full px-3 text-white rounded-md"
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
                                {errors.password && <Text style={{ color: "#ff4d4f" }}>{errors.password.message}</Text>}
                            </View>
                        );
                    }}
                    name="password"
                />
                <Pressable onPress={handleSubmit(onSubmit)}>
                    <View
                        className="flex-row items-center justify-center p-3 mt-8 rounded-md"
                        style={{
                            backgroundColor: "#1890ff",
                        }}
                    >
                        {
                            resultStoreAccount.loading
                                ? <ActivityIndicator size="small" color="#ffff" />
                                :
                                <Text className="text-center text-white">Đăng ký</Text>
                        }
                    </View>
                </Pressable>
                {messageError && <Text style={{ color: "#ff4d4f" }} className="mt-2 text-center">{messageError}</Text>}
                <View className="flex-row justify-center mt-4 gap-x-1">
                    <Pressable
                        onPress={() => {
                            navigation.navigate("Person");
                        }}
                    >
                        <Text className="font-semibold text-blue-500">Đăng nhập ngay</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};
