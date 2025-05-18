import Task from "./Task";

interface TaskViewModel {
    tasks: Task[];
    addTask: (newTask: Task) => void;
}

export default TaskViewModel;
