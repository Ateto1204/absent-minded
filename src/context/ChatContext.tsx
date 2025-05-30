"use client";

import useChatViewModel from "@/hooks/useChatViewModel";
import ChatViewModel from "@/models/interfaces/viewModel/ChatViewModel";
import { createContext, useContext, ReactNode } from "react";

const ChatContext = createContext<ChatViewModel | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
    const ChatViewModel = useChatViewModel();
    return (
        <ChatContext.Provider value={ChatViewModel}>
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
