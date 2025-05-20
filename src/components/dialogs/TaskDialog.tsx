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
import DeleteTaskDialog from "./DeleteTaskDialog";
import TaskData from "@/models/entities/task/TaskData";

const TaskDialog = ({
    id,
    data,
    handleDelete,
}: {
    id: string;
    data: TaskData;
    handleDelete: () => void;
}) => {
    const { updateTaskData, loading } = useTaskContext();
    const [label, setLabel] = useState(data.label || "");
    const [description, setDescription] = useState(data.description || "");
    const [deadline, setDeadline] = useState(
        data.deadline ? new Date(data.deadline).toISOString().slice(0, 10) : ""
    );

    const handleSave = () => {
        const taskData = {
            label,
            description,
            deadline: deadline ? new Date(deadline) : null,
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
                    placeholder="task title"
                />
            </Flex>
            <Flex className="my-4" gapX="2">
                <Text className="relative pt-1 text-sm">deadline :</Text>
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="border px-2 py-1 rounded"
                />
            </Flex>
            <TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={"write description here..."}
            />
            <div className="mt-6">
                <Flex gapX="2">
                    <DeleteTaskTriggerButton
                        id={id}
                        handleDelete={handleDelete}
                    />
                    <Button
                        color="blue"
                        variant="solid"
                        onClick={handleSave}
                        loading={loading}
                        disabled={loading}
                    >
                        Save
                    </Button>
                </Flex>
            </div>
        </Dialog.Content>
    );
};

const DeleteTaskTriggerButton = ({
    id,
    handleDelete,
}: {
    id: string;
    handleDelete: () => void;
}) => {
    const { loading } = useTaskContext();
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button color="red" variant="solid" disabled={loading}>
                    Delete
                </Button>
            </Dialog.Trigger>
            <DeleteTaskDialog id={id} handleDelete={handleDelete} />
        </Dialog.Root>
    );
};

export default TaskDialog;
