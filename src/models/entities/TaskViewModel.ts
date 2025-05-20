import Task from "./Task";
import TaskData from "./TaskData";

interface TaskViewModel {
    tasks: Task[];
    addTask: (newTask: Task) => void;
    deleteTask: (taskId: string) => void;
    getTaskById: (id: string) => Task | undefined;
    updateTaskData: (taskId: string, newData: TaskData) => void;
    loading: boolean;
    success: boolean;
    error: string | null;
}

export default TaskViewModel;
