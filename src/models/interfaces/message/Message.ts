import MsgSender from "@/models/enums/MsgSender";

interface Message {
    text: string;
    sender: MsgSender;
    suggestedParentId?: string | null;
}

export default Message;
