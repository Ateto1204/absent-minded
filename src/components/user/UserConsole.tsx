import { Avatar, Card, Dialog, Flex, Text } from "@radix-ui/themes";
import { LuUser } from "react-icons/lu";
import UserDialog from "@/components/user/UserDialog";
import { useUserContext } from "@/context/UserContext";

const UserConsole = ({ handleSignout }: { handleSignout: () => void }) => {
    const { userEmail, userName, userAvatar } = useUserContext();

    return (
        <Dialog.Root>
            <Flex
                direction="column"
                align="center"
                justify="between"
                className="absolute bottom-4 left-3 right-4 text-zinc-400 mb-2"
            >
                <Dialog.Trigger>
                    <div className="cursor-pointer">
                        <Card mb="1">
                            <Flex align="center" gap="2">
                                <Avatar
                                    src={userAvatar}
                                    size="2"
                                    radius="full"
                                    fallback={<LuUser />}
                                />
                                <Flex direction="column">
                                    <Text size="2">{userName}</Text>
                                    <Text size="1">{userEmail}</Text>
                                </Flex>
                            </Flex>
                        </Card>
                    </div>
                </Dialog.Trigger>
                <UserDialog handleSignout={handleSignout} />
            </Flex>
        </Dialog.Root>
    );
};

export default UserConsole;
