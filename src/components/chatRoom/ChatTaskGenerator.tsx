import { Button, Dialog } from "@radix-ui/themes";
import { useState } from "react";
import ChatRoom from "@/components/chatRoom/ChatRoom";
import UpgradeDialogContent from "../user/UpgradeDialogContent";
import { useUserContext } from "@/context/UserContext";
import UserPlanEnum from "@/models/enums/UserPlanEnum";

const ChatTaskGenerator = () => {
    const [open, setOpen] = useState(false);
    const { userPlan } = useUserContext();

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button
                    onClick={() => setOpen(true)}
                    color={userPlan === UserPlanEnum.Free ? "gray" : "blue"}
                >
                    gpt +
                </Button>
            </Dialog.Trigger>
            {open && userPlan === UserPlanEnum.Pro && (
                <ChatRoom onClose={() => setOpen(false)} />
            )}
            {userPlan === UserPlanEnum.Free && (
                <Dialog.Content>
                    <UpgradeDialogContent />
                </Dialog.Content>
            )}
        </Dialog.Root>
    );
};

export default ChatTaskGenerator;
