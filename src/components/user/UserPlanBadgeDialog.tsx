import { useUserContext } from "@/context/UserContext";
import UserPlanEnum from "@/models/enums/UserPlanEnum";
import { Dialog } from "@radix-ui/themes";
import UnsubscribeDialogContent from "@/components/user/UnsubscribeDialogContent";
import UpgradeDialogContent from "@/components/user/UpgradeDialogContent";

const UserPlanBadgeDialog = () => {
    const { userPlan } = useUserContext();

    return (
        <Dialog.Content>
            {userPlan === UserPlanEnum.Free ? (
                <UpgradeDialogContent />
            ) : (
                <UnsubscribeDialogContent />
            )}
        </Dialog.Content>
    );
};

export default UserPlanBadgeDialog;
