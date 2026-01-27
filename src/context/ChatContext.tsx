"use client";

import useChatViewModel from "@/hooks/useChatViewModel";
import ChatViewModel from "@/models/interfaces/viewModel/ChatViewModel";
import { createContext, useContext, ReactNode } from "react";
import { useProjectContext } from "@/context/ProjectContext";

const ChatContext = createContext<ChatViewModel | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
    const { currentProject } = useProjectContext();

    // ✅ 把目前選到的 projectId 傳進去
    const chatViewModel = useChatViewModel(currentProject?.id);

    return (
        <ChatContext.Provider value={chatViewModel}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChatContext(): ChatViewModel {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error("useChatContext must be used within a ChatProvider");
    }
    return context;
}
