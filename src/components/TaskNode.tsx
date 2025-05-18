import React, { memo } from "react";
import { Handle, Position, useConnection } from "@xyflow/react";
import { Dialog } from "@radix-ui/themes";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TaskNode({ id, data }: any) {
    const connection = useConnection();
    const isTarget = connection.inProgress && connection.fromNode.id !== id;

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <button>
                    <div
                        className={`relative px-4 py-2 shadow-md rounded-md bg-white border-2 text-gray-700`}
                    >
                        <div className="max-w-44 overflow-hidden whitespace-nowrap truncate">
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
            <Dialog.Content>
                <div className="p-4">
                    <Dialog.Title className="text-lg font-semibold">
                        title: {data.label}
                    </Dialog.Title>
                    <p>ID: {id}</p>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
}

export default memo(TaskNode);
