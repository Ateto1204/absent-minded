import {
    AlertDialog,
    Button,
    Dialog,
    Flex,
    Text,
    TextField,
} from "@radix-ui/themes";
import DeleteDialog from "@/components/dialogs/DeleteDialog";
import ProjectType from "@/models/type/ProjectType";

interface ProjectEditDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    project: ProjectType;
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
