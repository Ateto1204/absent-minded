"use client";

import { useEffect, useState } from "react";
import { useTaskContext } from "@/context/TaskContext";
import TaskStatus from "@/models/entities/task/TaskStatus";
import { Card, Flex, Text } from "@radix-ui/themes";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd";

const statusColumns: { title: string; status: TaskStatus }[] = [
    { title: "Active", status: TaskStatus.Active },
    { title: "Completed", status: TaskStatus.Completed },
    { title: "Deprecated", status: TaskStatus.Deprecated },
];

const Kanban = () => {
    const { tasks } = useTaskContext();
    const [boardTasks, setBoardTasks] = useState(tasks);

    // keep in sync if context tasks change
    useEffect(() => setBoardTasks(tasks), [tasks]);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;
        if (!destination) return; // dropped outside
        // If dropped into same column & index, do nothing
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return;

        setBoardTasks((prev) => {
            // remove from source list
            const updated = [...prev];
            const movedTask = updated.find((t) => t.id === draggableId);
            if (!movedTask) return prev;

            // update status
            movedTask.status = destination.droppableId as TaskStatus;

            // reorder within destination column
            const withoutMoved = updated.filter((t) => t.id !== draggableId);
            const destTasks = withoutMoved.filter(
                (t) => t.status === movedTask.status
            );
            destTasks.splice(destination.index, 0, movedTask);

            // merge back
            return [
                ...withoutMoved,
                ...destTasks.filter((t) => t.id === movedTask.id),
            ];
        });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Flex
                justify="center"
                align="start"
                gap="6"
                className="overflow-x-auto mt-10"
            >
                {statusColumns.map((col) => {
                    const columnTasks = boardTasks
                        .filter((t) => t.status === col.status)
                        .sort((a, b) => a.id.localeCompare(b.id));

                    return (
                        <Droppable
                            droppableId={col.status as string}
                            key={col.status}
                        >
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="bg-neutral-900 rounded-lg p-3 min-w-72"
                                >
                                    <Text size="3" weight="bold">
                                        {col.title}: {columnTasks.length}
                                    </Text>
                                    {columnTasks.map((task, index) => (
                                        <Draggable
                                            draggableId={task.id}
                                            index={index}
                                            key={task.id}
                                        >
                                            {(dragProvided, snapshot) => (
                                                <Card
                                                    ref={dragProvided.innerRef}
                                                    {...dragProvided.draggableProps}
                                                    {...dragProvided.dragHandleProps}
                                                    className={`p-2 my-3 ${
                                                        snapshot.isDragging
                                                            ? "bg-blue-700"
                                                            : "bg-neutral-800"
                                                    }`}
                                                >
                                                    <Text className="font-medium">
                                                        {task.data.label}
                                                    </Text>
                                                    {task.data.description && (
                                                        <Text
                                                            size="1"
                                                            color="gray"
                                                        >
                                                            {
                                                                task.data
                                                                    .description
                                                            }
                                                        </Text>
                                                    )}
                                                </Card>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    {columnTasks.length === 0 && (
                                        <Text size="1" color="gray">
                                            No tasks
                                        </Text>
                                    )}
                                </div>
                            )}
                        </Droppable>
                    );
                })}
            </Flex>
        </DragDropContext>
    );
};

export default Kanban;
