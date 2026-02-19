import MsgSender from "@/models/enums/MsgSender";

export interface SuggestionOption {
    id: "A" | "B";
    parentId: string | null;
    depth: number;
    confidence: number;
    explanation: string;
}

interface Message {
    id: string;
    text: string;
    sender: MsgSender;
    suggestedParentId?: string | null;
    comparisonId?: string;
    suggestionOptions?: SuggestionOption[];
    selectedOptionId?: "A" | "B";
}

export default Message;
