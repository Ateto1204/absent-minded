import TaskStatus from "@/models/enums/TaskStatus";
import { Draggable } from "@hello-pangea/dnd";
import { Card, Flex, HoverCard, Text } from "@radix-ui/themes";
import TaskPreviewContent from "@/components/task/TaskPreviewContent";
import Task from "@/models/interfaces/task/Task";
import TaskDeleteDialog from "@/components/buttons/TaskDeleteDialog";

type KanbanCardProps = {
    task: Task;
    index: number;
    onOpenDialog: (id: string) => void;
};

const KanbanCard = ({ task, index, onOpenDialog }: KanbanCardProps) => {
    return (
        <div className="relative">
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
                                className={`p-2 hover:shadow-md shadow-gray-700 transition-shadow ${
                                    snapshot.isDragging
                                        ? "bg-blue-700"
                                        : "bg-neutral-800"
                                }`}
                            >
                                <Flex direction="column" gap="3">
                                    <Flex gap="2" align="end">
                                        <Text className="font-medium">
                                            {task.data.label}
                                        </Text>
                                        {task.data.deadline && (
                                            <Text size="1" color="gray">
                                                end at:{" "}
                                                {new Date(
                                                    task.data.deadline
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </Text>
                                        )}
                                    </Flex>
                                    {task.data.description && (
                                        <Text size="1" color="gray">
                                            {task.data.description}
                                        </Text>
                                    )}
                                </Flex>
                            </Card>
                        </HoverCard.Trigger>
                        <TaskPreviewContent id={task.id} data={task.data} />
                    </HoverCard.Root>
                )}
            </Draggable>
            <TaskDeleteDialog taskId={task.id} />
        </div>
    );
};

export default KanbanCard;
