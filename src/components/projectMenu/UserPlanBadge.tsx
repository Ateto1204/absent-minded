import { useUserContext } from "@/context/UserContext";
import UserPlanEnum from "@/models/enums/UserPlanEnum";
import { Badge, Dialog, Flex, Text } from "@radix-ui/themes";
import UserPlanBadgeDialog from "@/components/projectMenu/UserPlanBadgeDialog";

const UserPlanBadge = () => {
    const { userPlan } = useUserContext();

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Flex align="center" gap="2" className="cursor-pointer">
                    <Badge
                        color={userPlan === UserPlanEnum.Free ? "gray" : "blue"}
                        style={{ cursor: "pointer" }}
                    >
                        {userPlan}
                    </Badge>
                    {userPlan === UserPlanEnum.Free && (
                        <Text size="1" color="blue">
                            Upgrade
                        </Text>
                    )}
                </Flex>
            </Dialog.Trigger>
            <UserPlanBadgeDialog />
        </Dialog.Root>
    );
};

export default UserPlanBadge;
