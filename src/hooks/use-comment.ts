import React from 'react'

import { useAppDispatch, useAppSelector } from "./use-react-redux";
import { asyncThunkCreateComment, asyncThunkDeleteComment, asyncThunkGetComment, commentStore } from '@/features';
import { CreateCommentType, ParamsUrl } from '@/type';

export const useComment = () => {
    const dispatch = useAppDispatch();
    const storeComment = useAppSelector(commentStore);
    const fetchGetComment = React.useCallback((params: ParamsUrl) => dispatch(asyncThunkGetComment(params)), [dispatch]);
    const fetchCreateComment = React.useCallback((data: CreateCommentType) => dispatch(asyncThunkCreateComment(data)), [dispatch]);
    const handleDeleteComment = React.useCallback((id: string) => dispatch(asyncThunkDeleteComment(id)), [dispatch]);

    return {
        storeComment,
        fetchGetComment,
        fetchCreateComment,
        handleDeleteComment
    }
}
