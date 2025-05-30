import { useTaskContext } from "@/context/TaskContext";
import { Flex, Text } from "@radix-ui/themes";
import PieChart from "@/components/PieChart";
import StateBar from "@/components/flows/StateBar";

const PieChartView = () => {
    const { tasks, loading } = useTaskContext();

    return (
        <>
            <Flex
                direction="column"
                align="center"
                justify="center"
                className="h-full"
                gap="6"
            >
                <Text size="4" weight="bold">
                    Pie chart for tasks status
                </Text>
                {!loading && <PieChart tasks={tasks} />}
            </Flex>
            <StateBar />
        </>
    );
};

export default PieChartView;
