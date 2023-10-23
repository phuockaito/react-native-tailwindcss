import { Login, Profile } from "@/components";
import { useAccount } from "@/hooks";
import React from "react";

export const AccountScreen = () => {
    const { resultStoreAccount } = useAccount();
    if (!resultStoreAccount.access_token) {
        return <Login />;
    }
    return <Profile />;
};
