import TaskService from "@/models/services/TaskService";
import Task from "@/models/interfaces/task/Task";
import TaskViewModel from "@/models/interfaces/viewModel/TaskViewModel";
import { useCallback, useEffect, useState } from "react";
import TaskData from "@/models/interfaces/task/TaskData";
import { useProjectContext } from "@/context/ProjectContext";
import TaskStatus from "@/models/enums/TaskStatus";
import { useUserContext } from "@/context/UserContext";

const useTaskViewModel = (): TaskViewModel => {
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { currentProject, setupRootTask } = useProjectContext();
    const { accessToken, serverUri } = useUserContext();

    const fetchTasksByUser = useCallback(async () => {
        if (!accessToken) return;
        try {
            const fetchedTasks = await TaskService.getTasksByUser(
                accessToken,
                serverUri
            );
            setAllTasks(fetchedTasks);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || "Failed to fetch tasks");
        }
    }, [accessToken, serverUri]);

    const fetchTasksByProject = useCallback(async () => {
        setLoading(true);
        setSuccess(false);
        setError(null);
        try {
            if (!accessToken || !currentProject) return;
            const fetchedTasks = await TaskService.getTasksByProject(
                currentProject.id,
                accessToken,
                serverUri
            );
            setTasks(fetchedTasks);
            setSuccess(true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || "Failed to fetch tasks");
        } finally {
            setLoading(false);
        }
    }, [currentProject, accessToken, serverUri]);

    const addTask = useCallback(
        async (task: Task) => {
            setLoading(true);
            setSuccess(false);
            setError(null);
            try {
                setTasks((prev) => [...prev, task]);
                await TaskService.addTasks([task], accessToken, serverUri);
                setSuccess(true);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                setError(err.message || "Failed to add task");
            } finally {
                setLoading(false);
            }
        },
        [accessToken, serverUri]
    );

    const findAllDescendants = useCallback(
        (id: string, descendants: string[]): string[] => {
            if (id === currentProject?.rootTask) {
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
        },
        [currentProject, tasks]
    );

    const deleteTask = useCallback(
        async (taskId: string) => {
            setLoading(true);
            setSuccess(false);
            setError(null);
            try {
                const descendantIds = findAllDescendants(taskId, []);
                await TaskService.removeTasks(
                    descendantIds,
                    accessToken,
                    serverUri
                );
                setTasks((prevTasks) =>
                    taskId === currentProject?.rootTask
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
        },
        [
            currentProject,
            accessToken,
            serverUri,
            findAllDescendants,
            setupRootTask,
        ]
    );

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
                await TaskService.updateTasks(
                    [taskToUpdate],
                    accessToken,
                    serverUri
                );
            }
            setSuccess(true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || "Failed to update task data");
        } finally {
            setLoading(false);
        }
    };

    const archiveTask = useCallback(
        async (taskId: string, status: TaskStatus) => {
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
                await TaskService.updateTasks(
                    updatedTasks,
                    accessToken,
                    serverUri
                );
                setTasks(updatedTasks);
                setSuccess(true);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                setError(err.message || "Failed to update task status");
            } finally {
                setLoading(false);
            }
        },
        [findAllDescendants, tasks, accessToken, serverUri]
    );

    const resaveTask = useCallback(
        async (taskId: string) => {
            setLoading(true);
            setSuccess(false);
            setError(null);
            try {
                const findParents = (id: string, parents: string[]) => {
                    const task = tasks.find((t) => t.id === id);
                    if (!task) return parents;
                    if (task.status === TaskStatus.Active) return parents;
                    return findParents(task.parent, [...parents, id]);
                };
                const parents = findParents(taskId, []);
                const updatedTasks = tasks.map((task) =>
                    parents.includes(task.id)
                        ? { ...task, status: TaskStatus.Active }
                        : task
                );
                await TaskService.updateTasks(
                    updatedTasks,
                    accessToken,
                    serverUri
                );
                setTasks(updatedTasks);
                setSuccess(true);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                setError(err.message || "Failed to update task status");
            } finally {
                setLoading(false);
            }
        },
        [tasks, accessToken, serverUri]
    );

    useEffect(() => {
        fetchTasksByUser();
    }, [fetchTasksByUser, addTask, deleteTask, resaveTask, archiveTask]);

    useEffect(() => {
        fetchTasksByProject();
    }, [fetchTasksByProject]);

    return {
        allTasks,
        tasks,
        addTask,
        deleteTask,
        getTaskById,
        updateTaskData,
        archiveTask,
        resaveTask,
        loading,
        success,
        error,
    };
};

export default useTaskViewModel;
