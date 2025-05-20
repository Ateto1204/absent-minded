import { useTaskContext } from "@/context/TaskContext";
import { Dialog, HoverCard } from "@radix-ui/themes";
import { Handle, Position } from "@xyflow/react";

const TaskNodeView = ({ label }: { label: string }) => {
    const { loading } = useTaskContext();

    return (
        <HoverCard.Trigger>
            <Dialog.Trigger disabled={loading}>
                <div
                    className={`relative px-4 py-2 shadow-md rounded-md bg-white border-2 text-gray-700 ${
                        loading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                >
                    <div className="max-w-32 overflow-hidden whitespace-nowrap truncate">
                        {label}
                    </div>
                    <Handle
                        id="left"
                        type="target"
                        isConnectableStart={false}
                        position={Position.Left}
                        className="rounded-none h-5 border-0 !bg-gray-400"
                    />
                    <Handle
                        id="right"
                        type="source"
                        isConnectableStart={false}
                        position={Position.Right}
                        className="rounded-none h-5 border-0 !bg-gray-400"
                    />
                </div>
            </Dialog.Trigger>
        </HoverCard.Trigger>
    );
};

export default TaskNodeView;
