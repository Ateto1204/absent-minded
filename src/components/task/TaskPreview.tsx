import TaskData from "@/models/entities/task/TaskData";
import { HoverCard } from "@radix-ui/themes";
import TaskPreviewContent from "./TaskPreviewContent";
import TaskNodeView from "./TaskNodeView";

const TaskPreview = ({ id, data }: { id: string; data: TaskData }) => {
    return (
        <HoverCard.Root>
            <TaskNodeView label={data.label} />
            <TaskPreviewContent id={id} data={data} />
        </HoverCard.Root>
    );
};

export default TaskPreview;
