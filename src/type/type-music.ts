export interface InitialStateMusicSliceType {
    data: ItemMusicType[];
    loading: boolean;
}

export interface ItemMusicType {
    _id: string;
    id_account: string;
    name_singer: string;
    slug_name_singer: string;
    src_music: string;
    link_mv: string;
    image_music: string;
    time_format: string;
    seconds: number;
    name_music: string;
    slug_name_music: string;
    category: string;
    slug_category: string;
    sum_comment: number;
    view: number;
    subscribe: string;
    slug_subscribe: string;
    favorite: number;
    account_favorite: any[];
    createdAt: Date;
    updatedAt: Date;
}
