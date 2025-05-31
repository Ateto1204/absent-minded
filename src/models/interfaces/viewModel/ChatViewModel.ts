import Message from "@/models/interfaces/message/Message";

interface ChatViewModel {
    messages: Message[];
    loading: boolean;
    success: boolean;
    error: string | null;
    sendMessage: (msg: string) => void;
}

export default ChatViewModel;
