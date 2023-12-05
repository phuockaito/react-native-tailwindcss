import React from 'react'
import { ActivityIndicator, Pressable, TextInput, View } from 'react-native'
import { Controller, useForm } from "react-hook-form";
import { useAccount, useComment } from '@/hooks';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { unwrapResult } from '@reduxjs/toolkit';
import Feather from "react-native-vector-icons/Feather";


export const InputComment = ({ _id }: { _id: string }) => {
    const {
        handleSubmit,
        control,
        reset
    } = useForm();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { resultStoreAccount } = useAccount();
    const { fetchCreateComment, } = useComment();

    const [loading, setLoading] = React.useState(false);

    const onSubmit = async (data: any) => {
        try {
            if (!resultStoreAccount.access_token) {
                navigation.navigate("Person");
            } else {
                if (!loading) {
                    setLoading(true);
                    const result = await fetchCreateComment({ content: data.content, id_music: _id });
                    await unwrapResult(result);
                    setLoading(false);
                    reset();
                }
            }
        } catch (error) {
            setLoading(false);
            console.log("error", error);
        }
    }

    return (
        <View className='flex-row'>
            <View className='flex-1'>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => {
                        return (
                            <TextInput
                                autoCapitalize="none"
                                className="px-3 py-3 rounded-l"
                                multiline={true}
                                numberOfLines={10}
                                style={{
                                    height: 40,
                                    textAlignVertical: 'top',
                                    backgroundColor: "#3e3f44",
                                    color: "#ffff",
                                }}
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                placeholderTextColor="white"
                            />
                        );
                    }}
                    name="content"
                />
            </View>
            <View
                className='rounded-r w-[40px] justify-center items-center'
                style={{
                    backgroundColor: "#3e3f44",
                }}
            >
                <Pressable
                    onPress={handleSubmit(onSubmit)}
                >
                    {
                        loading
                            ? <ActivityIndicator size="small" color="#ffff" />
                            :
                            <Feather name="send" size={18} color="#a5a6c4" />
                    }
                </Pressable>
            </View>
        </View>
    )
}
