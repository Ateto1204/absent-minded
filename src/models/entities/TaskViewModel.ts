import Task from "./Task";

interface TaskViewModel {
    tasks: Task[];
    addTask: (newTask: Task) => void;
    loading: boolean;
    success: boolean;
    error: string | null;
}

export default TaskViewModel;
