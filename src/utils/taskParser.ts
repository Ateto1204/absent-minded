import { Edge, Node } from "@xyflow/react";
import Task from "@/models/entities/Task";
import { v4 as uuidv4 } from "uuid";

interface NodeTask extends Task {
    type: "task" | "placeholder";
}

export function tasksToNodes(tasks: NodeTask[]): Node[] {
    return tasks.map((task) => ({
        id: task.id,
        data: { label: task.data.label ?? "null" },
        type: task.type,
        position: { x: 0, y: 0 },
    }));
}

export function tasksToEdges(tasks: NodeTask[]): Edge[] {
    return tasks
        .filter((task) => task.id !== "root")
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

export function tasksToNodeTasks(tasks: Task[]): NodeTask[] {
    if (tasks.length === 0) {
        return [
            {
                id: "root",
                data: { label: "root" },
                parent: "",
                children: [],
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
        nodeTasks.push({
            id: uuidv4(),
            data: { label: "new task" },
            parent: task.id,
            children: [],
            type: "placeholder",
        });
    }
    return nodeTasks;
}
