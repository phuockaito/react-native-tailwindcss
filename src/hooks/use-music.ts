import * as React from "react";

import { asyncThunkGetTopViewsMusic, musicStore } from "@/features";
import { useAppDispatch, useAppSelector } from "./use-react-redux";

export const useMusic = () => {
    const dispatch = useAppDispatch();
    const resultStoreMusic = useAppSelector(musicStore);
    const fetchGetTopViewsMusic = React.useCallback(() => dispatch(asyncThunkGetTopViewsMusic()), [dispatch]);

    return {
        resultStoreMusic,
        fetchGetTopViewsMusic,
    };
};
