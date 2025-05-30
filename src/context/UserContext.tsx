import UserPlanEnum from "@/models/enums/UserPlanEnum";
import { createContext, useContext, useState, ReactNode } from "react";

const STORAGE_KEY_URI = "aminded-server-uri";
const STORAGE_KEY_PLAN = "aminded-user-plan";

type UserContextType = {
    userPlan: UserPlanEnum;
    upgradeUserPlan: () => void;
    unsubscribeUserPlan: () => void;
    serverUri: string;
    setServerUri: (uri: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const defaultUri = "http://localhost:8080";
    const defaultPlan: UserPlanEnum = UserPlanEnum.Free;

    const [serverUri, setServerUri] = useState(() =>
        typeof window !== "undefined"
            ? localStorage.getItem(STORAGE_KEY_URI) || defaultUri
            : defaultUri
    );
    const [userPlan, setUserPlan] = useState(() =>
        typeof window !== "undefined"
            ? (localStorage.getItem(STORAGE_KEY_PLAN) as UserPlanEnum) ||
              defaultPlan
            : defaultPlan
    );

    const handleSetServerUri = (uri: string) => {
        setServerUri(uri);
        if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY_URI, uri);
        }
    };

    const handleUpgradeUserPlan = () => {
        setUserPlan(UserPlanEnum.Pro);
        if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY_PLAN, UserPlanEnum.Pro);
        }
    };

    const handleUnsubscribeUserPlan = () => {
        setUserPlan(UserPlanEnum.Free);
        if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY_PLAN, UserPlanEnum.Free);
        }
    };

    return (
        <UserContext.Provider
            value={{
                userPlan,
                upgradeUserPlan: handleUpgradeUserPlan,
                unsubscribeUserPlan: handleUnsubscribeUserPlan,
                serverUri,
                setServerUri: handleSetServerUri,
            }}
        >
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
