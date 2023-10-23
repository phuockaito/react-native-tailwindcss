import { accountStore, asyncThunkPostLogin, onLogout } from "@/features";
import { PayloadLoginType } from "@/type";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "./use-react-redux";

export const useAccount = () => {
    const dispatch = useAppDispatch();
    const resultStoreAccount = useAppSelector(accountStore);
    const handlePostLogin = React.useCallback((payload: PayloadLoginType) => dispatch(asyncThunkPostLogin(payload)), [dispatch]);
    const handleLogout = React.useCallback(() => dispatch(onLogout()), [dispatch]);
    return {
        resultStoreAccount,
        handlePostLogin,
        handleLogout,
    };
};
