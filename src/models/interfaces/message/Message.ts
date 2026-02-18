import MsgSender from "@/models/enums/MsgSender";

interface Message {
    text: string;
    sender: MsgSender;
    suggestedParentId?: string | null;
    suggestHybrid?: {
        parentId: string | null;
        depth: number;
        confidence: number;
        explanation: string;
    };
    suggestAiOnly?: {
        parentId: string | null;
        depth: number;
        confidence: number;
        explanation: string;
    };
}

export default Message;
