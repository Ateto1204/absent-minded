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

const statusColumns: { title: string; status: TaskStatus; color: string }[] = [
    { title: "Active", status: TaskStatus.Active, color: "blue" },
    { title: "Completed", status: TaskStatus.Completed, color: "green" },
    { title: "Deprecated", status: TaskStatus.Deprecated, color: "red" },
];

const Kanban = () => {
    const { tasks, archiveTask, resaveTask } = useTaskContext();
    const [boardTasks, setBoardTasks] = useState(tasks);

    // keep in sync if context tasks change
    useEffect(() => setBoardTasks(tasks), [tasks]);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;

        // Same position
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return;

        const sourceStatus = source.droppableId as TaskStatus;
        const destStatus = destination.droppableId as TaskStatus;

        // ❌ Disallow Completed ↔ Deprecated direct moves
        const invalidPair =
            (sourceStatus === TaskStatus.Completed &&
                destStatus === TaskStatus.Deprecated) ||
            (sourceStatus === TaskStatus.Deprecated &&
                destStatus === TaskStatus.Completed);

        if (invalidPair) {
            alert(
                "Completed 與 Deprecated 無法直接轉換，請先拖回 Active 再移動。"
            );
            return;
        }

        // --- proceed with move ---
        const updated = [...boardTasks];
        const idx = updated.findIndex((t) => t.id === draggableId);
        if (idx === -1) return;

        const movedTask = { ...updated[idx], status: destStatus };
        updated.splice(idx, 1);

        // insert into dest column at correct index
        const destInsertIdx = updated.findIndex(
            (t, i) =>
                i >= idx && t.status === destStatus && --destination.index < 0
        );
        updated.splice(
            destInsertIdx === -1 ? updated.length : destInsertIdx,
            0,
            movedTask
        );

        setBoardTasks(updated);

        if (destStatus !== TaskStatus.Active) {
            archiveTask(draggableId, destStatus);
        } else {
            resaveTask(draggableId);
        }
    };

    return (
        <>
            <Text size="2" color="gray" align="center" className="mb-2">
                Tasks cannot be moved directly between Completed and Deprecated.
                Please move them to Active first.
            </Text>
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
                                        className="rounded-lg p-3 min-w-72 bg-neutral-900"
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
                                                        ref={
                                                            dragProvided.innerRef
                                                        }
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
                                                        {task.data
                                                            .description && (
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
        </>
    );
};

export default Kanban;
