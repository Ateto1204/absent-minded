import TaskData from "./TaskData";

interface Task {
    id: string;
    data: TaskData;
    parent: string;
    project: string;
    status: "active" | "completed" | "deprecated";
}

export default Task;
