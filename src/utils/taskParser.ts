import { Edge, Node } from "@xyflow/react";
import Task from "@/models/interfaces/task/Task";
import { v4 as uuidv4 } from "uuid";
import TaskStatus from "@/models/enums/TaskStatus";

interface NodeTask extends Task {
    type: "task" | "placeholder";
}

export function tasksToNodes(tasks: NodeTask[]): Node[] {
    return tasks.map((task) => ({
        id: task.id,
        data: {
            label: task.data.label,
            description: task.data.description,
            start: task.data.start,
            deadline: task.data.deadline,
        },
        type: task.type,
        position: { x: 0, y: 0 },
    }));
}

export function tasksToEdges(tasks: NodeTask[], root: string): Edge[] {
    return tasks
        .filter((task) => task.id !== "root" && task.id !== root)
        .map((task) => ({
            id: `e-${task.parent}-${task.id}`,
            source: task.parent,
            target: task.id,
            type: "default",
            animated: task.type === "placeholder",
            deletable: false,
            selectable: false,
        }));
}

export function tasksToNodeTasks(
    tasks: Task[],
    project: string,
    user: string
): NodeTask[] {
    const avtiveTasks = tasks.filter((t) => t.status === TaskStatus.Active);
    if (avtiveTasks.length === 0) {
        return [
            {
                id: "root",
                data: {
                    label: "root",
                    description: "",
                    start: null,
                    deadline: null,
                },
                parent: "",
                project,
                status: TaskStatus.Active,
                type: "placeholder",
                user,
            },
        ];
    }
    const nodeTasks: NodeTask[] = [];
    for (const task of avtiveTasks) {
        nodeTasks.push({
            ...task,
            type: "task",
        });
    }
    for (const task of avtiveTasks) {
        nodeTasks.push({
            id: uuidv4(),
            data: {
                label: "new task",
                description: "",
                start: null,
                deadline: null,
            },
            parent: task.id,
            project,
            status: TaskStatus.Active,
            type: "placeholder",
            user,
        });
    }
    return nodeTasks;
}
