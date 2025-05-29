import { useProjectContext } from "@/context/ProjectContext";
import { useTaskContext } from "@/context/TaskContext";
import Task from "@/models/entities/task/Task";
import TaskStatus from "@/models/entities/task/TaskStatus";
import { Button, DataList, Flex, Separator } from "@radix-ui/themes";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

enum AppliedStatus {
    Apply = "apply",
    Applied = "applied",
    Failed = "failed",
    Loading = "loading",
}

const MessageBubble = ({
    text,
    sender,
}: {
    text: string;
    sender: "user" | "bot";
}) => {
    const { addTask, success, error } = useTaskContext();
    const { currentProject, currentRoot } = useProjectContext();
    const [appliedStatus, setAppliedStatus] = useState<AppliedStatus>(
        AppliedStatus.Apply
    );
    let jsonObj = null;
    if (
        sender === "bot" &&
        typeof text === "string" &&
        text.trim().startsWith("{") &&
        text.trim().endsWith("}")
    ) {
        try {
            jsonObj = JSON.parse(text);
        } catch {}
    }

    const handleApply = async () => {
        if (currentRoot.trim() === "") {
            console.log("current root was null");
            return;
        }
        const task: Task = {
            id: uuidv4(),
            data: jsonObj,
            parent: currentRoot,
            project: currentProject,
            status: TaskStatus.Active,
        };
        setAppliedStatus(AppliedStatus.Loading);
        await addTask(task);
        if (success) {
            setAppliedStatus(AppliedStatus.Applied);
        } else if (error) {
            setAppliedStatus(AppliedStatus.Failed);
        }
    };

    return (
        <div
            className={`flex items-end ${
                sender === "user" ? "justify-end" : "justify-start"
            } w-full`}
        >
            {jsonObj ? (
                <Flex
                    direction="column"
                    gapY="3"
                    className="bg-zinc-900 text-zinc-100 p-4 rounded-xl shadow border border-zinc-800 max-w-[90%]"
                >
                    <Flex justify="end">
                        <Button
                            size="1"
                            color="gray"
                            onClick={handleApply}
                            disabled={appliedStatus !== AppliedStatus.Apply}
                        >
                            {appliedStatus}
                        </Button>
                    </Flex>
                    <Separator orientation="horizontal" size="4" />
                    <DataList.Root>
                        {Object.entries(jsonObj).map(([k, v]) => (
                            <DataList.Item key={k} className="py-1">
                                <DataList.Label className="text-zinc-400">
                                    {k}
                                </DataList.Label>
                                <DataList.Value className="text-zinc-100">
                                    {String(v)}
                                </DataList.Value>
                            </DataList.Item>
                        ))}
                    </DataList.Root>
                </Flex>
            ) : (
                <div
                    className={`px-3 py-2 rounded-2xl shadow max-w-[70%] text-sm leading-snug ${
                        sender === "user"
                            ? "bg-blue-500 text-white rounded-br-none"
                            : "bg-gray-200 text-gray-900 rounded-bl-none"
                    }`}
                >
                    {text}
                </div>
            )}
        </div>
    );
};

export default MessageBubble;
