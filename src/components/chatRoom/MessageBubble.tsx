import { useProjectContext } from "@/context/ProjectContext";
import { useTaskContext } from "@/context/TaskContext";
import Task from "@/models/interfaces/task/Task";
import TaskStatus from "@/models/enums/TaskStatus";
import { Button, DataList, Flex, Separator, Spinner } from "@radix-ui/themes";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUserContext } from "@/context/UserContext";
import Message from "@/models/interfaces/message/Message";
import MsgSender from "@/models/enums/MsgSender";
import GptAppliedStatus from "@/models/enums/GptAppliedStatus";

const MessageBubble = ({ text, sender }: Message) => {
    const { addTask, success, error } = useTaskContext();
    const { currentProject, currentRoot } = useProjectContext();
    const [appliedStatus, setAppliedStatus] = useState<GptAppliedStatus>(
        GptAppliedStatus.Apply
    );
    const { userEmail } = useUserContext();

    let jsonObj = null;

    if (
        sender === MsgSender.Gpt &&
        typeof text === "string" &&
        text.trim().startsWith("{") &&
        text.trim().endsWith("}")
    ) {
        try {
            jsonObj = JSON.parse(text);
            const today = new Date().toISOString().split("T")[0];
            jsonObj = {
                ...jsonObj,
                start: today,
                deadline: today,
            };
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
            user: userEmail,
            status: TaskStatus.Active,
        };
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
                <Flex
                    align="center"
                    gap="2"
                    className={`px-3 py-2 rounded-2xl shadow max-w-[70%] text-sm leading-snug ${
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
