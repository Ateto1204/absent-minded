import { supabase } from "@/lib/supabase";
import UserPlanEnum from "@/models/enums/UserPlanEnum";
import UserViewModel from "@/models/interfaces/viewModel/UserViewModel";
import { useEffect, useState } from "react";

const STORAGE_KEY_URI = "aminded-server-uri";
const STORAGE_KEY_PLAN = "aminded-user-plan";

const useUserViewModel = (): UserViewModel => {
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

    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [userCreated, setUserCreated] = useState("");
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const getUserInfo = async () => {
            const { data: userData } = await supabase.auth.getUser();
            const { data: sessionData } = await supabase.auth.getSession();
            if (sessionData?.session?.access_token) {
                setAccessToken(sessionData.session.access_token);
            }
            if (userData?.user) {
                setUserEmail(userData.user.email ?? "");
                setUserName(userData.user.user_metadata.full_name ?? "");
                const avatar =
                    userData.user.user_metadata.avatar_url ??
                    userData.user.user_metadata.picture ??
                    "";
                setUserAvatar(avatar);
                setUserCreated(userData.user.created_at);
            }
        };
        getUserInfo();
    }, []);

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

    return {
        userEmail,
        userName,
        userAvatar,
        userCreated,
        serverUri,
        userPlan,
        upgradeUserPlan: handleUpgradeUserPlan,
        unsubscribeUserPlan: handleUnsubscribeUserPlan,
        setServerUri: handleSetServerUri,
        accessToken,
    };
};

export default useUserViewModel;
