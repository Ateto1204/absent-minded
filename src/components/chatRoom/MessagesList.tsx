import MessageBubble from "@/components/chatRoom/MessageBubble";
import { useChatContext } from "@/context/ChatContext";

const MessagesList = () => {
    const { messages } = useChatContext();

    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-3 space-y-3">
            {messages.map((msg, idx) => (
                <MessageBubble key={idx} text={msg.text} sender={msg.sender} />
            ))}
        </div>
    );
};

export default MessagesList;
