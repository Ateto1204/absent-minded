import { ReactFlowProvider } from "@xyflow/react";
import Flow from "@/views/Flow";
import { NodeSelectionProvider } from "@/context/NodeSelectionContext";

export default function Home() {
    return (
        <NodeSelectionProvider>
            <ReactFlowProvider>
                <main className="w-screen h-screen p-20">
                    <Flow />
                </main>
            </ReactFlowProvider>
        </NodeSelectionProvider>
    );
}
