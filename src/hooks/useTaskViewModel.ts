import TaskService from "@/models/services/TaskService";
import Task from "@/models/entities/Task";
import TaskViewModel from "@/models/entities/TaskViewModel";
import { useEffect, useState } from "react";

const useTaskViewModel = (): TaskViewModel => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            setSuccess(false);
            setError(null);
            try {
                const fetchedTasks = await TaskService.getTasks();
                setTasks(fetchedTasks);
                setSuccess(true);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                setError(err.message || "Failed to fetch tasks");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const addTask = async (task: Task) => {
        setLoading(true);
        setSuccess(false);
        setError(null);
        try {
            await TaskService.addTask(task);
            const newTasks = tasks.map((t) => {
                if (t.id === task.parent) {
                    const newTask = {
                        ...t,
                        children: [...t.children, task.id],
                    };
                    TaskService.updateTask(newTask);
                    return newTask;
                }
                return t;
            });
            setTasks([...newTasks, task]);
            setSuccess(true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || "Failed to add task");
        } finally {
            setLoading(false);
        }
    };

    const deleteTask = async (taskId: string) => {
        setLoading(true);
        setSuccess(false);
        setError(null);
        try {
            // Helper to recursively find all descendant task IDs
            const findAllDescendants = (
                id: string,
                allTasks: Task[]
            ): string[] => {
                const children = allTasks.filter((task) => task.parent === id);
                const descendantIds = children.flatMap((child) =>
                    findAllDescendants(child.id, allTasks)
                );
                return [id, ...descendantIds];
            };

            const descendantIds = findAllDescendants(taskId, tasks);

            // Update local storage via service (if needed, can loop through each)
            for (const id of descendantIds) {
                await TaskService.removeTask(id);
            }

            // Update local state
            setTasks((prevTasks) =>
                prevTasks.filter((task) => !descendantIds.includes(task.id))
            );

            setSuccess(true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || "Failed to delete task(s)");
        } finally {
            setLoading(false);
        }
    };

    return { tasks, addTask, deleteTask, loading, success, error };
};

export default useTaskViewModel;
