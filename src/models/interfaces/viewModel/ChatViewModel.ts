import Message from "@/models/interfaces/message/Message";

interface ChatViewModel {
    messages: Message[];
    loading: boolean;
    success: boolean;
    error: string | null;
    sendMessage: (msg: string) => Promise<void>;
    chooseSuggestion: (
        comparisonId: string,
        optionId: "A" | "B"
    ) => void;
}

export default ChatViewModel;
