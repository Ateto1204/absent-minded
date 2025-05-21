import React, { memo } from "react";
import { AlertDialog, Dialog, Text, Tooltip } from "@radix-ui/themes";
import { useTaskContext } from "@/context/TaskContext";
import TaskDialog from "@/components/dialogs/TaskDialog";
import TaskData from "@/models/entities/task/TaskData";
import DeleteDialog from "@/components/dialogs/DeleteDialog";
import TaskPreview from "@/components/task/TaskPreview";

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
                        className="absolute -top-1.5 -right-1.5 text-xs text-gray-500 hover:opacity-70 rounded-full bg-white border border-gray-500 cursor-pointer"
                        disabled={loading}
                    >
                        <Tooltip content="Remove task">
                            <Text size="1" className="px-1">
                                x
                            </Text>
                        </Tooltip>
                    </button>
                </AlertDialog.Trigger>
                <DeleteDialog id={id} type="task" />
            </AlertDialog.Root>
        </div>
    );
}

export default memo(TaskNode);
