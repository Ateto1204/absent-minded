import { useProjectContext } from "@/context/ProjectContext";
import { useTaskContext } from "@/context/TaskContext";
import { AlertDialog, Button, Flex, Text } from "@radix-ui/themes";

const DeleteDialog = ({
    id,
    type,
}: {
    id: string;
    type: "task" | "project";
}) => {
    const { deleteTask, loading: taskLoading } = useTaskContext();
    const { deleteProject, loading: projectLoading } = useProjectContext();

    const handleDelete = () => {
        if (type === "task") {
            deleteTask(id);
        } else {
            deleteProject(id);
        }
    };

    return (
        <AlertDialog.Content>
            <AlertDialog.Title className="text-lg font-semibold">
                Confirm Delete
            </AlertDialog.Title>
            <AlertDialog.Description>
                <Text size="2">
                    {`Are you sure you want to delete ${type} ID: ${id}?`}
                </Text>
            </AlertDialog.Description>
            <div className="mt-6">
                <Flex gapX="2">
                    <AlertDialog.Action>
                        <Button
                            color="red"
                            variant="solid"
                            onClick={handleDelete}
                            loading={taskLoading || projectLoading}
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

export default DeleteDialog;
