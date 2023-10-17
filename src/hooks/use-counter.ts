import * as React from "react";

import { onIncrement, searchStore } from "@/features";
import { useAppDispatch, useAppSelector } from "./use-react-redux";

export const useCounter = () => {
    const result = useAppSelector(searchStore);
    const dispatch = useAppDispatch();
    const handleIncrement = React.useCallback((value: number) => dispatch(onIncrement(value)), [dispatch]);
    return {
        result,
        handleIncrement,
    };
};
