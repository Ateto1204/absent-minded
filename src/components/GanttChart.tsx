import { useTaskContext } from "@/context/TaskContext";
import { useMemo } from "react";

const GanttChart = () => {
    const { tasks } = useTaskContext();

    const ganttTasks = useMemo(() => {
        return tasks
            .filter((t) => t.data.start || t.data.deadline)
            .map((t) => {
                const start = t.data.start
                    ? new Date(t.data.start)
                    : new Date(t.data.deadline!);
                const deadline = t.data.deadline
                    ? new Date(t.data.deadline)
                    : new Date(t.data.start!);
                return {
                    id: t.id,
                    label: t.data.label || "Untitled",
                    start,
                    deadline,
                };
            })
            .sort((a, b) => a.start.getTime() - b.start.getTime());
    }, [tasks]);

    if (ganttTasks.length === 0) {
        return (
            <div className="text-center text-sm text-zinc-400">
                No tasks with both start and deadline
            </div>
        );
    }

    const chartStart = ganttTasks.reduce(
        (earliest, task) => (task.start < earliest ? task.start : earliest),
        ganttTasks[0].start
    );
    const chartEnd = ganttTasks.reduce(
        (latest, task) => (task.deadline > latest ? task.deadline : latest),
        ganttTasks[0].deadline
    );

    const numDays =
        Math.floor(
            (chartEnd.getTime() - chartStart.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1;

    const calendarDays = Array.from({ length: numDays }, (_, i) => {
        const date = new Date(chartStart);
        date.setDate(chartStart.getDate() + i);
        return date;
    });

    const colors = [
        "bg-blue-500",
        "bg-green-500",
        "bg-red-500",
        "bg-yellow-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-indigo-500",
    ];
    const taskColorMap = new Map<string, string>();
    let colorIndex = 0;

    return (
        <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date) => {
                const dayTasks = ganttTasks.filter((task) => {
                    const dayStart = new Date(date);
                    dayStart.setHours(0, 0, 0, 0);
                    const dayEnd = new Date(dayStart);
                    dayEnd.setDate(dayEnd.getDate() + 1);
                    return (
                        task.start.getTime() < dayEnd.getTime() &&
                        task.deadline.getTime() >= dayStart.getTime()
                    );
                });

                return (
                    <div
                        key={date.toDateString()}
                        className="min-h-[120px] bg-zinc-800 p-2 rounded"
                    >
                        <div className="text-xs text-zinc-400 mb-1">
                            {date.toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                            })}
                        </div>
                        <div className="space-y-1">
                            {dayTasks.map((task) => {
                                if (!taskColorMap.has(task.id)) {
                                    taskColorMap.set(
                                        task.id,
                                        colors[colorIndex % colors.length]
                                    );
                                    colorIndex++;
                                }
                                const color = taskColorMap.get(task.id)!;

                                return (
                                    <div
                                        key={task.id}
                                        className={`${color} text-white text-xs rounded px-1 py-0.5 truncate`}
                                    >
                                        {task.label}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default GanttChart;
