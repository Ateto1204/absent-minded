import Task from "@/models/entities/task/Task";
import TaskData from "@/models/entities/task/TaskData";
import TaskStatus from "@/models/enums/TaskStatus";

interface TaskViewModel {
    tasks: Task[];
    addTask: (newTask: Task) => void;
    deleteTask: (taskId: string) => void;
    getTaskById: (id: string) => Task | undefined;
    updateTaskData: (taskId: string, newData: TaskData) => void;
    archiveTask: (taskId: string, status: TaskStatus) => void;
    resaveTask: (taskId: string) => void;
    loading: boolean;
    success: boolean;
    error: string | null;
}

export default TaskViewModel;
