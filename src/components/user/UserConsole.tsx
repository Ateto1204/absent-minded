import { Avatar, Card, Dialog, Flex, Text } from "@radix-ui/themes";
import { LuUser } from "react-icons/lu";
import UserDialog from "@/components/user/UserDialog";
import UserConsoleProps from "@/models/interfaces/dto/UserConsoleProps";

const UserConsole = ({
    avatar,
    name,
    email,
    handleSignout,
}: UserConsoleProps) => {
    return (
        <Dialog.Root>
            <Flex
                direction="column"
                align="center"
                justify="between"
                className="absolute bottom-4 left-3 right-4 text-zinc-400 mb-2"
            >
                <Dialog.Trigger>
                    <Card mb="1">
                        <Flex align="center" gap="2">
                            <Avatar
                                src={avatar}
                                size="2"
                                radius="full"
                                fallback={<LuUser />}
                            />
                            <Flex direction="column">
                                <Text size="2">{name}</Text>
                                <Text size="1">{email}</Text>
                            </Flex>
                        </Flex>
                    </Card>
                </Dialog.Trigger>
                <UserDialog
                    avatar={avatar}
                    name={name}
                    email={email}
                    handleSignout={handleSignout}
                />
            </Flex>
        </Dialog.Root>
    );
};

export default UserConsole;
