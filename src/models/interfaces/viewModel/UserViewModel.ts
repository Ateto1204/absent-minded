import UserPlanEnum from "@/models/enums/UserPlanEnum";

interface UserViewModel {
    userEmail: string;
    userName: string;
    userAvatar: string;
    userCreated: string;
    userPlan: UserPlanEnum;
    upgradeUserPlan: () => void;
    unsubscribeUserPlan: () => void;
    serverUri: string;
    setServerUri: (uri: string) => void;
    accessToken: string;
}

export default UserViewModel;
