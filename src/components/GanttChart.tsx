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
import StateBar from "@/components/flows/StateBar";

const GanttChart = () => {
    const { tasks } = useTaskContext();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

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
                <HoverCard.Trigger className="hover:shadow-lg shadow-gray-600 transition-shadow">
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
        const colors = [
            "#F87171", // red
            "#60A5FA", // blue
            "#34D399", // green
            "#FBBF24", // yellow
            "#A78BFA", // purple
            "#F472B6", // pink
        ];
        const colorMap = new Map<string, string>();
        let colorIndex = 0;

        const activeTasks = tasks.filter(
            (t) =>
                t.status === TaskStatus.Active &&
                (t.data.start || t.data.deadline)
        );

        return activeTasks.map((t) => {
            // assign color sequentially to ensure uniqueness while palette lasts
            if (!colorMap.has(t.id)) {
                colorMap.set(t.id, colors[colorIndex % colors.length]);
                colorIndex++;
            }
            const color = colorMap.get(t.id)!;

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
                color,
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
                viewClassNames={"rounded-lg overflow-hidden"}
            />
            {selectedTaskId && (
                <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                    <TaskDialog
                        key={selectedTaskId}
                        id={selectedTaskId!}
                        data={tasks.find((t) => t.id === selectedTaskId)!.data}
                    />
                </Dialog.Root>
            )}
            <StateBar />
        </div>
    );
};

export default GanttChart;
