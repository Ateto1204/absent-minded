import { useUserContext } from "@/context/UserContext";
import { AlertDialog, Button, Dialog, Flex, Text } from "@radix-ui/themes";

const UnsubscribeDialogContent = () => {
    const { unsubscribeUserPlan } = useUserContext();

    return (
        <Flex direction="column" gap="6" align="center" py="4">
            <Dialog.Title>
                <Text size="4" weight="bold">
                    Pro Plan
                </Text>
            </Dialog.Title>
            <Flex direction="column" gap="4">
                <Text size="2" align="center">
                    Enjoy cloud sync and advanced AI assistant features.
                </Text>
                <Dialog.Description>
                    <Text size="2" align="center">
                        Thank you for being a Pro user!
                    </Text>
                </Dialog.Description>
            </Flex>
            <Flex gap="3" mt="2" align="center">
                <Dialog.Close>
                    <Button color="blue" variant="solid" size="1">
                        Confirm
                    </Button>
                </Dialog.Close>
                <AlertDialog.Root>
                    <AlertDialog.Trigger>
                        <Button color="red" variant="outline" size="1">
                            Unsubscribe
                        </Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Content>
                        <AlertDialog.Title>
                            Confirm Unsubscribe
                        </AlertDialog.Title>
                        <AlertDialog.Description>
                            Are you sure you want to unsubscribe from Pro plan?
                            You will lose access to Pro features immediately.
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
                                        color="red"
                                        variant="solid"
                                        size="1"
                                        onClick={unsubscribeUserPlan}
                                    >
                                        Yes, Unsubscribe
                                    </Button>
                                </Dialog.Close>
                            </AlertDialog.Action>
                        </Flex>
                    </AlertDialog.Content>
                </AlertDialog.Root>
            </Flex>
        </Flex>
    );
};

export default UnsubscribeDialogContent;
