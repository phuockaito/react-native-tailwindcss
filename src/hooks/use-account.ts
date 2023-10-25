import { accountStore, asyncThunkGetProfile, asyncThunkPostLogin, asyncThunkPostRegister, onLogout } from "@/features";
import { PayloadLoginType, PayloadRegisterType } from "@/type";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "./use-react-redux";

export const useAccount = () => {
    const dispatch = useAppDispatch();
    const resultStoreAccount = useAppSelector(accountStore);

    const handlePostLogin = React.useCallback((payload: PayloadLoginType) => dispatch(asyncThunkPostLogin(payload)), [dispatch]);
    const handlePostRegister = React.useCallback((payload: PayloadRegisterType) => dispatch(asyncThunkPostRegister(payload)), [dispatch]);
    const handleLogout = React.useCallback(() => dispatch(onLogout()), [dispatch]);
    const handleGetProfile = React.useCallback(() => dispatch(asyncThunkGetProfile()), [dispatch]);

    return {
        resultStoreAccount,
        handlePostLogin,
        handleLogout,
        handlePostRegister,
        handleGetProfile,
    };
};
