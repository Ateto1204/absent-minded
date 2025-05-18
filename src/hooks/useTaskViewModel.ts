import TaskService from "@/models/services/TaskService";
import Task from "@/models/entities/Task";
import TaskViewModel from "@/models/entities/TaskViewModel";
import { useEffect, useState } from "react";

const useTaskViewModel = (): TaskViewModel => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
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
            await TaskService.addTask(task);
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
            const findAllDescendants = (
                id: string,
                descendants: string[]
            ): string[] => {
                descendants.push(id);
                tasks.forEach((t) => {
                    if (t.parent === id) {
                        findAllDescendants(t.id, descendants);
                    }
                });
                return descendants;
            };
            const descendantIds = findAllDescendants(taskId, []);
            setTasks((prevTasks) =>
                prevTasks.filter((task) => !descendantIds.includes(task.id))
            );
            await TaskService.removeTasks(descendantIds);
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
