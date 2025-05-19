import { Dialog, Button, Flex, Text } from "@radix-ui/themes";
import { useTaskContext } from "@/context/TaskContext";

const TaskDialog = ({
    id,
    data,
    handleDelete,
}: {
    id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    handleDelete: () => void;
}) => {
    const { loading } = useTaskContext();

    return (
        <Dialog.Content>
            <Flex justify="between">
                <Dialog.Title className="text-lg font-semibold">
                    task: {data.label}
                </Dialog.Title>
                <Dialog.Close>
                    <Text className="relative bottom-3 cursor-pointer">x</Text>
                </Dialog.Close>
            </Flex>
            <Dialog.Description>ID: {id}</Dialog.Description>
            <Button
                color="red"
                variant="solid"
                onClick={handleDelete}
                className="mt-4"
                loading={loading}
            >
                Delete Task
            </Button>
        </Dialog.Content>
    );
};

export default TaskDialog;
