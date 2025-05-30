import { Button, Flex, Popover, Text } from "@radix-ui/themes";

const UserPlanHint = () => {
    return (
        <Popover.Root>
            <Popover.Trigger>
                <Button size="1" color="gray" radius="full" variant="soft">
                    ?
                </Button>
            </Popover.Trigger>
            <Popover.Content size="1">
                <Flex align="center" gap="4" mx="3" justify="between">
                    <Popover.Close>
                        <Button
                            radius="full"
                            color="gray"
                            size="2"
                            variant="ghost"
                        >
                            x
                        </Button>
                    </Popover.Close>
                    <Text>
                        Absent Minded will send request based on the URI.
                    </Text>
                </Flex>
            </Popover.Content>
        </Popover.Root>
    );
};

export default UserPlanHint;
