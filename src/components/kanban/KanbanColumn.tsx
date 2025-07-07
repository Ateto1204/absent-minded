import TaskStatus from "@/models/enums/TaskStatus";
import { Droppable } from "@hello-pangea/dnd";
import { Button, Flex, Text } from "@radix-ui/themes";
import KanbanCard from "@/components/kanban/KanbanCard";
import Task from "@/models/interfaces/task/Task";
import { useTaskContext } from "@/context/TaskContext";
import { v4 as uuidv4 } from "uuid";
import { useProjectContext } from "@/context/ProjectContext";

type KanbanColumnProps = {
    column: { title: string; status: TaskStatus; color: string };
    tasks: Task[];
    onOpenDialog: (id: string) => void;
};

const KanbanColumn = ({ column, tasks, onOpenDialog }: KanbanColumnProps) => {
    const { tasks: projectTasks, addTask } = useTaskContext();
    const { currentProject, setupRootTask } = useProjectContext();

    const handleAddTask = () => {
        if (!currentProject) return;
        const id = uuidv4();
        if (projectTasks.length === 0) setupRootTask(id);
        const task: Task = {
            id,
            data: {
                label: id === "root" ? "root" : "new task",
                description: "",
                start: null,
                deadline: null,
                url: "",
                assignees: [],
            },
            parent:
                projectTasks.length === 0 ? "root" : currentProject.rootTask,
            project: currentProject.id,
            ownerId: currentProject.ownerId,
            status: TaskStatus.Active,
        };
        addTask(task);
    };

    return (
        <Droppable droppableId={column.status as string}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="rounded-lg p-3 w-80 bg-neutral-900"
                >
                    <Flex direction="column" gap="4">
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
                        <Button
                            disabled={column.status !== TaskStatus.Active}
                            color="gray"
                            variant="surface"
                            onClick={handleAddTask}
                        >
                            + new task
                        </Button>
                    </Flex>
                </div>
            )}
        </Droppable>
    );
};

export default KanbanColumn;
