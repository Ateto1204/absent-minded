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

    const addTask = async (newTask: Task) => {
        setLoading(true);
        setSuccess(false);
        setError(null);
        try {
            await TaskService.addTask(newTask);
            setTasks((prevTasks) => [...prevTasks, newTask]);
            setSuccess(true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || "Failed to add task");
        } finally {
            setLoading(false);
        }
    };

    return { tasks, addTask, loading, success, error };
};

export default useTaskViewModel;
