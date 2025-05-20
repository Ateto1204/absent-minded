import {
    Dialog,
    Button,
    Flex,
    Text,
    TextArea,
    TextField,
    DataList,
    AlertDialog,
} from "@radix-ui/themes";
import { useState } from "react";
import { useTaskContext } from "@/context/TaskContext";
import TaskData from "@/models/entities/task/TaskData";
import DeleteTaskDialog from "./DeleteTaskDialog";

const TaskDialog = ({ id, data }: { id: string; data: TaskData }) => {
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
        <Flex>
            <Dialog.Content>
                <Flex justify="between" align="center">
                    <Dialog.Title className="text-lg font-semibold">
                        Edit Task
                    </Dialog.Title>
                    <Dialog.Close>
                        <Text className="relative bottom-3 cursor-pointer">
                            x
                        </Text>
                    </Dialog.Close>
                </Flex>
                <Dialog.Description></Dialog.Description>
                <DataList.Root>
                    <DataList.Item>
                        <DataList.Label>ID</DataList.Label>
                        <DataList.Value>{id}</DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label>Task</DataList.Label>
                        <DataList.Value>
                            <TextField.Root
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                placeholder="task title"
                                className="w-full"
                            />
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label>Deadline</DataList.Label>
                        <DataList.Value>
                            <input
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                className="border px-2 py-1 rounded border-gray-600"
                            />
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label>Note</DataList.Label>
                        <DataList.Value>
                            <TextArea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder={"write description here..."}
                                className="w-full"
                            />
                        </DataList.Value>
                    </DataList.Item>
                </DataList.Root>
                <Flex justify="end" gapX="4" className="mt-8">
                    <AlertDialog.Root>
                        <AlertDialog.Trigger>
                            <Button
                                color="red"
                                variant="solid"
                                onClick={handleSave}
                                loading={loading}
                                disabled={loading}
                            >
                                Delete
                            </Button>
                        </AlertDialog.Trigger>
                        <DeleteTaskDialog id={id} />
                    </AlertDialog.Root>
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
            </Dialog.Content>
        </Flex>
    );
};

export default TaskDialog;
