import { useProjectContext } from "@/context/ProjectContext";
import { useTaskContext } from "@/context/TaskContext";
import Task from "@/models/interfaces/task/Task";
import TaskStatus from "@/models/enums/TaskStatus";
import { Button, DataList, Flex, Separator, Spinner } from "@radix-ui/themes";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Message from "@/models/interfaces/message/Message";
import MsgSender from "@/models/enums/MsgSender";
import GptAppliedStatus from "@/models/enums/GptAppliedStatus";

const MessageBubble = ({ text, sender }: Message) => {
    const { addTask, success, error, tasks } = useTaskContext();
    const { currentProject } = useProjectContext();
    const [appliedStatus, setAppliedStatus] = useState<GptAppliedStatus>(
        GptAppliedStatus.Apply
    );
    let jsonObj = null;

    if (
        sender === MsgSender.Gpt &&
        typeof text === "string" &&
        text.trim().startsWith("{") &&
        text.trim().endsWith("}")
    ) {
        try {
            const parsed = JSON.parse(text);

            if (!Object.prototype.hasOwnProperty.call(parsed, "error")) {
                const today = new Date();
                jsonObj = {
                    ...parsed,
                    start: today,
                    deadline: today,
                };
            }
        } catch {}
    }

    const handleApply = async () => {
        if (
            !currentProject ||
            (currentProject.rootTask.trim() === "" && tasks.length !== 0)
        ) {
            console.log("current root was null:", tasks);
            return;
        }
        const newTaskId = uuidv4();
        const task: Task = {
            id: newTaskId,
            data: jsonObj,
            parent: tasks.length === 0 ? "root" : currentProject.rootTask,
            project: currentProject.id,
            ownerId: currentProject.ownerId,
            status: TaskStatus.Active,
            participants: currentProject.participants,
        };
        // if (tasks.length === 0) setupRootTask(newTaskId);
        setAppliedStatus(GptAppliedStatus.Loading);
        addTask(task);
        if (success) {
            setAppliedStatus(GptAppliedStatus.Applied);
        } else if (error) {
            setAppliedStatus(GptAppliedStatus.Failed);
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
                            disabled={appliedStatus !== GptAppliedStatus.Apply}
                        >
                            {appliedStatus}
                        </Button>
                    </Flex>
                    <Separator orientation="horizontal" size="4" />
                    <DataList.Root>
                        {Object.entries(jsonObj).map(([k, v]) => {
                            const display =
                                v instanceof Date
                                    ? v.toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "2-digit",
                                          day: "2-digit",
                                      })
                                    : String(v);
                            return (
                                <DataList.Item key={k} className="py-1">
                                    <DataList.Label className="text-zinc-400">
                                        {k}
                                    </DataList.Label>
                                    <DataList.Value className="text-zinc-100">
                                        {display}
                                    </DataList.Value>
                                </DataList.Item>
                            );
                        })}
                    </DataList.Root>
                </Flex>
            ) : (
                <Flex
                    align="center"
                    gap="2"
                    className={`px-3 py-2 rounded-2xl shadow max-w-fit text-sm leading-snug whitespace-pre-line ${
                        sender === "user"
                            ? "bg-blue-500 text-white rounded-br-none"
                            : "bg-gray-200 text-gray-900 rounded-bl-none"
                    }`}
                >
                    {sender === MsgSender.Gpt &&
                        text.toLowerCase().startsWith("think") && <Spinner />}
                    {text}
                </Flex>
            )}
        </div>
    );
};

export default MessageBubble;
