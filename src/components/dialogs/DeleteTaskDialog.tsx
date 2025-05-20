import { Dialog, Button, Flex, Text } from "@radix-ui/themes";
import { useTaskContext } from "@/context/TaskContext";

const DeleteTaskDialog = ({
    id,
    handleDelete,
}: {
    id: string;
    handleDelete: () => void;
}) => {
    const { loading } = useTaskContext();

    return (
        <Dialog.Content>
            <Flex justify="between" align="center">
                <Dialog.Title className="text-lg font-semibold">
                    Confirm Delete
                </Dialog.Title>
                <Dialog.Close>
                    <Text className="relative bottom-3 cursor-pointer">x</Text>
                </Dialog.Close>
            </Flex>
            <Dialog.Description>
                <Text size="2">
                    Are you sure you want to delete task ID: {id}?
                </Text>
            </Dialog.Description>
            <div className="mt-6">
                <Flex gapX="2">
                    <Dialog.Close>
                        <Button
                            color="red"
                            variant="solid"
                            onClick={handleDelete}
                            loading={loading}
                        >
                            Yes, Delete
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button variant="soft">Cancel</Button>
                    </Dialog.Close>
                </Flex>
            </div>
        </Dialog.Content>
    );
};

export default DeleteTaskDialog;
