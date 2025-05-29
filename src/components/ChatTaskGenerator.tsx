import { Button, Flex, TextField } from "@radix-ui/themes";
import { useState } from "react";

const MessageBubble = ({
    text,
    sender,
}: {
    text: string;
    sender: "user" | "bot";
}) => (
    <div
        className={`flex items-end ${
            sender === "user" ? "justify-end" : "justify-start"
        } w-full`}
    >
        <div
            className={`px-3 py-2 rounded-2xl shadow max-w-[70%] text-sm leading-snug ${
                sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
            }`}
        >
            {text}
        </div>
    </div>
);

const ChatTaskGenerator = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! What do you want to do?", sender: "bot" },
    ]);
    const [input, setInput] = useState("");

    const handleSend = async () => {
        if (input.trim() === "") return;
        const userMessage = input;
        setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
        setInput("");
        // Add temporary "Thinking..." message
        setMessages((prev) => [
            ...prev,
            { text: "Thinking...", sender: "bot" },
        ]);
        try {
            const server = process.env.NEXT_PUBLIC_SERVER;
            const response = await fetch(`${server}/gpt`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage }),
            });
            let botText = "";
            // Try to parse as text or JSON
            const contentType = response.headers.get("content-type") || "";
            if (contentType.includes("application/json")) {
                const data = await response.json();
                // If response is { text: ... } or similar, fallback to stringify if not
                botText = data.text || JSON.stringify(data);
            } else {
                botText = await response.text();
            }
            // Replace last "Thinking..." message with real response
            setMessages((prev) => {
                const index = [...prev]
                    .reverse()
                    .findIndex(
                        (m) => m.sender === "bot" && m.text === "Thinking..."
                    );
                if (index === -1) return prev;
                const realIndex = prev.length - 1 - index;
                const newMessages = [...prev];
                newMessages[realIndex] = { text: botText, sender: "bot" };
                return newMessages;
            });
        } catch (e) {
            setMessages((prev) => {
                const index = [...prev]
                    .reverse()
                    .findIndex(
                        (m) => m.sender === "bot" && m.text === "Thinking..."
                    );
                if (index === -1)
                    return [
                        ...prev,
                        {
                            text: `Oops! Something went wrong: ${e}`,
                            sender: "bot",
                        },
                    ];
                const realIndex = prev.length - 1 - index;
                const newMessages = [...prev];
                newMessages[realIndex] = {
                    text: `Oops! Something went wrong: ${e}`,
                    sender: "bot",
                };
                return newMessages;
            });
        }
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>gpt +</Button>
            {open && (
                <Flex
                    direction="column"
                    className="absolute w-[420px] h-[600px] right-8 bottom-8 bg-white rounded-xl shadow-lg z-50 overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-2 border-b">
                        <span className="font-medium">Absent‑Minded GPT</span>
                        <Button
                            color="gray"
                            size="1"
                            onClick={() => setOpen(false)}
                        >
                            ✕
                        </Button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-3 space-y-3">
                        {messages.map((msg, idx) => (
                            <MessageBubble
                                key={idx}
                                text={msg.text}
                                sender={msg.sender as "user" | "bot"}
                            />
                        ))}
                    </div>

                    {/* Input */}
                    <div className="flex gap-2 p-3 border-t bg-white">
                        <TextField.Root
                            className="flex-1"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSend();
                            }}
                        />
                        <Button onClick={handleSend}>Send</Button>
                    </div>
                </Flex>
            )}
        </>
    );
};

export default ChatTaskGenerator;
