"use client";

import { useTaskContext } from "@/context/TaskContext";
import { useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/common/main.css";

const GanttChart = () => {
    const { tasks } = useTaskContext();

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

    const events = useMemo(() => {
        return tasks
            .filter((t) => t.data.start || t.data.deadline)
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
            />
        </div>
    );
};

export default GanttChart;
