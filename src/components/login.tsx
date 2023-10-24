import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import * as yup from "yup";

import { useAccount } from "@/hooks";
import { PayloadLoginType } from "@/type";
import { yupResolver } from "@hookform/resolvers/yup";
import Feather from "react-native-vector-icons/Feather";

const schema = yup.object().shape({
    email: yup.string().email("Email không họp lệ").required("Vui lòng nhập email của bạn!"),
    password: yup
        .string()
        .required("Vui lòng nhập mật khẩu của bạn!")
        .min(8, "Mật khẩu cần dài ít nhất 8 ký tự")
        .max(32, "Mật khẩu phải có nhiều nhất 32 ký tự")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Phải chứa một chữ hoa, một chữ thường, một số và một ký tự viết hoa đặc biệt!"
        ),
});

export const Login = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { handlePostLogin, resultStoreAccount } = useAccount();
    const [showPassword, setShowPassword] = React.useState(true);

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data: PayloadLoginType) => {
        try {
            if (!resultStoreAccount.loading) {
                await handlePostLogin(data);
                // const payload = unwrapResult(result);
            }
        } catch (error) {
            console.log(error);
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
                <Text className="relative bottom-5 text-center text-2xl text-white">Đăng nhập</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => {
                        return (
                            <View className="mb-6 gap-2">
                                <Text className="text-slate-200">Email</Text>
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
                                {errors.password && <Text style={{ color: "#ff4d4f" }}>{errors.password.message}</Text>}
                            </View>
                        );
                    }}
                    name="password"
                />
                <Pressable onPress={handleSubmit(onSubmit)}>
                    <View
                        className="mt-6 flex-row items-center justify-center rounded-md p-3"
                        style={{
                            backgroundColor: "#1890ff",
                        }}
                    >
                        {resultStoreAccount.loading && <ActivityIndicator size="small" color="#ffff" className="mr-2" />}
                        <Text className="text-center text-white">Đăng nhập</Text>
                    </View>
                </Pressable>
                <View className="mt-7 flex-row justify-center gap-x-1">
                    <Text className="font-semibold text-blue-500">Bạn chưa có tài khoản?</Text>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("Register");
                        }}
                    >
                        <Text className="font-semibold text-blue-500">Đăng ký ngay</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};
