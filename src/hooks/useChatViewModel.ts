import { useUserContext } from "@/context/UserContext";
import MsgSender from "@/models/enums/MsgSender";
import Message, { SuggestionOption } from "@/models/interfaces/message/Message";
import ChatViewModel from "@/models/interfaces/viewModel/ChatViewModel";
import ChatService from "@/models/services/ChatService";
import ExperimentService from "@/models/services/ExperimentService";
import {
    SuggestTaskResponse,
    DualSuggestResponse,
} from "@/models/services/TaskSuggestService";
import TaskSuggestService from "@/models/services/TaskSuggestService";
import ChatSuggestMode from "@/models/type/ChatSuggestMode";
import { useRef, useState } from "react";

interface PendingSuggestionChoice {
    comparisonId: string;
    projectId?: string;
    targetMessageId: string;
    options: Record<
        "A" | "B",
        {
            mode: ChatSuggestMode;
            parentId: string | null;
        }
    >;
}

const makeMessageId = () =>
    `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const toOption = (
    id: "A" | "B",
    suggestion: SuggestTaskResponse
): SuggestionOption => ({
    id,
    parentId: suggestion.parentId,
    depth: suggestion.depth,
    confidence: suggestion.confidence,
    explanation: suggestion.explanation,
});

const useChatViewModel = (projectId?: string): ChatViewModel => {
    const defaultMsg: Message[] = [
        {
            id: makeMessageId(),
            text: "Hello! What do you want to do?",
            sender: MsgSender.Gpt,
        },
    ];

    const [messages, setMessages] = useState<Message[]>(defaultMsg);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const pendingSuggestionsRef = useRef<Record<string, PendingSuggestionChoice>>(
        {}
    );

    const { serverUri, accessToken } = useUserContext();

    const chooseSuggestion = (comparisonId: string, optionId: "A" | "B") => {
        const pending = pendingSuggestionsRef.current[comparisonId];
        if (!pending) return;

        const selected = pending.options[optionId];

        setMessages((prev) =>
            prev.map((message) => {
                if (message.id === pending.targetMessageId) {
                    return {
                        ...message,
                        suggestedParentId: selected.parentId,
                    };
                }
                if (message.comparisonId === comparisonId) {
                    return {
                        ...message,
                        selectedOptionId: optionId,
                    };
                }
                return message;
            })
        );

        ExperimentService.recordSuggestionSelected({
            projectId: pending.projectId,
            comparisonId,
            optionId,
            selectedMode: selected.mode,
            timestamp: new Date().toISOString(),
        });

        delete pendingSuggestionsRef.current[comparisonId];
    };

    const sendMessage = async (prompt: string) => {
        setLoading(true);
        setSuccess(false);
        setError(null);

        const userMessage: Message = {
            id: makeMessageId(),
            text: prompt,
            sender: MsgSender.User,
        };
        const awaitMessage: Message = {
            id: makeMessageId(),
            text: "Thinking...",
            sender: MsgSender.Gpt,
        };

        setMessages((prev) => [...prev, userMessage, awaitMessage]);

        try {
            const botText = await ChatService.sendMessage(
                prompt,
                serverUri,
                accessToken,
                projectId
            );

            setMessages((prev) =>
                prev.map((message) =>
                    message.id === awaitMessage.id
                        ? {
                              ...message,
                              text: botText,
                          }
                        : message
                )
            );

            setSuccess(true);

            let task: { label?: string; description?: string } | null = null;
            try {
                const parsed = JSON.parse(botText);
                if (parsed && typeof parsed === "object") {
                    task = {
                        label:
                            typeof parsed.label === "string"
                                ? parsed.label
                                : undefined,
                        description:
                            typeof parsed.description === "string"
                                ? parsed.description
                                : undefined,
                    };
                }
            } catch {
                task = null;
            }

            if (
                task?.label &&
                typeof projectId === "string" &&
                projectId.length > 0
            ) {
                const sug: DualSuggestResponse =
                    await TaskSuggestService.suggestTaskLocation(
                        serverUri,
                        accessToken,
                        {
                            projectId,
                            task: {
                                label: task.label,
                                description: task.description,
                            },
                        }
                    );

                const comparisonId = makeMessageId();
                const swapped = Math.random() < 0.5;

                const optionA = swapped
                    ? { mode: "aiOnly" as ChatSuggestMode, data: sug.aiOnly }
                    : { mode: "hybrid" as ChatSuggestMode, data: sug.hybrid };
                const optionB = swapped
                    ? { mode: "hybrid" as ChatSuggestMode, data: sug.hybrid }
                    : { mode: "aiOnly" as ChatSuggestMode, data: sug.aiOnly };

                pendingSuggestionsRef.current[comparisonId] = {
                    comparisonId,
                    projectId,
                    targetMessageId: awaitMessage.id,
                    options: {
                        A: {
                            mode: optionA.mode,
                            parentId: optionA.data.parentId,
                        },
                        B: {
                            mode: optionB.mode,
                            parentId: optionB.data.parentId,
                        },
                    },
                };

                ExperimentService.recordSuggestionPresented({
                    projectId,
                    comparisonId,
                    optionAMode: optionA.mode,
                    optionBMode: optionB.mode,
                    timestamp: new Date().toISOString(),
                });

                const compareMessage: Message = {
                    id: makeMessageId(),
                    sender: MsgSender.Gpt,
                    text: "I generated two suggestion options. Please choose one.",
                    comparisonId,
                    suggestionOptions: [
                        toOption("A", optionA.data),
                        toOption("B", optionB.data),
                    ],
                };

                setMessages((prev) => [...prev, compareMessage]);
            }
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : "Unknown error";
            const errMsg = `[${e}]
Oops! Something went wrong, please check:
1. Open the user console
2. Check the server URI is correct
3. Check your server is accessible`;

            setMessages((prev) =>
                prev.map((entry) =>
                    entry.id === awaitMessage.id
                        ? {
                              ...entry,
                              text: errMsg,
                          }
                        : entry
                )
            );

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return {
        messages,
        loading,
        success,
        error,
        sendMessage,
        chooseSuggestion,
    };
};

export default useChatViewModel;
