interface TaskData {
    label: string;
    description: string;
    deadline: Date | null;
    start: Date | null;
    url: string;
    assignees: string[];
}

export default TaskData;
