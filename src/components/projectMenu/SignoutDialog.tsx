import { Button, Dialog, Flex } from "@radix-ui/themes";

const SignoutDialog = ({ handleSignout }: { handleSignout: () => void }) => {
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button size="1" color="gray" variant="soft">
                    Sign out
                </Button>
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Title>Confirm Sign Out</Dialog.Title>
                <div className="text-md text-zinc-400 my-5">
                    Are you sure you want to sign out?
                </div>
                <Flex gap="3" mt="4">
                    <Dialog.Close>
                        <Button
                            size="2"
                            color="red"
                            variant="solid"
                            onClick={handleSignout}
                        >
                            Confirm
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button size="2" variant="soft">
                            Cancel
                        </Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default SignoutDialog;
