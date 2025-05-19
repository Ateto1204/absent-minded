import TaskData from "./TaskData";

interface Task {
    id: string;
    data: TaskData;
    parent: string;
    children: string[];
}

export default Task;
