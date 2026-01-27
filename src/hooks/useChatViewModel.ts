import { useUserContext } from "@/context/UserContext";
import MsgSender from "@/models/enums/MsgSender";
import Message from "@/models/interfaces/message/Message";
import ChatViewModel from "@/models/interfaces/viewModel/ChatViewModel";
import ChatService from "@/models/services/ChatService";
import TaskSuggestService from "@/models/services/TaskSuggestService";
import { useState } from "react";

const useChatViewModel = (projectId?: string): ChatViewModel => {
    const defaultMsg: Message[] = [
        { text: "Hello! What do you want to do?", sender: MsgSender.Gpt },
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

        const userMessage: Message = { text: prompt, sender: MsgSender.User };
        const awaitMessage: Message = { text: "Thinking...", sender: MsgSender.Gpt };

        setMessages((prev) => [...prev, userMessage, awaitMessage]);

        try {
            // 1) 打 /api/gpt 取得模型回傳（通常是 JSON 字串）
            const botText = await ChatService.sendMessage(prompt, serverUri, accessToken);

            // 2) 先更新 Thinking... -> botText
            setMessages((prev) => {
                const index = [...prev].reverse().findIndex(
                    (m) => m.sender === MsgSender.Gpt && m.text === "Thinking..."
                );
                if (index === -1) return prev;
                const realIndex = prev.length - 1 - index;
                const newMessages = [...prev];
                newMessages[realIndex] = { text: botText, sender: MsgSender.Gpt };
                return newMessages;
            });

            setSuccess(true);

            // 3) 嘗試把 botText parse 成 {label, description}
            let task: { label?: string; description?: string } | null = null;
            try {
                const parsed = JSON.parse(botText);
                if (parsed && typeof parsed === "object") {
                    task = {
                        label: typeof parsed.label === "string" ? parsed.label : undefined,
                        description:
                            typeof parsed.description === "string" ? parsed.description : undefined,
                    };
                }
            } catch {
                task = null;
            }

            console.log("[debug] projectId =", projectId);
            console.log("[debug] parsed task =", task);


            // 4) 若 parse 成功且有 projectId，就呼叫 /api/suggest 再追加一則「建議」訊息
            if (task?.label && typeof projectId === "string" && projectId.length > 0) {
                console.log("[debug] calling /api/suggest payload", {
                    projectId,
                    task: { label: task.label, description: task.description },
                });

                const sug = await TaskSuggestService.suggestTaskLocation(
                    serverUri,
                    accessToken,
                    {
                        projectId,
                        task: { label: task.label, description: task.description },
                    }
                );

                setMessages((prev) => {
                    const index = [...prev].reverse().findIndex(
                        (m) => m.sender === MsgSender.Gpt && m.text === botText
                    );
                    if (index === -1) return prev;
                    const realIndex = prev.length - 1 - index;
                    const newMessages = [...prev];
                    newMessages[realIndex] = {
                        ...newMessages[realIndex],
                        suggestedParentId: sug.parentId,
                    };
                    return newMessages;
                });

                const sugText =
                    `📌 建議放置位置\n` +
                    `- parentId: ${sug.parentId ?? "(root)"}\n` +
                    `- depth: ${sug.depth}\n` +
                    `- confidence: ${sug.confidence.toFixed(2)}\n\n` +
                    `${sug.explanation}`;

                setMessages((prev) => [...prev, { text: sugText, sender: MsgSender.Gpt }]);
            } else {
                console.log("[debug] skip suggest (missing projectId or task.label)", {
                    projectId,
                    taskLabel: task?.label,
                });
            }
        } catch (e: any) {
            const errMsg = `[${e}]
Oops! Something went wrong, please check:
1. Open the user console
2. Check the server URI is correct
3. Check your server is accessible`;

            setMessages((prev) => {
                const index = [...prev].reverse().findIndex(
                    (m) => m.sender === MsgSender.Gpt && m.text === "Thinking..."
                );
                if (index === -1) return [...prev, { text: errMsg, sender: MsgSender.Gpt }];

                const realIndex = prev.length - 1 - index;
                const newMessages = [...prev];
                newMessages[realIndex] = { text: errMsg, sender: MsgSender.Gpt };
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
