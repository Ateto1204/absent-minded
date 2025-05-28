"use client";

import { useTaskContext } from "@/context/TaskContext";
import { useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/common/main.css";
import { Dialog, HoverCard } from "@radix-ui/themes";
import TaskDialog from "@/components/dialogs/TaskDialog";
import TaskStatus from "@/models/entities/task/TaskStatus";
import TaskPreviewContent from "@/components/task/TaskPreviewContent";

const GanttChart = () => {
    const { tasks } = useTaskContext();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

    const getColorFromId = (id: string) => {
        const colors = [
            "#F87171",
            "#60A5FA",
            "#34D399",
            "#FBBF24",
            "#A78BFA",
            "#F472B6",
        ];
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            hash = id.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % colors.length;
        return colors[index];
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEventClick = (info: any) => {
        setSelectedTaskId(info.event.id);
        setDialogOpen(true);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderEventContent = (arg: any) => {
        const task = tasks.find((t) => t.id === arg.event.id);
        if (!task) return arg.event.title;
        return (
            <HoverCard.Root>
                <HoverCard.Trigger>
                    <div
                        className="truncate px-1 py-px rounded text-white"
                        style={{ backgroundColor: arg.event.backgroundColor }}
                    >
                        {arg.event.title}
                    </div>
                </HoverCard.Trigger>
                <TaskPreviewContent id={task.id} data={task.data} />
            </HoverCard.Root>
        );
    };

    const events = useMemo(() => {
        return tasks
            .filter(
                (t) =>
                    t.status === TaskStatus.Active &&
                    (t.data.start || t.data.deadline)
            )
            .map((t) => {
                const start = t.data.start
                    ? new Date(t.data.start)
                    : new Date(t.data.deadline!);
                const end = t.data.deadline
                    ? new Date(t.data.deadline)
                    : new Date(t.data.start!);
                end.setDate(end.getDate() + 1);

                return {
                    id: t.id,
                    title: t.data.label || "Untitled",
                    start: start.toISOString(),
                    end: end.toISOString(),
                    allDay: true,
                    color: getColorFromId(t.id),
                };
            });
    }, [tasks]);

    return (
        <div className="h-[700px]">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                height="100%"
                events={events}
                eventClick={handleEventClick}
                eventContent={renderEventContent}
            />
            {selectedTaskId && (
                <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                    <TaskDialog
                        id={selectedTaskId!}
                        data={tasks.find((t) => t.id === selectedTaskId)!.data}
                    />
                </Dialog.Root>
            )}
        </div>
    );
};

export default GanttChart;
