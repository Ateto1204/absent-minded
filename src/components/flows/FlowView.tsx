import Flow from "@/components/flows/Flow";
import ProjectMenu from "@/components/ProjectMenu";
import { Flex } from "@radix-ui/themes";
import { memo, useEffect, useState } from "react";
import ArchivedTasksList from "@/components/archived/ArchivedTasksList";
import GanttChart from "@/components/GanttChart";
import Kanban from "@/components/kanban/Kanban";
import ListMode from "@/models/enums/ListMode";
import ModeSelector from "@/components/flows/ModeSelector";
import PieChartView from "@/components/flows/PieChartView";

const STORAGE_KEY_MODE = "aminded-mode";

const FlowView = () => {
    const [mode, setMode] = useState<ListMode>(() => {
        if (typeof window !== "undefined") {
            return (
                (localStorage.getItem(STORAGE_KEY_MODE) as ListMode) ||
                ListMode.Flow
            );
        }
        return ListMode.Flow;
    });

    useEffect(() => {
        localStorage.setItem("aminded-mode", mode);
    }, [mode]);

    return (
        <main className="w-screen h-screen bg-zinc-950 text-white">
            <Flex className="h-full">
                <ProjectMenu />
                <Flex direction="column" className="flex-1 overflow-hidden">
                    <ModeSelector mode={mode} setMode={setMode} />
                    <div className="flex-1 overflow-y-auto p-6 bg-zinc-950">
                        {mode === "flow" && <Flow />}
                        {mode === "gantt" && <GanttChart />}
                        {mode === "kanban" && <Kanban />}
                        {mode === "pie" && <PieChartView />}
                    </div>
                </Flex>
                <ArchivedTasksList />
            </Flex>
        </main>
    );
};

export default memo(FlowView);
