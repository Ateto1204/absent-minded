import { useProjectContext } from "@/context/ProjectContext";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";

interface ProjectInviteDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    projectId: string;
    participants: string[];
}

function ProjectInviteDialog({
    open,
    setOpen,
    projectId,
    participants,
}: ProjectInviteDialogProps) {
    const { inviteParticipant } = useProjectContext();
    const [inviteEmail, setInviteEmail] = useState("");

    const handleInvite = () => {
        inviteParticipant(projectId, inviteEmail);
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Content>
                <Dialog.Title>
                    <Flex justify="between">
                        <Text>Invite Member</Text>
                        <Dialog.Close>
                            <Text size="4" className="cursor-pointer">
                                x
                            </Text>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Title>
                <Flex direction="column" gap="2">
                    <Text weight="bold">Current Members</Text>
                    {participants.length === 0 ? (
                        <Text size="2" color="gray">
                            No members yet
                        </Text>
                    ) : (
                        participants.map((p) => (
                            <Text key={p} size="2">
                                {p}
                            </Text>
                        ))
                    )}
                </Flex>
                <Flex gapX="2" my="5">
                    <Dialog.Description>
                        <Text className="relative pt-0.5">email :</Text>
                    </Dialog.Description>
                    <TextField.Root
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="example@mail.com"
                    />
                </Flex>
                <Flex align="center" gap="2" mt="4">
                    <Dialog.Close>
                        <Button variant="ghost">Cancel</Button>
                    </Dialog.Close>
                    <Button color="blue" variant="solid" onClick={handleInvite}>
                        Invite
                    </Button>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
}

export default ProjectInviteDialog;
