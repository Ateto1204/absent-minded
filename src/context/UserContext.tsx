"use client";

import useUserViewModel from "@/hooks/useUserViewModel";
import UserViewModel from "@/models/interfaces/viewModel/UserViewModel";
import { createContext, useContext, ReactNode } from "react";

const UserContext = createContext<UserViewModel | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const userViewModel = useUserViewModel();

    return (
        <UserContext.Provider value={userViewModel}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const ctx = useContext(UserContext);
    if (!ctx)
        throw new Error("useUserContext must be used within a UserProvider");
    return ctx;
};
