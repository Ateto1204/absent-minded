import { Button, AlertDialog, Flex, Tooltip } from "@radix-ui/themes";

const SignOutDialog = ({ handleSignout }: { handleSignout: () => void }) => {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Tooltip content="Sign out">
                    <Button size="1" color="gray" variant="soft">
                        Sign out
                    </Button>
                </Tooltip>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Confirm Sign Out</AlertDialog.Title>
                <AlertDialog.Description className="text-md text-zinc-400 my-5">
                    Are you sure you want to sign out?
                </AlertDialog.Description>
                <Flex gap="3" mt="4">
                    <AlertDialog.Action>
                        <Button
                            size="2"
                            color="red"
                            variant="solid"
                            onClick={handleSignout}
                        >
                            Confirm
                        </Button>
                    </AlertDialog.Action>
                    <AlertDialog.Cancel>
                        <Button size="2" variant="soft">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
};

export default SignOutDialog;
