"use client";

import { ReactFlowProvider } from "@xyflow/react";
import Flow from "@/views/Flow";
import { NodeSelectionProvider } from "@/context/NodeSelectionContext";
import { TaskProvider } from "@/context/TaskContext";
import { ProjectProvider } from "@/context/ProjectContext";
import ProjectMenu from "@/views/ProjectMenu";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./lib/supabase";

export default function Home() {
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const getToken = async () => {
            const { data } = await supabase.auth.getSession();
            const hash = window.location.hash;
            const match = hash.match(/access_token=([^&]*)/);
            if (data.session) {
                console.log(
                    "🔐 Token from session:",
                    data.session.access_token
                );
            } else if (match) {
                console.log("🔐 Token from hash:", match[1]);
            } else {
                router.push("/login");
            }
        };
        getToken();
        setMounted(true);
    }, [router]);

    return (
        <ProjectProvider>
            <TaskProvider>
                <NodeSelectionProvider>
                    <ReactFlowProvider>
                        {mounted && (
                            <main className="w-screen h-screen flex">
                                <ProjectMenu />
                                <div className="flex-1 p-6">
                                    <Flow />
                                </div>
                            </main>
                        )}
                    </ReactFlowProvider>
                </NodeSelectionProvider>
            </TaskProvider>
        </ProjectProvider>
    );
}
