import Message from "@/models/interfaces/message/Message";

interface ChatViewModel {
    messages: Message[];
    loading: boolean;
    success: boolean;
    sendMessage: (msg: string) => void;
}

export default ChatViewModel;
