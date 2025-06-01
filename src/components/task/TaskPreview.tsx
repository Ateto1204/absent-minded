import TaskData from "@/models/interfaces/task/TaskData";
import { HoverCard } from "@radix-ui/themes";
import TaskPreviewContent from "@/components/task/TaskPreviewContent";
import TaskNodeView from "@/components/task/TaskNodeView";

const TaskPreview = ({ id, data }: { id: string; data: TaskData }) => {
    return (
        <HoverCard.Root>
            <TaskNodeView label={data.label} />
            <TaskPreviewContent id={id} data={data} />
        </HoverCard.Root>
    );
};

export default TaskPreview;
