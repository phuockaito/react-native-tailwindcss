
import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react'
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';

import { useComment } from '@/hooks';
import { CommentType } from '@/type';
import { InputComment } from './components';

export const CommentScreen = () => {
    const { params: { _id } } = useRoute<RouteProp<Record<string, { _id: string }>, string>>();

    const { fetchGetComment, storeComment } = useComment();

    React.useEffect(() => {
        (async () => {
            if (_id) {
                fetchGetComment({ _id })
            }
        })()
    }, [_id, fetchGetComment])

    if (storeComment.loading) return (
        <View className="items-center justify-center flex-1 w-full h-full" style={{ backgroundColor: "#21212a" }}>
            <ActivityIndicator size="large" color="#fff" />
        </View>
    );
    if (!storeComment.data.length) return (
        <View className="items-center justify-center flex-1 w-full h-full" style={{ backgroundColor: "#21212a" }}>
            <View>
                <Text className='text-white'>Chưa có bình luận nào</Text>
            </View>
            <InputComment _id={_id} />
        </View>
    );

    return (
        <View
            className="w-full h-full px-5"
            style={{ backgroundColor: "#21212a" }}
        >
            {
                storeComment.data.length ?
                    <ScrollView
                        className='flex-1 gap-y-3'
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        {
                            storeComment.data.map((item: CommentType) => (
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
                                        <Text className='mb-1 text-lg font-semibold text-white'>{item.account.user_name}</Text>
                                        <Text className='text-sm font-medium text-left text-white'>
                                            {item.content}
                                        </Text>
                                    </View>
                                </View>
                            ))
                        }
                    </ScrollView>
                    :
                    <Text className='text-white'>Chưa có bình luận nào</Text>
            }
            <InputComment _id={_id} />
        </View>
    )
}

