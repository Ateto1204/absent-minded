import { useState } from "react";
import { useProjectContext } from "@/context/ProjectContext";
import { Dialog, TextField, Button, Text, Flex } from "@radix-ui/themes";
import { useTaskContext } from "@/context/TaskContext";
import DeleteProjectDialog from "./DeleteProjectDialog";

function ProjectDialog({
    project,
    isActive,
    toggleProject,
}: {
    project: { id: string; name: string };
    isActive: boolean;
    toggleProject: () => void;
}) {
    const { updateProject, deleteProject, loading } = useProjectContext();
    const { deleteTask } = useTaskContext();
    const [name, setName] = useState(project.name);
    const handleSave = () => {
        updateProject({ id: project.id, name });
    };

    const handleDelete = () => {
        deleteProject(project.id);
        deleteTask("root");
    };

    return (
        <Dialog.Root>
            <li
                onClick={toggleProject}
                className={`truncate px-2 py-1 rounded cursor-pointer flex justify-between items-center hover:opacity-60 ${
                    isActive && "bg-blue-500 text-white font-semibold"
                }`}
            >
                <span>{project.name}</span>
                <Dialog.Trigger>
                    <button className="ml-2 text-sm px-2 py-0.5 rounded hover:bg-gray-300 bg-white border text-black">
                        ...
                    </button>
                </Dialog.Trigger>
            </li>
            <Dialog.Content>
                <Dialog.Title>
                    <Flex justify="between">
                        <Text>Edit Project</Text>
                        <Dialog.Close>
                            <Text size="4" className="cursor-pointer">
                                x
                            </Text>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Title>
                <Flex gapX="2" my="5">
                    <Text className="relative pt-0.5">name :</Text>
                    <TextField.Root
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Project name"
                    />
                </Flex>
                <div className="mt-4 flex gap-2">
                    <Dialog.Root>
                        <Dialog.Trigger>
                            <Button
                                color="red"
                                variant="solid"
                                loading={loading}
                            >
                                Delete
                            </Button>
                        </Dialog.Trigger>
                        <Dialog.Content>
                            <Dialog.Title />
                            <DeleteProjectTriggerButton
                                id={project.id}
                                handleDelete={handleDelete}
                            />
                        </Dialog.Content>
                    </Dialog.Root>
                    <Button
                        color="blue"
                        variant="solid"
                        onClick={handleSave}
                        loading={loading}
                    >
                        Save
                    </Button>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
}

const DeleteProjectTriggerButton = ({
    id,
    handleDelete,
}: {
    id: string;
    handleDelete: () => void;
}) => {
    return <DeleteProjectDialog id={id} handleDelete={handleDelete} />;
};

export default ProjectDialog;
