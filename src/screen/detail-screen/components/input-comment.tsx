import React from 'react'
import { ActivityIndicator, Pressable, TextInput, View } from 'react-native'
import { Controller, useForm } from "react-hook-form";
import { useComment } from '@/hooks';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { unwrapResult } from '@reduxjs/toolkit';
import Feather from "react-native-vector-icons/Feather";

interface InputCommentProps {
    _id: string;
    access_token: string | null;
}

export const InputComment = ({ _id, access_token }: InputCommentProps) => {
    const {
        handleSubmit,
        control,
        reset
    } = useForm();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { fetchCreateComment, } = useComment();

    const [loading, setLoading] = React.useState(false);

    const onSubmit = async (data: any) => {
        try {
            if (!access_token) {
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
        <View
            className='flex-row'
            style={{
                borderColor: "#ffff",
                borderTopWidth: 0.5
            }}
        >
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
                                className="px-6 py-4"
                                multiline={true}
                                numberOfLines={10}
                                placeholder="Viết bình luận..."
                                style={{
                                    height: 40,
                                    textAlignVertical: 'top',
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
                className='w-[40px] justify-center items-center mr-2'
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
