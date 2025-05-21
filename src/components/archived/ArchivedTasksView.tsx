import { useTaskContext } from "@/context/TaskContext";
import Task from "@/models/entities/task/Task";
import TaskStatus from "@/models/entities/task/TaskStatus";
import {
    Button,
    DropdownMenu,
    Flex,
    HoverCard,
    Text,
    Tooltip,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import TaskPreviewContent from "@/components/task/TaskPreviewContent";

const ArchivedTasksView = ({ type }: { type: TaskStatus }) => {
    const { deleteTask, tasks } = useTaskContext();
    const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);

    useEffect(() => {
        const completed = tasks.filter((t) => t.status === type);
        setArchivedTasks(completed);
    }, [tasks, type]);

    const handleDelete = (taskId: string) => {
        deleteTask(taskId);
    };

    return (
        <Flex direction="column" className="h-1/2">
            <div className="px-4 py-3 border-b border-zinc-700 font-bold text-sm sticky top-0 bg-zinc-900">
                {type === TaskStatus.Deprecated ? "Deprecated" : "Completed"}{" "}
                Tasks
            </div>
            <div className="flex-1 overflow-y-auto px-2 py-3 space-y-2">
                {archivedTasks.length > 0 ? (
                    archivedTasks.map((task) => (
                        <HoverCard.Root key={task.id}>
                            <div className="p-2 bg-zinc-800 rounded text-xs border border-zinc-600 break-words">
                                <Flex
                                    justify="between"
                                    align="center"
                                    className="px-2"
                                >
                                    <HoverCard.Trigger>
                                        <Text>{task.data.label}</Text>
                                    </HoverCard.Trigger>
                                    <DropdownMenu.Root>
                                        <DropdownMenu.Trigger>
                                            <Button size="1" color="gray">
                                                <Tooltip content="More option">
                                                    <Text size="1" color="gray">
                                                        ...
                                                    </Text>
                                                </Tooltip>
                                            </Button>
                                        </DropdownMenu.Trigger>
                                        <DropdownMenu.Content className="z-50">
                                            <DropdownMenu.Item>
                                                Re-save
                                            </DropdownMenu.Item>
                                            <DropdownMenu.Item
                                                onClick={() =>
                                                    handleDelete(task.id)
                                                }
                                            >
                                                Delete
                                            </DropdownMenu.Item>
                                        </DropdownMenu.Content>
                                    </DropdownMenu.Root>
                                </Flex>
                            </div>
                            <TaskPreviewContent id={task.id} data={task.data} />
                        </HoverCard.Root>
                    ))
                ) : (
                    <Flex justify="center" align="center" className="h-full">
                        <Text size="2" color="gray" className="select-none">
                            {type === TaskStatus.Deprecated
                                ? "Nothing be deprecated"
                                : "Nothing has done"}
                        </Text>
                    </Flex>
                )}
            </div>
        </Flex>
    );
};

export default ArchivedTasksView;
