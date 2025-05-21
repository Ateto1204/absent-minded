import TaskData from "./TaskData";
import TaskStatus from "./TaskStatus";

interface Task {
    id: string;
    data: TaskData;
    parent: string;
    project: string;
    status: TaskStatus;
}

export default Task;
