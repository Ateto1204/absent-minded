import { Edge, Node } from "@xyflow/react";
import Task from "@/models/entities/task/Task";
import { v4 as uuidv4 } from "uuid";

interface NodeTask extends Task {
    type: "task" | "placeholder";
}

export function tasksToNodes(tasks: NodeTask[]): Node[] {
    return tasks.map((task) => ({
        id: task.id,
        data: {
            label: task.data.label,
            description: task.data.description,
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

export function tasksToNodeTasks(tasks: Task[], project: string): NodeTask[] {
    if (tasks.length === 0) {
        return [
            {
                id: "root",
                data: { label: "root", description: "", deadline: null },
                parent: "",
                project,
                type: "placeholder",
            },
        ];
    }
    const nodeTasks: NodeTask[] = [];
    for (const task of tasks) {
        nodeTasks.push({
            ...task,
            type: "task",
        });
    }
    for (const task of tasks) {
        nodeTasks.push({
            id: uuidv4(),
            data: { label: "new task", description: "", deadline: null },
            parent: task.id,
            project,
            type: "placeholder",
        });
    }
    return nodeTasks;
}
