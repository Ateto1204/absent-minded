import { useTaskContext } from "@/context/TaskContext";
import { AlertDialog, Tooltip } from "@radix-ui/themes";
import { TiDelete } from "react-icons/ti";
import DeleteDialog from "@/components/dialogs/DeleteDialog";

const TaskDeleteDialog = ({ taskId }: { taskId: string }) => {
    const { loading } = useTaskContext();
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <button
                    onClick={(e) => e.stopPropagation()}
                    className="absolute -top-1.5 -right-1.5 cursor-pointer rounded-full hover:opacity-70 p-0"
                    disabled={loading}
                >
                    <Tooltip content="Remove task">
                        <TiDelete color="gray" />
                    </Tooltip>
                </button>
            </AlertDialog.Trigger>
            <DeleteDialog id={taskId} type="task" />
        </AlertDialog.Root>
    );
};

export default TaskDeleteDialog;
