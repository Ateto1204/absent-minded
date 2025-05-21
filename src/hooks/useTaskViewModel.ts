import TaskService from "@/models/services/TaskService";
import Task from "@/models/entities/task/Task";
import TaskViewModel from "@/models/entities/viewModel/TaskViewModel";
import { useEffect, useState } from "react";
import TaskData from "@/models/entities/task/TaskData";
import { useProjectContext } from "@/context/ProjectContext";
import TaskStatus from "@/models/entities/task/TaskStatus";

const useTaskViewModel = (): TaskViewModel => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { currentProject, currentRoot, setupRootTask } = useProjectContext();

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            setSuccess(false);
            setError(null);
            try {
                const fetchedTasks = await TaskService.getTasks(currentProject);
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
    }, [currentProject]);

    const addTask = async (task: Task) => {
        setLoading(true);
        setSuccess(false);
        setError(null);
        try {
            setTasks((prev) => [...prev, task]);
            await TaskService.addTasks([task]);
            setSuccess(true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || "Failed to add task");
        } finally {
            setLoading(false);
        }
    };

    const findAllDescendants = (
        id: string,
        descendants: string[]
    ): string[] => {
        if (id === currentRoot) {
            const ids = tasks.map((t) => t.id);
            return ids;
        }
        descendants.push(id);
        tasks.forEach((t) => {
            if (t.parent === id) {
                findAllDescendants(t.id, descendants);
            }
        });
        return descendants;
    };

    const deleteTask = async (taskId: string) => {
        setLoading(true);
        setSuccess(false);
        setError(null);
        try {
            const descendantIds = findAllDescendants(taskId, []);
            await TaskService.removeTasks(descendantIds);
            setTasks((prevTasks) =>
                taskId === currentRoot
                    ? []
                    : prevTasks.filter(
                          (task) => !descendantIds.includes(task.id)
                      )
            );
            setupRootTask("");
            setSuccess(true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || "Failed to delete task(s)");
        } finally {
            setLoading(false);
        }
    };

    const getTaskById = (id: string): Task | undefined => {
        const task = tasks.find((t) => t.id === id);
        return task;
    };

    const updateTaskData = async (taskId: string, newData: TaskData) => {
        setLoading(true);
        setSuccess(false);
        setError(null);
        try {
            const updated = tasks.map((task) =>
                task.id === taskId
                    ? { ...task, data: { ...task.data, ...newData } }
                    : task
            );
            setTasks(updated);
            const taskToUpdate = updated.find((t) => t.id === taskId);
            if (taskToUpdate) {
                await TaskService.updateTask(taskToUpdate);
            }
            setSuccess(true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || "Failed to update task data");
        } finally {
            setLoading(false);
        }
    };

    const updateTaskStatus = async (taskId: string, status: TaskStatus) => {
        setLoading(true);
        setSuccess(false);
        setError(null);
        try {
            const descandents = findAllDescendants(taskId, []);
            const updatedTasks = tasks.map((task) => {
                return task.status === TaskStatus.Active &&
                    descandents.includes(task.id)
                    ? { ...task, status }
                    : task;
            });
            setTasks(updatedTasks);
            await TaskService.updateTasks(updatedTasks);
            setSuccess(true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || "Failed to update task status");
        } finally {
            setLoading(false);
        }
    };

    return {
        tasks,
        addTask,
        deleteTask,
        getTaskById,
        updateTaskData,
        updateTaskStatus,
        loading,
        success,
        error,
    };
};

export default useTaskViewModel;
