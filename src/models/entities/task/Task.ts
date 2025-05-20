import TaskData from "./TaskData";

interface Task {
    id: string;
    data: TaskData;
    parent: string;
    project: string;
}

export default Task;
