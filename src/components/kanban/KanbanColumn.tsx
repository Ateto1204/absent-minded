import TaskStatus from "@/models/enums/TaskStatus";
import { Droppable } from "@hello-pangea/dnd";
import { Flex, Text } from "@radix-ui/themes";
import KanbanCard from "@/components/kanban/KanbanCard";
import Task from "@/models/interfaces/task/Task";

type KanbanColumnProps = {
    column: { title: string; status: TaskStatus; color: string };
    tasks: Task[];
    onOpenDialog: (id: string) => void;
};

const KanbanColumn = ({ column, tasks, onOpenDialog }: KanbanColumnProps) => (
    <Droppable droppableId={column.status as string}>
        {(provided) => (
            <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="rounded-lg p-3 w-80 bg-neutral-900"
            >
                <Flex direction="column" gap="3">
                    <Text size="3" weight="bold">
                        {column.title}: {tasks.length}
                    </Text>
                    {tasks.map((task, idx) => (
                        <KanbanCard
                            key={task.id}
                            task={task}
                            index={idx}
                            onOpenDialog={onOpenDialog}
                        />
                    ))}
                    {provided.placeholder}
                    {tasks.length === 0 && (
                        <Flex justify="center" my="3">
                            <Text size="1" color="gray">
                                No tasks
                            </Text>
                        </Flex>
                    )}
                </Flex>
            </div>
        )}
    </Droppable>
);

export default KanbanColumn;
