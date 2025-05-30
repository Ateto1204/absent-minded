import { useUserContext } from "@/context/UserContext";
import MsgSender from "@/models/enums/MsgSender";
import Message from "@/models/interfaces/message/Message";
import ChatViewModel from "@/models/interfaces/viewModel/ChatViewModel";
import { useState } from "react";

const useChatViewModel = (): ChatViewModel => {
    const defaultMsg: Message[] = [
        {
            text: "Hello! What do you want to do?",
            sender: MsgSender.Gpt,
        },
    ];
    const [messages, setMessages] = useState<Message[]>(defaultMsg);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { serverUri } = useUserContext();

    const sendMessage = async (prompt: string) => {
        setLoading(true);
        setSuccess(false);
        const userMessage: Message = {
            text: prompt,
            sender: MsgSender.User,
        };
        const awaitMessage: Message = {
            text: "Thinking...",
            sender: MsgSender.Gpt,
        };
        setMessages((prev) => [...prev, userMessage, awaitMessage]);
        try {
            const response = await fetch(`${serverUri}/gpt`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: prompt }),
            });
            let botText = "";
            const contentType = response.headers.get("content-type") || "";
            if (contentType.includes("application/json")) {
                const data = await response.json();
                botText = data.text || JSON.stringify(data);
            } else {
                botText = await response.text();
            }
            setSuccess(true);
            setMessages((prev) => {
                const index = [...prev]
                    .reverse()
                    .findIndex(
                        (m) =>
                            m.sender === MsgSender.Gpt &&
                            m.text === "Thinking..."
                    );
                if (index === -1) return prev;
                const realIndex = prev.length - 1 - index;
                const newMessages = [...prev];
                newMessages[realIndex] = {
                    text: botText,
                    sender: MsgSender.Gpt,
                };
                return newMessages;
            });
        } catch (e) {
            setMessages((prev) => {
                const index = [...prev]
                    .reverse()
                    .findIndex(
                        (m) =>
                            m.sender === MsgSender.Gpt &&
                            m.text === "Thinking..."
                    );
                if (index === -1)
                    return [
                        ...prev,
                        {
                            text: `[${e}]
                            Oops! Something went wrong, please check with the steps: \n
                            1. Open the user console
                            2. Check the server URI is correct
                            3. Check your server is accessible
                            `,
                            sender: MsgSender.Gpt,
                        },
                    ];
                const realIndex = prev.length - 1 - index;
                const newMessages = [...prev];
                newMessages[realIndex] = {
                    text: `[${e}]
                            Oops! Something went wrong, please check with the steps: \n
                            1. Open the user console
                            2. Check the server URI is correct
                            3. Check your server is accessible
                            `,
                    sender: MsgSender.Gpt,
                };
                return newMessages;
            });
        } finally {
            setLoading(false);
        }
    };

    return { messages, loading, success, sendMessage };
};

export default useChatViewModel;
