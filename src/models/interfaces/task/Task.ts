import TaskData from "./TaskData";
import TaskStatus from "@/models/enums/TaskStatus";

interface Task {
    id: string;
    data: TaskData;
    parent: string;
    project: string;
    userId: string;
    status: TaskStatus;
}

export default Task;
