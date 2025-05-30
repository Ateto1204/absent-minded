import { Flex } from "@radix-ui/themes";
import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList";
import ChatInput from "./ChatInput";

const ChatRoom = ({ onClose }: { onClose: () => void }) => (
    <Flex
        direction="column"
        className="absolute w-[420px] h-[600px] right-8 bottom-8 bg-white rounded-xl shadow-lg z-50 overflow-hidden"
    >
        <ChatHeader onClose={onClose} />
        <MessagesList />
        <ChatInput />
    </Flex>
);

export default ChatRoom;
