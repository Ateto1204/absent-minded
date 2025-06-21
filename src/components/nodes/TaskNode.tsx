import React, { memo } from "react";
import { Dialog } from "@radix-ui/themes";
import TaskDialog from "@/components/dialogs/TaskDialog";
import TaskData from "@/models/interfaces/task/TaskData";
import TaskPreview from "@/components/task/TaskPreview";
import TaskDeleteDialog from "@/components/buttons/TaskDeleteDialog";

function TaskNode({ id, data }: { id: string; data: TaskData }) {
    return (
        <div className="relative">
            <Dialog.Root>
                <TaskPreview id={id} data={data} />
                <TaskDialog id={id} data={data} />
            </Dialog.Root>
            <TaskDeleteDialog taskId={id} />
        </div>
    );
}

export default memo(TaskNode);
