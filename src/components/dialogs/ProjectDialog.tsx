import { useState } from "react";
import { useProjectContext } from "@/context/ProjectContext";
import {
    Dialog,
    TextField,
    Button,
    Text,
    Flex,
    AlertDialog,
} from "@radix-ui/themes";

import DeleteDialog from "./DeleteDialog";

function ProjectDialog({
    project,
    isActive,
    toggleProject,
}: {
    project: { id: string; name: string };
    isActive: boolean;
    toggleProject: () => void;
}) {
    const { updateProjectName, loading } = useProjectContext();
    const [name, setName] = useState(project.name);
    const handleSave = () => {
        updateProjectName(project.id, name);
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
                    <button className="ml-2 text-md px-2 py-0.5 rounded text-white font-bold hover:bg-blue-700">
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
                    <AlertDialog.Root>
                        <AlertDialog.Trigger>
                            <Button
                                color="red"
                                variant="solid"
                                loading={loading}
                            >
                                Delete
                            </Button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Content>
                            <AlertDialog.Title />
                            <DeleteDialog id={project.id} type="project" />
                        </AlertDialog.Content>
                    </AlertDialog.Root>
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

export default ProjectDialog;
