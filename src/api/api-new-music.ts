import { axiosClient } from "./axios-client";

export const apiNewMusic = {
    getTopViewsMusic: () => {
        const url = "music/new-music?_limit=200";
        return axiosClient.get(url);
    },
};
