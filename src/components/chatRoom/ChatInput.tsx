import { useChatContext } from "@/context/ChatContext";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { useState } from "react";

const ChatInput = () => {
    const { sendMessage, loading } = useChatContext();
    const [input, setInput] = useState("");

    const handleSendMessage = () => {
        const prompt = input;
        setInput("");
        sendMessage(prompt);
    };

    return (
        <Flex gap="2" p="3" className="border-t bg-white">
            <TextField.Root
                disabled={loading}
                className="flex-1"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                }}
            />
            <Button disabled={loading} onClick={handleSendMessage}>
                Send
            </Button>
        </Flex>
    );
};

export default ChatInput;
