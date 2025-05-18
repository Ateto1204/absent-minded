import TaskData from "./TaskData";

interface Task {
    id: string;
    data: TaskData;
    parent: string;
}

export default Task;
