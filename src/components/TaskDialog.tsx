import {
    Dialog,
    Button,
    Flex,
    Text,
    TextArea,
    TextField,
} from "@radix-ui/themes";
import { useState } from "react";
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
    const { updateTaskData, loading } = useTaskContext();
    const [label, setLabel] = useState(data.label || "");
    const [description, setDescription] = useState(data.description || "");

    const handleSave = () => {
        const taskData = {
            label,
            description,
        };
        updateTaskData(id, taskData);
    };

    return (
        <Dialog.Content>
            <Flex justify="between" align="center">
                <Dialog.Title className="text-lg font-semibold">
                    Edit Task
                </Dialog.Title>
                <Dialog.Close>
                    <Text className="relative bottom-3 cursor-pointer">x</Text>
                </Dialog.Close>
            </Flex>
            <Dialog.Description>
                <Text size="1">id: {id}</Text>
            </Dialog.Description>
            <Flex className="my-3" gapX="2">
                <Text className="relative pt-1">task :</Text>
                <TextField.Root
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Task label"
                />
            </Flex>
            <TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <div className="mt-6">
                <Flex gapX="2">
                    <Button
                        color="red"
                        variant="solid"
                        onClick={handleDelete}
                        loading={loading}
                    >
                        Delete
                    </Button>
                    <Button
                        color="blue"
                        variant="solid"
                        onClick={handleSave}
                        loading={loading}
                    >
                        Save
                    </Button>
                </Flex>
            </div>
        </Dialog.Content>
    );
};

export default TaskDialog;
