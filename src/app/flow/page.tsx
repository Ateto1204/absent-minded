"use client";

import { ReactFlowProvider } from "@xyflow/react";
import { TaskProvider } from "@/context/TaskContext";
import { ProjectProvider } from "@/context/ProjectContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import FlowView from "@/components/flows/FlowView";
import { UserProvider } from "@/context/UserContext";
import { ChatProvider } from "@/context/ChatContext";
import { Callout } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export default function Home() {
    const [mounted, setMounted] = useState(false);
    const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
    const [visible, setVisible] = useState(false);
    const router = useRouter();
useEffect(() => {
    const getToken = async () => {
        let timeoutId: NodeJS.Timeout;

        timeoutId = setTimeout(() => {
            setShowTimeoutMessage(true);
            setVisible(true);

            setTimeout(() => {
                setVisible(false);
                setTimeout(() => {
                    setShowTimeoutMessage(false);
                }, 500);
            }, 10000);
        }, 10000);

        const { data } = await supabase.auth.getSession();
        clearTimeout(timeoutId); 

        const hash = window.location.hash;
        const match = hash.match(/access_token=([^&]*)/);
        if (!data.session && !match) router.push("/login");
    };

    getToken();
    setMounted(true);
}, [router]);

    return (
        <div style={{ position: "relative", padding: 24 }}>
            {showTimeoutMessage && (
                <div
                    style={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        zIndex: 1000,
                        transition: "opacity 0.5s ease",
                        opacity: visible ? 1 : 0,
                    }}
                >
                    <Callout.Root style={{ backgroundColor: "#f0f0f0", padding: 16, position: "relative" }}>
                        <Callout.Icon>
                            <InfoCircledIcon />
                        </Callout.Icon>
                        <Callout.Text style={{ color: "#2563eb" }}>
                            伺服器正在重啟，這可能會花費約 3 分鐘，敬請見諒。
                        </Callout.Text>
                        <button
                            onClick={() => {
                                setVisible(false);
                                setTimeout(() => {
                                    setShowTimeoutMessage(false);
                                }, 500);
                            }}
                            style={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                background: "none",
                                border: "none",
                                fontSize: 16,
                                cursor: "pointer",
                            }}
                            aria-label="Close"
                        >
                            ×
                        </button>
                    </Callout.Root>
                </div>
            )}
            <UserProvider>
                <ProjectProvider>
                    <TaskProvider>
                        <ChatProvider>
                            <ReactFlowProvider>
                                {mounted && <FlowView />}
                            </ReactFlowProvider>
                        </ChatProvider>
                    </TaskProvider>
                </ProjectProvider>
            </UserProvider>
        </div>
    );
}
