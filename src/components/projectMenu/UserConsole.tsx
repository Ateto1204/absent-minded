import { Avatar, Card, Flex, Text } from "@radix-ui/themes";
import SignOutDialog from "./SignOutDialog";

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
            className="absolute bottom-4 left-4 right-4 text-sm text-zinc-400 mb-2"
        >
            <Card mb="3">
                <Flex align="center" gap="2">
                    <Avatar src={avatar} size="2" radius="full" fallback="T" />
                    <Flex direction="column">
                        <Text size="2">{name}</Text>
                        <Text size="1">{email}</Text>
                    </Flex>
                </Flex>
            </Card>
            <SignOutDialog handleSignout={handleSignout} />
        </Flex>
    );
};

export default UserConsole;
