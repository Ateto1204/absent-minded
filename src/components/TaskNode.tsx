import React, { memo } from "react";
import { Handle, Position, useConnection } from "@xyflow/react";
import { Dialog, HoverCard, Text } from "@radix-ui/themes";
import { useTaskContext } from "@/context/TaskContext";
import TaskDialog from "./TaskDialog";
import DeleteTaskDialog from "./DeleteTaskDialog";

const DeleteTaskTriggerButton = ({ id }: { id: string }) => {
    const { deleteTask, loading } = useTaskContext();
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <button
                    onClick={(e) => e.stopPropagation()}
                    className="absolute -top-1.5 -right-1.5 text-xs text-gray-500 hover:opacity-70 rounded-full bg-white border border-gray-500 px-1 cursor-pointer"
                    disabled={loading}
                >
                    ×
                </button>
            </Dialog.Trigger>
            <DeleteTaskDialog id={id} handleDelete={() => deleteTask(id)} />
        </Dialog.Root>
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TaskNode({ id, data }: any) {
    const connection = useConnection();
    const isTarget = connection.inProgress && connection.fromNode.id !== id;
    const { deleteTask, loading } = useTaskContext();

    return (
        <div className="relative">
            <Dialog.Root>
                <HoverCard.Root>
                    <HoverCard.Trigger>
                        <Dialog.Trigger disabled={loading}>
                            <div
                                className={`relative px-4 py-2 shadow-md rounded-md bg-white border-2 text-gray-700 ${
                                    loading
                                        ? "cursor-not-allowed"
                                        : "cursor-pointer"
                                }`}
                            >
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
                        </Dialog.Trigger>
                    </HoverCard.Trigger>
                    {data.description !== "" && (
                        <HoverCard.Content>
                            <Text>{data.description}</Text>
                        </HoverCard.Content>
                    )}
                </HoverCard.Root>
                <DeleteTaskTriggerButton id={id} />
                <TaskDialog
                    id={id}
                    data={data}
                    handleDelete={() => deleteTask(id)}
                />
            </Dialog.Root>
        </div>
    );
}

export default memo(TaskNode);
