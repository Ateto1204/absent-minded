import { useUserContext } from "@/context/UserContext";
import UserPlanEnum from "@/models/enums/UserPlanEnum";
import { Badge, Button, Dialog, Flex, Text } from "@radix-ui/themes";

const UserPlanBadge = () => {
    const { userPlan, upgradeUserPlan, unsubscribeUserPlan } = useUserContext();

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
            <Dialog.Content>
                {userPlan === UserPlanEnum.Free ? (
                    <Flex direction="column" gap="6" align="center" py="4">
                        <Dialog.Title>
                            <Text size="4" weight="bold">
                                Upgrade to Pro plan
                            </Text>
                        </Dialog.Title>
                        <Text size="2">
                            Unlock the Cloud solution and AI assistant.
                        </Text>
                        <Flex gap="3" mt="2" align="center">
                            <Dialog.Close>
                                <Button
                                    color="blue"
                                    variant="solid"
                                    size="1"
                                    onClick={upgradeUserPlan}
                                >
                                    Upgrade ($1.99/mon)
                                </Button>
                            </Dialog.Close>
                            <Dialog.Close>
                                <Button color="gray" variant="ghost" size="2">
                                    Cancel
                                </Button>
                            </Dialog.Close>
                        </Flex>
                    </Flex>
                ) : (
                    <Flex direction="column" gap="6" align="center" py="4">
                        <Dialog.Title>
                            <Text size="4" weight="bold">
                                Pro Plan
                            </Text>
                        </Dialog.Title>
                        <Flex direction="column" gap="4">
                            <Text size="2" align="center">
                                Enjoy cloud sync and advanced AI assistant
                                features.
                            </Text>
                            <Text size="2" align="center">
                                Thank you for being a Pro user!
                            </Text>
                        </Flex>
                        <Flex gap="3" mt="2" align="center">
                            <Dialog.Close>
                                <Button color="blue" variant="solid" size="1">
                                    Confirm
                                </Button>
                            </Dialog.Close>
                            <Dialog.Close>
                                <Button
                                    color="red"
                                    variant="outline"
                                    size="1"
                                    onClick={unsubscribeUserPlan}
                                >
                                    Unsubscribe
                                </Button>
                            </Dialog.Close>
                        </Flex>
                    </Flex>
                )}
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default UserPlanBadge;
