"use client";

import { useProjectContext } from "@/context/ProjectContext";
import { Dialog, TextField, Button, Text, Flex } from "@radix-ui/themes";
import { v4 as uuidv4 } from "uuid";

interface ProjectDialogProps {
    project: { id: string; name: string };
    isActive: boolean;
    toggleProject: () => void;
}

function ProjectDialog({
    project,
    isActive,
    toggleProject,
}: ProjectDialogProps) {
    return (
        <Dialog.Root>
            <li
                onClick={toggleProject}
                className={`truncate px-2 py-1 rounded cursor-pointer flex justify-between items-center ${
                    isActive
                        ? "bg-blue-500 text-white font-semibold"
                        : "hover:bg-gray-200 text-gray-800"
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
                        defaultValue={project.name}
                        placeholder="Project name"
                    />
                </Flex>
                <div className="mt-4 flex gap-2">
                    <Button color="red" variant="solid">
                        Delete
                    </Button>
                    <Button color="blue" variant="solid">
                        Save
                    </Button>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
}

function ProjectMenu() {
    const { projects, addProject, toggleProject, currentProject } =
        useProjectContext();

    const handleAddProject = () => {
        const id = uuidv4();
        addProject({ id, name: `Project ${projects.length + 1}` });
    };

    return (
        <div className="w-64 bg-gray-100 p-4 border-r border-gray-300 text-black">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Projects</h2>
                <Button size="1" onClick={handleAddProject}>
                    +
                </Button>
            </div>
            <ul className="space-y-1">
                {projects.map((project) => (
                    <ProjectDialog
                        key={project.id}
                        project={project}
                        isActive={project.id === currentProject}
                        toggleProject={() => toggleProject(project.id)}
                    />
                ))}
            </ul>
        </div>
    );
}

export default ProjectMenu;
