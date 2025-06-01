import TaskData from "./TaskData";
import TaskStatus from "@/models/enums/TaskStatus";

interface Task {
    id: string;
    data: TaskData;
    parent: string;
    project: string;
    ownerId: string;
    participants: string[];
    status: TaskStatus;
}

export default Task;
