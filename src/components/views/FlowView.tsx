import Flow from "@/components/flows/Flow";
import ProjectMenu from "@/components/projectMenu/ProjectMenu";
import { Flex, Select, Text } from "@radix-ui/themes";
import { memo, useEffect, useState } from "react";
import ArchivedTasksList from "@/components/archived/ArchivedTasksList";
import { useProjectContext } from "@/context/ProjectContext";
import GanttChart from "@/components/GanttChart";
import Kanban from "@/components/kanban/Kanban";

const FlowView = () => {
    const { currentProject } = useProjectContext();
    const [mode, setMode] = useState(() => {
        if (typeof window !== "undefined") {
            return (localStorage.getItem("aminded-mode") as string) || "flow";
        }
        return "flow";
    });

    useEffect(() => {
        localStorage.setItem("aminded-mode", mode);
    }, [mode]);

    return (
        <main className="w-screen h-screen bg-zinc-950 text-white">
            <Flex className="h-full">
                <ProjectMenu />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="px-6 py-4 border-b border-zinc-800 text-sm font-semibold bg-zinc-900">
                        <Flex justify="between">
                            <Text>{currentProject}</Text>
                            <Select.Root value={mode} onValueChange={setMode}>
                                <Select.Trigger>
                                    <Text className="capitalize">{mode}</Text>
                                </Select.Trigger>
                                <Select.Content>
                                    <Select.Item value="flow">Flow</Select.Item>
                                    <Select.Item value="gantt">
                                        Gantt chart
                                    </Select.Item>
                                    <Select.Item value="kanban">
                                        Kanban
                                    </Select.Item>
                                </Select.Content>
                            </Select.Root>
                        </Flex>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 bg-zinc-950">
                        {mode === "flow" && <Flow />}
                        {mode === "gantt" && <GanttChart />}
                        {mode === "kanban" && <Kanban />}
                    </div>
                </div>
                <ArchivedTasksList />
            </Flex>
        </main>
    );
};

export default memo(FlowView);
