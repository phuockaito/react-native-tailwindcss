import { CommentType, CreateCommentType, ParamsUrl } from "@/type";
import { axiosClient } from "./axios-client";

export const apiComment = {
    getComment: (params: ParamsUrl): Promise<{ data: CommentType[] }> => {
        const url = "comment/get-by-id-music";
        return axiosClient.get(url, { params });
    },
    createComment: (data: CreateCommentType): Promise<{ data: CommentType }> => {
        const url = "comment/create";
        return axiosClient.post(url, data);
    },
}