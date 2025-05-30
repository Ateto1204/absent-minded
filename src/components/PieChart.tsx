"use clients";

import React from "react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Task from "@/models/interfaces/task/Task";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const statusColors: Record<string, string> = {
    active: "#38bdf8", // 藍
    completed: "#4ade80", // 綠
    deprecated: "#f87171", // 紅
};

const PieChart = ({ tasks }: { tasks: Task[] }) => {
    const statusCount = { active: 0, completed: 0, deprecated: 0 };
    tasks.forEach((t) => {
        if (statusCount.hasOwnProperty(t.status)) statusCount[t.status]++;
    });

    const series = [
        statusCount.active,
        statusCount.completed,
        statusCount.deprecated,
    ];
    const labels = ["Active", "Completed", "Deprecated"];
    const colors = [
        statusColors.active,
        statusColors.completed,
        statusColors.deprecated,
    ];

    const [showChart, setShowChart] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setShowChart(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (!showChart) {
        return (
            <div className="w-full h-60 flex items-center justify-center">
                <span className="text-zinc-400 text-lg animate-pulse">
                    Loading...
                </span>
            </div>
        );
    }
    return (
        <ApexChart
            options={{
                chart: { type: "pie" },
                labels,
                legend: { position: "bottom" },
                colors,
            }}
            series={series}
            type="pie"
            width={320}
        />
    );
};

export default PieChart;
