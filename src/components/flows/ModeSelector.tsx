import ChatTaskGenerator from "@/components/chatRoom/ChatTaskGenerator";
import { useProjectContext } from "@/context/ProjectContext";
import ListMode from "@/models/enums/ListMode";
import { Flex, Select, Text } from "@radix-ui/themes";

const ModeSelector = ({
    mode,
    setMode,
}: {
    mode: ListMode;
    setMode: (mode: ListMode) => void;
}) => {
    const { currentProject } = useProjectContext();

    return (
        <div className="px-6 py-4 border-b border-zinc-800 text-sm font-semibold bg-zinc-900">
            <Flex justify="between">
                <Text>{currentProject?.id}</Text>
                <Flex gapX="4">
                    <ChatTaskGenerator />
                    <Select.Root
                        value={mode}
                        onValueChange={(m) => setMode(m as ListMode)}
                    >
                        <Select.Trigger>
                            <Text className="capitalize">{mode}</Text>
                        </Select.Trigger>
                        <Select.Content>
                            <Select.Item value={ListMode.Flow}>
                                Flow
                            </Select.Item>
                            <Select.Item value={ListMode.Gantt}>
                                Gantt chart
                            </Select.Item>
                            <Select.Item value={ListMode.Kanban}>
                                Kanban
                            </Select.Item>
                            <Select.Item value={ListMode.Pie}>
                                Pie chart
                            </Select.Item>
                        </Select.Content>
                    </Select.Root>
                </Flex>
            </Flex>
        </div>
    );
};

export default ModeSelector;
