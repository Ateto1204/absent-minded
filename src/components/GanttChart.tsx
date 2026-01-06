"use client";

import { useTaskContext } from "@/context/TaskContext";
import { useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "@fullcalendar/common/main.css";
import { Dialog, HoverCard } from "@radix-ui/themes";
import TaskDialog from "@/components/dialogs/TaskDialog";
import TaskStatus from "@/models/enums/TaskStatus";
import TaskPreviewContent from "@/components/task/TaskPreviewContent";
import StateBar from "@/components/flows/StateBar";
import { useProjectContext } from "@/context/ProjectContext";
import Task from "@/models/interfaces/task/Task";
import { v4 as uuidv4 } from "uuid";

const GanttChart = () => {
    const { tasks, addTask } = useTaskContext();
    const { currentProject, setupRootTask } = useProjectContext();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEventClick = (info: any) => {
        setSelectedTaskId(info.event.id);
        setDialogOpen(true);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDateClick = async (info: any) => {
        if (info.jsEvent.detail === 2) {
            if (!currentProject) return;
            
            const newTaskDate = new Date(info.dateStr);
            const newTaskId = uuidv4();
            const task: Task = {
                id: newTaskId,
                data: {
                    label: "new task",
                    description: "",
                    start: newTaskDate,
                    deadline: newTaskDate,
                    url: "",
                    assignees: [],
                },
                parent: tasks.length === 0 ? "root" : currentProject.rootTask,
                project: currentProject.id,
                ownerId: currentProject.ownerId,
                status: TaskStatus.Active,
            };
            
            if (tasks.length === 0) setupRootTask(newTaskId);
            await addTask(task);
            
            setSelectedTaskId(newTaskId);
            setDialogOpen(true);
        }
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
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                height="100%"
                events={events}
                eventClick={handleEventClick}
                eventContent={renderEventContent}
                dateClick={handleDateClick}
                viewClassNames={"rounded-lg overflow-hidden"}
            />
            {selectedTaskId && (
                <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                    <TaskDialog
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
