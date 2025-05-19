import React, { memo } from "react";
import { Handle, Position, useConnection } from "@xyflow/react";
import { Dialog } from "@radix-ui/themes";
import { useTaskContext } from "@/context/TaskContext";
import TaskDialog from "./TaskDialog";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TaskNode({ id, data }: any) {
    const connection = useConnection();
    const isTarget = connection.inProgress && connection.fromNode.id !== id;
    const { deleteTask } = useTaskContext();

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <button className="cursor-pointer">
                    <div className="relative px-4 py-2 shadow-md rounded-md bg-white border-2 text-gray-700">
                        <div className="max-w-32 overflow-hidden whitespace-nowrap truncate">
                            {data.label}
                        </div>
                        {!connection.inProgress && (
                            <Handle
                                id="left"
                                type="target"
                                isConnectableStart={false}
                                position={Position.Left}
                                className="rounded-none h-5 border-0 !bg-gray-400"
                            />
                        )}
                        {(!connection.inProgress || isTarget) && (
                            <Handle
                                id="right"
                                type="source"
                                isConnectableStart={false}
                                position={Position.Right}
                                className="rounded-none h-5 border-0 !bg-gray-400"
                            />
                        )}
                    </div>
                </button>
            </Dialog.Trigger>
            <TaskDialog
                id={id}
                data={data}
                handleDelete={() => deleteTask(id)}
            />
        </Dialog.Root>
    );
}

export default memo(TaskNode);
