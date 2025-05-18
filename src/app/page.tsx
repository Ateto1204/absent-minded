import { ReactFlowProvider } from "@xyflow/react";
import Flow from "@/views/Flow";

export default function Home() {
    return (
        <ReactFlowProvider>
            <main className="w-screen h-screen p-20">
                <Flow />
            </main>
        </ReactFlowProvider>
    );
}
