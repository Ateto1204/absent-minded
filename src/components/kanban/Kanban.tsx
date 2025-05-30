"use client";

import { useEffect, useState } from "react";
import { useTaskContext } from "@/context/TaskContext";
import TaskStatus from "@/models/enums/TaskStatus";
import { Flex } from "@radix-ui/themes";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Dialog } from "@radix-ui/themes";
import TaskDialog from "@/components/dialogs/TaskDialog";
import KanbanColumn from "@/components/kanban/KanbanColumn";
import KanbanHint from "@/components/kanban/KanbanHint";
import StateBar from "@/components/flows/StateBar";

const statusColumns: { title: string; status: TaskStatus; color: string }[] = [
    { title: "Active", status: TaskStatus.Active, color: "blue" },
    { title: "Completed", status: TaskStatus.Completed, color: "green" },
    { title: "Deprecated", status: TaskStatus.Deprecated, color: "red" },
];

const Kanban = () => {
    const { tasks, archiveTask, resaveTask } = useTaskContext();
    const [boardTasks, setBoardTasks] = useState(tasks);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

    useEffect(() => setBoardTasks(tasks), [tasks]);

    const onOpenDialog = (id: string) => {
        setSelectedTaskId(id);
        setDialogOpen(true);
    };

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return;

        const sourceStatus = source.droppableId as TaskStatus;
        const destStatus = destination.droppableId as TaskStatus;

        const invalidPair =
            (sourceStatus === TaskStatus.Completed &&
                destStatus === TaskStatus.Deprecated) ||
            (sourceStatus === TaskStatus.Deprecated &&
                destStatus === TaskStatus.Completed);

        if (invalidPair) {
            alert(
                "Tasks cannot be moved directly between Completed and Deprecated. Please move them to Active first."
            );
            return;
        }

        const updated = [...boardTasks];
        const idx = updated.findIndex((t) => t.id === draggableId);
        if (idx === -1) return;

        const movedTask = { ...updated[idx], status: destStatus };
        updated.splice(idx, 1);

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
            <KanbanHint />
            <DragDropContext onDragEnd={onDragEnd}>
                <Flex
                    justify="center"
                    align="start"
                    gap="6"
                    className="overflow-x-auto mt-10"
                >
                    {statusColumns.map((col) => (
                        <KanbanColumn
                            key={col.status}
                            column={col}
                            tasks={boardTasks
                                .filter((t) => t.status === col.status)
                                .sort((a, b) => a.id.localeCompare(b.id))}
                            onOpenDialog={onOpenDialog}
                        />
                    ))}
                </Flex>
            </DragDropContext>
            {selectedTaskId && (
                <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                    <TaskDialog
                        key={selectedTaskId}
                        id={selectedTaskId}
                        data={tasks.find((t) => t.id === selectedTaskId)!.data}
                    />
                </Dialog.Root>
            )}
            <StateBar />
        </>
    );
};

export default Kanban;
