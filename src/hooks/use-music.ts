import * as React from "react";

import { asyncThunkGetTopViewsMusic, asyncThunksCreatePlayHistoryMusic, asyncThunksMusic, musicStore } from "@/features";
import { useAppDispatch, useAppSelector } from "./use-react-redux";

export const useMusic = () => {
    const dispatch = useAppDispatch();
    const resultStoreMusic = useAppSelector(musicStore);
    const fetchGetTopViewsMusic = React.useCallback(() => dispatch(asyncThunkGetTopViewsMusic()), [dispatch]);
    const fetchGetMusic = React.useCallback((id: string) => dispatch(asyncThunksMusic(id)), [dispatch]);
    const handleCreatePlayHistoryMusic = React.useCallback((id: string) => dispatch(asyncThunksCreatePlayHistoryMusic(id)), [dispatch]);

    return {
        resultStoreMusic,
        fetchGetTopViewsMusic,
        fetchGetMusic,
        handleCreatePlayHistoryMusic
    };
};
