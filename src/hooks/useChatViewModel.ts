import { useUserContext } from "@/context/UserContext";
import MsgSender from "@/models/enums/MsgSender";
import Message from "@/models/interfaces/message/Message";
import ChatViewModel from "@/models/interfaces/viewModel/ChatViewModel";
import ChatService from "@/models/services/ChatService";
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
    const [error, setError] = useState<string | null>(null);
    const { serverUri, accessToken } = useUserContext();

    const sendMessage = async (prompt: string) => {
        setLoading(true);
        setSuccess(false);
        setError(null);
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
            const botText = await ChatService.sendMessage(
                prompt,
                serverUri,
                accessToken
            );
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            const errMsg = `[${e}]
                            Oops! Something went wrong, please check with the steps: \n
                            1. Open the user console
                            2. Check the server URI is correct
                            3. Check your server is accessible
                            `;
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
                            text: errMsg,
                            sender: MsgSender.Gpt,
                        },
                    ];
                const realIndex = prev.length - 1 - index;
                const newMessages = [...prev];
                newMessages[realIndex] = {
                    text: errMsg,
                    sender: MsgSender.Gpt,
                };
                return newMessages;
            });
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return { messages, loading, success, error, sendMessage };
};

export default useChatViewModel;
