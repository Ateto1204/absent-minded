import TaskService from "@/models/services/TaskService";
import Task from "@/models/entities/Task";
import TaskViewModel from "@/models/entities/TaskViewModel";
import { useState } from "react";

const useTaskViewModel = (): TaskViewModel => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
