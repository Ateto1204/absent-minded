import { Flex } from "@radix-ui/themes";
import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList";
import ChatInput from "./ChatInput";

const ChatRoom = ({
    messages,
    input,
    onInputChange,
    onSend,
    onClose,
}: {
    messages: { text: string; sender: "user" | "bot" }[];
    input: string;
    onInputChange: (v: string) => void;
    onSend: () => void;
    onClose: () => void;
}) => (
    <Flex
        direction="column"
        className="absolute w-[420px] h-[600px] right-8 bottom-8 bg-white rounded-xl shadow-lg z-50 overflow-hidden"
    >
        <ChatHeader onClose={onClose} />
        <MessagesList messages={messages} />
        <ChatInput value={input} onChange={onInputChange} onSend={onSend} />
    </Flex>
);

export default ChatRoom;
