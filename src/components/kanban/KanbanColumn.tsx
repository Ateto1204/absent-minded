import TaskStatus from "@/models/entities/task/TaskStatus";
import { Droppable } from "@hello-pangea/dnd";
import { Text } from "@radix-ui/themes";
import KanbanCard from "@/components/kanban/KanbanCard";

type KanbanColumnProps = {
    column: { title: string; status: TaskStatus; color: string };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tasks: any[];
    onOpenDialog: (id: string) => void;
};

const KanbanColumn = ({ column, tasks, onOpenDialog }: KanbanColumnProps) => (
    <Droppable droppableId={column.status as string}>
        {(provided) => (
            <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="rounded-lg p-3 min-w-72 bg-neutral-900"
            >
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
                    <Text size="1" color="gray">
                        No tasks
                    </Text>
                )}
            </div>
        )}
    </Droppable>
);

export default KanbanColumn;
