"use client";

import { ReactFlowProvider } from "@xyflow/react";
import { NodeSelectionProvider } from "@/context/NodeSelectionContext";
import { TaskProvider } from "@/context/TaskContext";
import { ProjectProvider } from "@/context/ProjectContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import FlowView from "@/components/views/FlowView";

export default function Home() {
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const getToken = async () => {
            const { data } = await supabase.auth.getSession();
            const hash = window.location.hash;
            const match = hash.match(/access_token=([^&]*)/);
            if (!data.session && !match) router.push("/login");
        };
        getToken();
        setMounted(true);
    }, [router]);

    return (
        <ProjectProvider>
            <TaskProvider>
                <NodeSelectionProvider>
                    <ReactFlowProvider>
                        {mounted && <FlowView />}
                    </ReactFlowProvider>
                </NodeSelectionProvider>
            </TaskProvider>
        </ProjectProvider>
    );
}
