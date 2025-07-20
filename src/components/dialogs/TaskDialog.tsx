import {
    Dialog,
    Button,
    Flex,
    Text,
    TextArea,
    TextField,
    DataList,
} from "@radix-ui/themes";
import React, { useState, useRef } from "react";
import { useTaskContext } from "@/context/TaskContext";
import TaskData from "@/models/interfaces/task/TaskData";
import TaskStatusUpdateButton from "@/components/buttons/TaskStatusUpdateButton";

const TaskDialog = ({ id, data }: { id: string; data: TaskData }) => {
    const isMac =
        typeof navigator !== "undefined" && /Mac/.test(navigator.platform);
    const shortcutLabel = isMac ? "⌘↵" : "Ctrl+↵";

    const { updateTaskData, loading } = useTaskContext();
    const [label, setLabel] = useState(data.label || "");
    const [description, setDescription] = useState(data.description || "");
    const [deadline, setDeadline] = useState(
        data.deadline ? new Date(data.deadline).toISOString().slice(0, 10) : ""
    );
    const [start, setStart] = useState(
        data.start ? new Date(data.start).toISOString().slice(0, 10) : ""
    );
    const [url, setUrl] = useState(data.url || "");
    const [assignees, setAssignees] = useState(data.assignees || []);

    const handleSave = () => {
        const taskData = {
            label,
            description,
            start: start ? new Date(start) : null,
            deadline: deadline ? new Date(deadline) : null,
            url,
            assignees,
        };
        updateTaskData(id, taskData);
    };
    const closeRef = useRef<HTMLButtonElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const enterWithMod = (isMac && e.metaKey) || (!isMac && e.ctrlKey);
        if (e.key === "Enter" && enterWithMod) {
            e.preventDefault();
            handleSave();
            closeRef.current?.click();
        }
    };

    const handleClose = () => {
        setLabel(data.label || "");
        setDescription(data.description || "");
        setDeadline(
            data.deadline
                ? new Date(data.deadline).toISOString().slice(0, 10)
                : ""
        );
        setStart(
            data.start ? new Date(data.start).toISOString().slice(0, 10) : ""
        );
    };

    return (
        <Flex>
            <Dialog.Content onKeyDown={handleKeyDown}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                >
                    <Flex justify="between" align="center">
                        <Dialog.Title className="text-lg font-semibold">
                            Edit Task
                        </Dialog.Title>
                        <Dialog.Close onClick={handleClose}>
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
                            <DataList.Label>URL</DataList.Label>
                            <DataList.Value>
                                <TextField.Root
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="task url"
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
                                            new Date(start) >
                                                new Date(newDeadline)
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
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    placeholder={"write description here..."}
                                    className="w-full"
                                />
                            </DataList.Value>
                        </DataList.Item>
                    </DataList.Root>
                    <Flex justify="end" gapX="2" className="mt-8">
                        <TaskStatusUpdateButton id={id} />
                        <Dialog.Close ref={closeRef}>
                            <Button
                                color="blue"
                                variant="solid"
                                onClick={handleSave}
                                loading={loading}
                                disabled={loading}
                                className="rounded-full px-4 py-2 flex items-center"
                            >
                                <Text size="1">Save</Text>
                                <Text
                                    size="1"
                                    className="ml-2 bg-blue-500 px-2 py-0.5 rounded text-white"
                                >
                                    {shortcutLabel}
                                </Text>
                            </Button>
                        </Dialog.Close>
                    </Flex>
                </form>
            </Dialog.Content>
        </Flex>
    );
};

export default TaskDialog;
