import Flow from "@/components/flows/Flow";
import ProjectMenu from "@/components/projectMenu/ProjectMenu";
import { Flex, Select, Text } from "@radix-ui/themes";
import { memo, useState } from "react";
import ArchivedTasksList from "@/components/archived/ArchivedTasksList";
import { useProjectContext } from "@/context/ProjectContext";
import GanttChart from "../GanttChart";

const FlowView = () => {
    const { currentProject } = useProjectContext();
    const [mode, setMode] = useState("flow");

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
                                </Select.Content>
                            </Select.Root>
                        </Flex>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 bg-zinc-950">
                        {mode === "flow" && <Flow />}
                        {mode === "gantt" && <GanttChart />}
                    </div>
                </div>
                <ArchivedTasksList />
            </Flex>
        </main>
    );
};

export default memo(FlowView);
