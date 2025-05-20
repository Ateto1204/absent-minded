import { useTaskContext } from "@/context/TaskContext";
import { AlertDialog, Button, Flex, Text } from "@radix-ui/themes";

const DeleteTaskDialog = ({ id }: { id: string }) => {
    const { deleteTask, loading } = useTaskContext();

    return (
        <AlertDialog.Content>
            <AlertDialog.Title className="text-lg font-semibold">
                Confirm Delete
            </AlertDialog.Title>
            <AlertDialog.Description>
                <Text size="2">
                    Are you sure you want to delete task ID: {id}?
                </Text>
            </AlertDialog.Description>
            <div className="mt-6">
                <Flex gapX="2">
                    <AlertDialog.Action>
                        <Button
                            color="red"
                            variant="solid"
                            onClick={() => deleteTask(id)}
                            loading={loading}
                        >
                            Yes, Delete
                        </Button>
                    </AlertDialog.Action>
                    <AlertDialog.Cancel>
                        <Button variant="soft">Cancel</Button>
                    </AlertDialog.Cancel>
                </Flex>
            </div>
        </AlertDialog.Content>
    );
};

export default DeleteTaskDialog;
