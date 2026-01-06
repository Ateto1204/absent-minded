import {
    AlertDialog,
    Button,
    Dialog,
    Flex,
    Text,
    TextField,
} from "@radix-ui/themes";
import DeleteDialog from "@/components/dialogs/DeleteDialog";
import Project from "@/models/interfaces/project/Project";
import { useProjectContext } from "@/context/ProjectContext";
import { useUserContext } from "@/context/UserContext";
import { useState } from "react";

interface ProjectEditDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    project: Project;
    name: string;
    setName: (value: string) => void;
    loading: boolean;
    onSave: () => void;
}

function ProjectEditDialog({
    open,
    setOpen,
    project,
    name,
    setName,
    loading,
    onSave,
}: ProjectEditDialogProps) {
    const { inviteParticipant, removeParticipant, removePendingParticipant } = useProjectContext();
    const { userEmail } = useUserContext();
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteLoading, setInviteLoading] = useState(false);

    const handleInvite = async () => {
        if (!inviteEmail.trim()) return;
        setInviteLoading(true);
        try {
            await inviteParticipant(project.id, inviteEmail);
            setInviteEmail("");
        } catch (error) {
            console.error("Failed to invite participant:", error);
        } finally {
            setInviteLoading(false);
        }
    };

    const handleRemove = (email: string) => {
        // 檢查是否是 pending participant
        if (project.pendingParticipants?.includes(email)) {
            // 如果是 pending，直接從本地狀態移除
            removePendingParticipant(project.id, email);
        } else {
            // 如果是正式成員，調用移除 API
            removeParticipant(project.id, email);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleInvite();
        }
    };
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
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
                    <Dialog.Description>
                        <Text className="relative pt-0.5">name :</Text>
                    </Dialog.Description>
                    <TextField.Root
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Project name"
                    />
                </Flex>
                
                {/* Members Section */}
                <Flex direction="column" gap="3" my="5">
                    <Text weight="bold">Project Members</Text>
                    <Flex direction="column" gap="2">
                        {/* Active Members */}
                        {project.participants?.length === 0 && (!project.pendingParticipants || project.pendingParticipants.length === 0) ? (
                            <Text size="2" color="gray">
                                No members yet
                            </Text>
                        ) : (
                            <>
                                {project.participants?.map((p, i) => (
                                    <Flex key={p} align="center" gap="3">
                                        <Text size="2">
                                            {i + 1}. {p}
                                        </Text>
                                        {project.ownerId === userEmail && (
                                            <Button
                                                size="1"
                                                variant="ghost"
                                                color="red"
                                                onClick={() => handleRemove(p)}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </Flex>
                                ))}
                                
                                {/* Pending Members */}
                                {project.pendingParticipants?.map((p, i) => (
                                    <Flex key={`pending-${p}`} align="center" gap="3">
                                        <Text size="2" color="orange">
                                            {project.participants.length + i + 1}. {p} (pending)
                                        </Text>
                                        {project.ownerId === userEmail && (
                                            <Button
                                                size="1"
                                                variant="ghost"
                                                color="red"
                                                onClick={() => handleRemove(p)}
                                            >
                                                Cancel
                                            </Button>
                                        )}
                                    </Flex>
                                ))}
                            </>
                        )}
                    </Flex>
                    
                    {/* Invite Section */}
                    <Flex gapX="2" align="center">
                        <Text className="relative pt-0.5 whitespace-nowrap">invite :</Text>
                        <TextField.Root
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                            placeholder="example@mail.com"
                            onKeyDown={handleKeyDown}
                            className="flex-1 min-w-0"
                        />
                        <Button 
                            color="blue" 
                            variant="solid" 
                            onClick={handleInvite}
                            loading={inviteLoading}
                            disabled={!inviteEmail.trim() || inviteLoading}
                            size="2"
                        >
                            Invite
                        </Button>
                    </Flex>
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
                            <AlertDialog.Description />
                            <DeleteDialog id={project.id} type="project" />
                        </AlertDialog.Content>
                    </AlertDialog.Root>
                    <Dialog.Close>
                        <Button
                            color="blue"
                            variant="solid"
                            onClick={onSave}
                            loading={loading}
                        >
                            Save
                        </Button>
                    </Dialog.Close>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
}

export default ProjectEditDialog;
