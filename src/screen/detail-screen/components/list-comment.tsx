import { useComment } from '@/hooks';
import { CommentType } from '@/type'
import moment from 'moment';
import React from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";

interface ListCommentProps {
    data: CommentType[],
    id_account?: string
}

export const ListComment = ({ data, id_account }: ListCommentProps) => {
    const { handleDeleteComment } = useComment();

    return (
        <ScrollView
            className='flex-1 px-5 gap-y-3'
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            {
                data.map((item: CommentType) => (
                    <View className='flex-row gap-4' key={item._id}>
                        <View
                            className="w-12 h-12"
                        >
                            <Image
                                source={{
                                    uri: item.account.image,
                                }}
                                className="w-full h-full rounded-full"
                            />
                        </View>
                        <View className='flex-1'>
                            <View className='flex-row items-center justify-between mb-1'>
                                <View className='flex-row items-center justify-center gap-2'>
                                    <Text className='text-lg font-semibold text-white'>{item.account.user_name}</Text>
                                    <View className='flex flex-row items-center'>
                                        <Entypo name="dot-single" size={20} color="#a5a6c4" />
                                        <Text className='text-white'>{moment(item.createdAt).fromNow()}</Text>
                                    </View>
                                </View>
                                {item.id_account === id_account &&
                                    <Pressable
                                        onPress={() => handleDeleteComment(item._id)}
                                    >
                                        <AntDesign name="delete" size={20} color="#a5a6c4" />
                                    </Pressable>
                                }
                            </View>
                            <Text className='text-base font-medium text-left text-white'>
                                {item.content}
                            </Text>
                        </View>
                    </View>
                ))
            }
        </ScrollView>
    )
}
