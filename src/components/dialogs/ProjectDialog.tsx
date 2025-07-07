import { useState } from "react";
import { useProjectContext } from "@/context/ProjectContext";
import { Button, Tooltip, DropdownMenu, Flex } from "@radix-ui/themes";
import ProjectEditDialog from "@/components/dialogs/ProjectEditDialog";
import ProjectInviteDialog from "@/components/dialogs/ProjectInviteDialog";
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
    const [inviteOpen, setInviteOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        const trimmedName = name.trim() || "Project name";
        updateProjectName(project.id, trimmedName);
        setName(trimmedName);
        setIsEditing(false);
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
                        {project.participants!.length > 0 && (
                            <MdPeople className="relative top-1 opacity-70" />
                        )}
                        {isActive ? (
                            isEditing ? (
                                <>
                                    <input
                                        className="bg-transparent border-b border-gray-400 focus:outline-none focus:border-blue-500"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        onBlur={handleSave}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleSave();
                                                e.currentTarget.blur();
                                            }
                                        }}
                                        autoFocus
                                    />
                                </>
                            ) : (
                                <span
                                    onDoubleClick={(e) => {
                                        e.stopPropagation();
                                        setIsEditing(true);
                                    }}
                                >
                                    {project.name || "Project name"}
                                </span>
                            )
                        ) : (
                            <span
                                onDoubleClick={(e) => {
                                    e.stopPropagation();
                                    toggleProject();
                                }}
                            >
                                {project.name || "Project name"}
                            </span>
                        )}
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
                        setInviteOpen(true);
                    }}
                >
                    Invite
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
            <ProjectInviteDialog
                open={inviteOpen}
                setOpen={setInviteOpen}
                project={project}
            />
        </DropdownMenu.Root>
    );
}

export default ProjectDialog;
