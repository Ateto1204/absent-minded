import { Button } from "@radix-ui/themes";
import { useState } from "react";
import ChatRoom from "./ChatRoom";
import { useUserContext } from "@/context/UserContext";

const ChatTaskGenerator = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<
        { text: string; sender: "user" | "bot" }[]
    >([{ text: "Hello! What do you want to do?", sender: "bot" }]);
    const [input, setInput] = useState("");
    const { serverUri } = useUserContext();

    const handleSend = async () => {
        if (input.trim() === "") return;
        const userMessage = input;
        setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
        setInput("");
        setMessages((prev) => [
            ...prev,
            { text: "Thinking...", sender: "bot" },
        ]);
        try {
            const response = await fetch(`${serverUri}/gpt`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage }),
            });
            let botText = "";
            const contentType = response.headers.get("content-type") || "";
            if (contentType.includes("application/json")) {
                const data = await response.json();
                botText = data.text || JSON.stringify(data);
            } else {
                botText = await response.text();
            }
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
                <ChatRoom
                    messages={messages}
                    input={input}
                    onInputChange={setInput}
                    onSend={handleSend}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
};

export default ChatTaskGenerator;
