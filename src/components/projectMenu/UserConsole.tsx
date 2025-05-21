import { Avatar, Card, Flex, Text } from "@radix-ui/themes";
import SignOutDialog from "@/components/dialogs/SignOutDialog";
import { LuUser } from "react-icons/lu";

const UserConsole = ({
    avatar,
    name,
    email,
    handleSignout,
}: {
    avatar: string;
    name: string;
    email: string;
    handleSignout: () => void;
}) => {
    return (
        <Flex
            direction="column"
            align="start"
            justify="between"
            className="absolute bottom-4 left-3 right-4 text-zinc-400 mb-2"
        >
            <Card mb="3">
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
                    <SignOutDialog handleSignout={handleSignout} />
                </Flex>
            </Card>
        </Flex>
    );
};

export default UserConsole;
