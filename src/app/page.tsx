import { ReactFlowProvider } from "@xyflow/react";
import Flow from "@/views/Flow";
import { NodeSelectionProvider } from "@/context/NodeSelectionContext";
import { TaskProvider } from "@/context/TaskContext";

export default function Home() {
    return (
        <TaskProvider>
            <NodeSelectionProvider>
                <ReactFlowProvider>
                    <main className="w-screen h-screen p-20">
                        <Flow />
                    </main>
                </ReactFlowProvider>
            </NodeSelectionProvider>
        </TaskProvider>
    );
}
