import { Button, Dialog } from "@radix-ui/themes";
import { useState } from "react";
import ChatRoom from "@/components/chatRoom/ChatRoom";
import UpgradeDialogContent from "@/components/user/UpgradeDialogContent";
import { useUserContext } from "@/context/UserContext";
import UserPlanEnum from "@/models/enums/UserPlanEnum";

interface ChatTaskGeneratorProps {
    disabled?: boolean;
}

const ChatTaskGenerator = ({ disabled = false }: ChatTaskGeneratorProps) => {
    const [open, setOpen] = useState(false);
    const { userPlan } = useUserContext();

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button
                    onClick={() => setOpen(true)}
                    color={userPlan === UserPlanEnum.Free ? "gray" : "blue"}
                    disabled={disabled}
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
