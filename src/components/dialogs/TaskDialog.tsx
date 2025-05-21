import {
    Dialog,
    Button,
    Flex,
    Text,
    TextArea,
    TextField,
    DataList,
    AlertDialog,
    Separator,
    Select,
} from "@radix-ui/themes";
import { useState } from "react";
import { useTaskContext } from "@/context/TaskContext";
import TaskData from "@/models/entities/task/TaskData";
import DeleteDialog from "./DeleteDialog";
import TaskStatus from "@/models/entities/task/TaskStatus";

const TaskDialog = ({ id, data }: { id: string; data: TaskData }) => {
    const { updateTaskData, loading } = useTaskContext();
    const [label, setLabel] = useState(data.label || "");
    const [description, setDescription] = useState(data.description || "");
    const [deadline, setDeadline] = useState(
        data.deadline ? new Date(data.deadline).toISOString().slice(0, 10) : ""
    );
    const [taskStatus, setTaskStatus] = useState<string>(TaskStatus.Completed);

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
                <Flex justify="end" gapX="2" className="mt-8">
                    <AlertDialog.Root>
                        <Flex
                            gapX="2"
                            className="rounded bg-gray-700 px-2 cursor-pointer border border-gray-600"
                            align="center"
                        >
                            <AlertDialog.Trigger className="hover:opacity-60">
                                <Text size="1" className="w-16">
                                    <Flex justify="center">{taskStatus}</Flex>
                                </Text>
                            </AlertDialog.Trigger>
                            <Separator orientation="vertical" size="1" />
                            <Select.Root size="1" onValueChange={setTaskStatus}>
                                <Select.Trigger variant="ghost" color="gray">
                                    <Text className="hover:opacity-60 p-0" />
                                </Select.Trigger>
                                <Select.Content>
                                    <Select.Item value={TaskStatus.Completed}>
                                        Completed
                                    </Select.Item>
                                    <Select.Item value={TaskStatus.Deprecated}>
                                        Deprecated
                                    </Select.Item>
                                </Select.Content>
                            </Select.Root>
                        </Flex>
                        <DeleteDialog id={id} type="task" />
                    </AlertDialog.Root>
                    <Button
                        color="blue"
                        variant="solid"
                        onClick={handleSave}
                        loading={loading}
                        disabled={loading}
                    >
                        <Text size="1">Save</Text>
                    </Button>
                </Flex>
            </Dialog.Content>
        </Flex>
    );
};

export default TaskDialog;
