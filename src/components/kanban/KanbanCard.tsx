import TaskStatus from "@/models/entities/task/TaskStatus";
import { Draggable } from "@hello-pangea/dnd";
import { Card, HoverCard, Text } from "@radix-ui/themes";
import TaskPreviewContent from "@/components/task/TaskPreviewContent";

type KanbanCardProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    task: any;
    index: number;
    onOpenDialog: (id: string) => void;
};

const KanbanCard = ({ task, index, onOpenDialog }: KanbanCardProps) => (
    <Draggable draggableId={task.id} index={index}>
        {(dragProvided, snapshot) => (
            <HoverCard.Root>
                <HoverCard.Trigger>
                    <Card
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (task.status === TaskStatus.Active)
                                onOpenDialog(task.id);
                        }}
                        className={`p-2 my-3 hover:shadow-md shadow-gray-700 transition-shadow ${
                            snapshot.isDragging
                                ? "bg-blue-700"
                                : "bg-neutral-800"
                        }`}
                    >
                        <Text className="font-medium">{task.data.label}</Text>
                        {task.data.description && (
                            <Text size="1" color="gray">
                                {task.data.description}
                            </Text>
                        )}
                    </Card>
                </HoverCard.Trigger>
                <TaskPreviewContent id={task.id} data={task.data} />
            </HoverCard.Root>
        )}
    </Draggable>
);

export default KanbanCard;
