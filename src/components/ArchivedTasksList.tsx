import { useTaskContext } from "@/context/TaskContext";
import Task from "@/models/entities/task/Task";
import TaskStatus from "@/models/entities/task/TaskStatus";
import { Flex, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";

const ArchivedTasksList = () => {
    const { tasks } = useTaskContext();
    const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
    const [deprecatedTasks, setDeprecatedTasks] = useState<Task[]>([]);

    useEffect(() => {
        const completed = tasks.filter(
            (t) => t.status === TaskStatus.Completed
        );
        setCompletedTasks(completed);
    }, [tasks]);

    useEffect(() => {
        const deprecated = tasks.filter(
            (t) => t.status === TaskStatus.Deprecated
        );
        setDeprecatedTasks(deprecated);
    }, [tasks]);

    return (
        <Flex
            direction="column"
            className="w-64 h-screen border-l border-zinc-700 bg-zinc-900 text-white py-5"
        >
            <div className="px-4 py-3 border-b border-zinc-700 font-bold text-sm sticky top-0 bg-zinc-900">
                Completed Tasks
            </div>
            <div className="flex-1 overflow-y-auto px-2 py-3 space-y-2 mb-5">
                {completedTasks.length > 0 ? (
                    completedTasks.map((t) => (
                        <div
                            key={t.id}
                            className="p-2 bg-zinc-800 rounded text-xs border border-zinc-600 break-words"
                        >
                            {t.id}
                        </div>
                    ))
                ) : (
                    <Flex justify="center" align="center" className="h-full">
                        <Text size="2" color="gray" className="select-none">
                            Nothing has done
                        </Text>
                    </Flex>
                )}
            </div>
            <div className="px-4 py-3 border-b border-zinc-700 font-bold text-sm sticky top-0 bg-zinc-900">
                Deprecated Tasks
            </div>
            <div className="flex-1 overflow-y-auto px-2 py-3 space-y-2">
                {deprecatedTasks.length > 0 ? (
                    deprecatedTasks.map((t) => (
                        <div
                            key={t.id}
                            className="p-2 bg-zinc-800 rounded text-xs border border-zinc-600 break-words"
                        >
                            {t.id}
                        </div>
                    ))
                ) : (
                    <Flex justify="center" align="center" className="h-full">
                        <Text size="2" color="gray" className="select-none">
                            Nothing be deprecated
                        </Text>
                    </Flex>
                )}
            </div>
        </Flex>
    );
};

export default ArchivedTasksList;
