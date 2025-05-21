import { useTaskContext } from "@/context/TaskContext";
import TaskStatus from "@/models/entities/task/TaskStatus";
import { Flex, Select, Separator, Text } from "@radix-ui/themes";
import { useState } from "react";

const TaskStatusUpdateButton = ({ id }: { id: string }) => {
    const [taskStatus, setTaskStatus] = useState<TaskStatus>(
        TaskStatus.Completed
    );
    const { updateTaskStatus } = useTaskContext();

    const handleUpdate = () => {
        updateTaskStatus(id, taskStatus);
    };

    return (
        <Flex
            gapX="2"
            className="rounded bg-gray-700 px-2 cursor-pointer border border-gray-600"
            align="center"
        >
            <Text size="1" className="w-16 select-none" onClick={handleUpdate}>
                <Flex justify="center">{taskStatus}</Flex>
            </Text>
            <Separator orientation="vertical" size="1" />
            <Select.Root
                size="1"
                onValueChange={(value) => setTaskStatus(value as TaskStatus)}
            >
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
    );
};

export default TaskStatusUpdateButton;
