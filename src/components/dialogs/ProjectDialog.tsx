import { useState } from "react";
import { useProjectContext } from "@/context/ProjectContext";
import {
    Button,
    Tooltip,
    DropdownMenu,
    Flex,
    AlertDialog,
} from "@radix-ui/themes";
import ProjectEditDialog from "@/components/dialogs/ProjectEditDialog";
import DeleteDialog from "@/components/dialogs/DeleteDialog";
import { MdPeople } from "react-icons/md";
import Project from "@/models/interfaces/project/Project";

function ProjectDialog({
    project,
    isActive,
    toggleProject,
}: {
    project: Project;
    isActive: boolean;
    toggleProject: () => void;
}) {
    const { updateProjectName, loading } = useProjectContext();
    const [name, setName] = useState(project.name);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleSave = () => {
        updateProjectName(project.id, name);
    };

    return (
        <DropdownMenu.Root>
            <li
                onClick={toggleProject}
                className={`truncate px-2 py-1 rounded cursor-pointer hover:opacity-60 ${
                    isActive && "bg-blue-500 text-white font-medium"
                }`}
            >
                <Flex justify="between" align="center">
                    <Flex gap="2">
                        {project.participants?.length > 0 && (
                            <MdPeople className="relative top-1 opacity-70" />
                        )}
                        <span>{project.name}</span>
                    </Flex>
                    <Tooltip content="Project actions">
                        <DropdownMenu.Trigger>
                            <Button
                                onClick={(e) => e.stopPropagation()}
                                className={`ml-2 text-md px-2 py-0.5 rounded text-white font-bold ${
                                    isActive
                                        ? "hover:bg-blue-700"
                                        : "hover:bg-gray-700"
                                }`}
                                variant="ghost"
                                size="3"
                            >
                                ...
                            </Button>
                        </DropdownMenu.Trigger>
                    </Tooltip>
                </Flex>
            </li>
            <DropdownMenu.Content>
                <DropdownMenu.Item
                    onSelect={(e) => {
                        e.stopPropagation();
                        setEditOpen(true);
                    }}
                >
                    Edit
                </DropdownMenu.Item>
                <DropdownMenu.Item
                    onSelect={(e) => {
                        e.stopPropagation();
                        setDeleteOpen(true);
                    }}
                >
                    Delete
                </DropdownMenu.Item>
            </DropdownMenu.Content>
            <ProjectEditDialog
                open={editOpen}
                setOpen={setEditOpen}
                project={project}
                name={name}
                setName={setName}
                loading={loading}
                onSave={handleSave}
            />
            <AlertDialog.Root open={deleteOpen} onOpenChange={setDeleteOpen}>
                <AlertDialog.Title />
                <AlertDialog.Content>
                    <DeleteDialog id={project.id} type="project" />
                </AlertDialog.Content>
            </AlertDialog.Root>
        </DropdownMenu.Root>
    );
}

export default ProjectDialog;
