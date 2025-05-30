import {
    Dialog,
    Button,
    Flex,
    Text,
    TextArea,
    TextField,
    DataList,
} from "@radix-ui/themes";
import { useState } from "react";
import { useTaskContext } from "@/context/TaskContext";
import TaskData from "@/models/interfaces/task/TaskData";
import TaskStatusUpdateButton from "@/components/buttons/TaskStatusUpdateButton";

const TaskDialog = ({ id, data }: { id: string; data: TaskData }) => {
    const { updateTaskData, loading } = useTaskContext();
    const [label, setLabel] = useState(data.label || "");
    const [description, setDescription] = useState(data.description || "");
    const [deadline, setDeadline] = useState(
        data.deadline ? new Date(data.deadline).toISOString().slice(0, 10) : ""
    );
    const [start, setStart] = useState(
        data.start ? new Date(data.start).toISOString().slice(0, 10) : ""
    );

    const handleSave = () => {
        const taskData = {
            label,
            description,
            start: start ? new Date(start) : null,
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
                        <DataList.Label>Start</DataList.Label>
                        <DataList.Value>
                            <input
                                type="date"
                                value={start}
                                onChange={(e) => {
                                    const newStart = e.target.value;
                                    if (
                                        deadline &&
                                        new Date(newStart) > new Date(deadline)
                                    ) {
                                        alert(
                                            "The start time cannot be later than the end time"
                                        );
                                        return;
                                    }
                                    setStart(newStart);
                                }}
                                className="border px-2 py-1 rounded border-gray-600"
                            />
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label>Deadline</DataList.Label>
                        <DataList.Value>
                            <input
                                type="date"
                                value={deadline}
                                onChange={(e) => {
                                    const newDeadline = e.target.value;
                                    if (
                                        start &&
                                        new Date(start) > new Date(newDeadline)
                                    ) {
                                        alert(
                                            "The start time cannot be later than the end time"
                                        );
                                        return;
                                    }
                                    setDeadline(newDeadline);
                                }}
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
                    <TaskStatusUpdateButton id={id} />
                    <Dialog.Close>
                        <Button
                            color="blue"
                            variant="solid"
                            onClick={handleSave}
                            loading={loading}
                            disabled={loading}
                        >
                            <Text size="1">Save</Text>
                        </Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Flex>
    );
};

export default TaskDialog;
