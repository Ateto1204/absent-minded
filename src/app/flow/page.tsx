"use client";

import { ReactFlowProvider } from "@xyflow/react";
import { TaskProvider } from "@/context/TaskContext";
import { ProjectProvider } from "@/context/ProjectContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import FlowView from "@/components/views/FlowView";
import { UserProvider } from "@/context/UserContext";

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
        <UserProvider>
            <ProjectProvider>
                <TaskProvider>
                    <ReactFlowProvider>
                        {mounted && <FlowView />}
                    </ReactFlowProvider>
                </TaskProvider>
            </ProjectProvider>
        </UserProvider>
    );
}
