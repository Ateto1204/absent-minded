import TaskStatus from "@/models/enums/TaskStatus";
import { Flex } from "@radix-ui/themes";
import ArchivedTasksView from "@/components/archived/ArchivedTasksView";

const ArchivedTasksList = () => {
    return (
        <Flex
            direction="column"
            className="w-64 h-screen border-l border-zinc-700 bg-zinc-900 text-white py-5"
        >
            <ArchivedTasksView type={TaskStatus.Completed} />
            <ArchivedTasksView type={TaskStatus.Deprecated} />
        </Flex>
    );
};

export default ArchivedTasksList;
