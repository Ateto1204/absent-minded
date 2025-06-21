import TaskStatus from "@/models/enums/TaskStatus";
import { Draggable } from "@hello-pangea/dnd";
import {
    AlertDialog,
    Card,
    Flex,
    HoverCard,
    Text,
    Tooltip,
} from "@radix-ui/themes";
import TaskPreviewContent from "@/components/task/TaskPreviewContent";
import Task from "@/models/interfaces/task/Task";
import { TiDelete } from "react-icons/ti";
import DeleteDialog from "@/components/dialogs/DeleteDialog";
import { useTaskContext } from "@/context/TaskContext";

type KanbanCardProps = {
    task: Task;
    index: number;
    onOpenDialog: (id: string) => void;
};

const KanbanCard = ({ task, index, onOpenDialog }: KanbanCardProps) => {
    const { loading } = useTaskContext();

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
                                <Flex direction="column" gap="2">
                                    <Text className="font-medium">
                                        {task.data.label}
                                    </Text>
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
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="absolute -top-1.5 -right-1.5 cursor-pointer rounded-full hover:opacity-70 p-0"
                        disabled={loading}
                    >
                        <Tooltip content="Remove task">
                            <TiDelete color="gray" />
                        </Tooltip>
                    </button>
                </AlertDialog.Trigger>
                <DeleteDialog id={task.id} type="task" />
            </AlertDialog.Root>
        </div>
    );
};

export default KanbanCard;
