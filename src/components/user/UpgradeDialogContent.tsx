import { useUserContext } from "@/context/UserContext";
import { AlertDialog, Button, Dialog, Flex, Text } from "@radix-ui/themes";

const UpgradeDialogContent = () => {
    const { upgradeUserPlan } = useUserContext();

    return (
        <Flex direction="column" gap="6" align="center" py="4">
            <Dialog.Title>
                <Text size="4" weight="bold">
                    Upgrade to Pro plan
                </Text>
            </Dialog.Title>
            <Dialog.Description>
                <Text size="2">
                    Unlock the Cloud solution and AI assistant.
                </Text>
            </Dialog.Description>
            <Flex gap="3" mt="2" align="center">
                <AlertDialog.Root>
                    <AlertDialog.Trigger>
                        <Button color="blue" variant="solid" size="1">
                            Upgrade ($1.99/mon)
                        </Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Content>
                        <AlertDialog.Title>Confirm Upgrade</AlertDialog.Title>
                        <AlertDialog.Description>
                            Are you sure you want to upgrade to Pro plan for
                            $1.99/month?
                        </AlertDialog.Description>
                        <Flex gap="3" mt="4" justify="end">
                            <AlertDialog.Cancel>
                                <Button variant="ghost" color="gray">
                                    Cancel
                                </Button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action>
                                <Dialog.Close>
                                    <Button
                                        color="blue"
                                        variant="solid"
                                        size="1"
                                        onClick={upgradeUserPlan}
                                    >
                                        Yes, Upgrade
                                    </Button>
                                </Dialog.Close>
                            </AlertDialog.Action>
                        </Flex>
                    </AlertDialog.Content>
                </AlertDialog.Root>
                <Dialog.Close>
                    <Button color="gray" variant="ghost" size="2">
                        Cancel
                    </Button>
                </Dialog.Close>
            </Flex>
        </Flex>
    );
};

export default UpgradeDialogContent;
