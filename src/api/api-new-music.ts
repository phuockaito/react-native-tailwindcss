import { ItemMusicType } from "@/type";
import { axiosClient } from "./axios-client";

export const apiNewMusic = {
    getTopViewsMusic: () => {
        const url = "music/new-music?_limit=40";
        return axiosClient.get(url);
    },
    getMusic: (id: string): Promise<{ data: ItemMusicType }> => {
        const url = `/music/get-by-id?_id=${id}`;
        return axiosClient.get(url);
    },
    createPlayHistoryMusic: (id: string) => {
        const url = "play-history/create";
        return axiosClient.post(url, {
            idMusic: id
        });
    }
};
