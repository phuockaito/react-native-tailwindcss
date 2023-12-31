
import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native';

import { useAccount, useComment } from '@/hooks';
import { InputComment, ListComment } from './components';
import { UpdateCommentType } from '@/type';

export const CommentScreen = () => {
    const { params: { _id } } = useRoute<RouteProp<Record<string, { _id: string }>, string>>();
    const { fetchGetComment, storeComment } = useComment();
    const { resultStoreAccount } = useAccount();
    const { access_token } = resultStoreAccount;
    const [commentUpdate, setCommentUpdate] = React.useState<UpdateCommentType | null>(null);

    React.useEffect(() => {
        (async () => {
            if (_id) {
                fetchGetComment({ _id })
            }
        })()
    }, [_id, fetchGetComment]);

    if (storeComment.loading) return (
        <View className="items-center justify-center flex-1 w-full h-full" style={{ backgroundColor: "#21212a" }}>
            <ActivityIndicator size="large" color="#fff" />
        </View>
    );
    if (!storeComment.data.length) return (
        <View className="w-full h-full py-5" style={{ backgroundColor: "#21212a" }}>
            <View className='items-center justify-center flex-1'>
                <Text className='text-white'>Chưa có bình luận nào</Text>
            </View>
            <InputComment
                commentUpdate={commentUpdate}
                access_token={access_token}
                setCommentUpdate={setCommentUpdate}
                _id={_id}
            />
        </View>
    );

    return (
        <View
            className="w-full h-full py-5"
            style={{ backgroundColor: "#21212a" }}
        >
            <ListComment
                setCommentUpdate={setCommentUpdate}
                data={storeComment.data}
                id_account={resultStoreAccount.data?._id}
            />
            <InputComment
                commentUpdate={commentUpdate}
                access_token={access_token}
                setCommentUpdate={setCommentUpdate}
                _id={_id}
            />
        </View>
    )
}

