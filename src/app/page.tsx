"use client";

import { ReactFlowProvider } from "@xyflow/react";
import Flow from "@/views/Flow";
import { NodeSelectionProvider } from "@/context/NodeSelectionContext";
import { TaskProvider } from "@/context/TaskContext";
import { ProjectProvider } from "@/context/ProjectContext";
import ProjectMenu from "@/views/ProjectMenu";

export default function Home() {
    return (
        <ProjectProvider>
            <TaskProvider>
                <NodeSelectionProvider>
                    <ReactFlowProvider>
                        <main className="w-screen h-screen flex">
                            <ProjectMenu />
                            <div className="flex-1 p-6">
                                <Flow />
                            </div>
                        </main>
                    </ReactFlowProvider>
                </NodeSelectionProvider>
            </TaskProvider>
        </ProjectProvider>
    );
}
