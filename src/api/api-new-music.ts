import { axiosClient } from "./axios-client";

export const apiNewMusic = {
    getTopViewsMusic: () => {
        const url = "music/top-views";
        return axiosClient.get(url);
    },
};
