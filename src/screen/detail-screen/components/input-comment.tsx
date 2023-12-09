import React from 'react'
import { ActivityIndicator, Pressable, TextInput, View } from 'react-native'
import { Controller, useForm } from "react-hook-form";
import { useComment } from '@/hooks';
import { unwrapResult } from '@reduxjs/toolkit';
import Feather from "react-native-vector-icons/Feather";
import { Modal } from "@ant-design/react-native";
import { CustomText } from '@/components';
import { UpdateCommentType } from '@/type';

interface InputCommentProps {
    _id: string;
    access_token: string | null;
    commentUpdate?: UpdateCommentType | null;
    setCommentUpdate: (comment: null) => void
}

export const InputComment = ({
    _id,
    access_token,
    commentUpdate,
    setCommentUpdate
}: InputCommentProps) => {
    const {
        handleSubmit,
        control,
        reset,
        setValue
    } = useForm();
    const { fetchCreateComment, handleUpdateComment } = useComment();

    const [loading, setLoading] = React.useState(false);

    const onSubmit = async (data: any) => {
        if (!access_token) {
            return Modal.alert(
                <CustomText>Thông báo</CustomText>,
                <CustomText>Vui lòng đăng nhập</CustomText>, [
                {
                    text: "Đóng",
                    onPress: () => { },
                    style: "cancel",
                },
            ]);
        }
        try {
            setLoading(true);
            if (commentUpdate) {
                const comment = await handleUpdateComment({ ...commentUpdate, content: data.content });
                await unwrapResult(comment);
                setCommentUpdate(null)
            } else {
                const result = await fetchCreateComment({ content: data.content, id_music: _id });
                await unwrapResult(result);
            }
            setLoading(false);
            reset();
        } catch (error) {
            setLoading(false);
            console.log("error", error);
        }
    };


    React.useEffect(() => {
        if (commentUpdate) {
            setValue("content", commentUpdate.content);
        }
    }, [commentUpdate, setValue]);

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
                {
                    loading
                        ? <ActivityIndicator size="small" color="#ffff" />
                        : <Pressable
                            onPress={handleSubmit(onSubmit)}
                        >
                            <Feather name="send" size={18} color="#a5a6c4" />
                        </Pressable>
                }

            </View>
        </View>
    )
}
