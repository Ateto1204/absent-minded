import React, { memo } from "react";
import { AlertDialog, Dialog, Tooltip } from "@radix-ui/themes";
import { useTaskContext } from "@/context/TaskContext";
import TaskDialog from "@/components/dialogs/TaskDialog";
import TaskData from "@/models/interfaces/task/TaskData";
import DeleteDialog from "@/components/dialogs/DeleteDialog";
import TaskPreview from "@/components/task/TaskPreview";
import { TiDelete } from "react-icons/ti";

function TaskNode({ id, data }: { id: string; data: TaskData }) {
    const { loading } = useTaskContext();

    return (
        <div className="relative">
            <Dialog.Root>
                <TaskPreview id={id} data={data} />
                <TaskDialog id={id} data={data} />
            </Dialog.Root>
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
                <DeleteDialog id={id} type="task" />
            </AlertDialog.Root>
        </div>
    );
}

export default memo(TaskNode);
