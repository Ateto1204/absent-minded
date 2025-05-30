import MsgSender from "@/models/enums/MsgSender";

interface Message {
    text: string;
    sender: MsgSender;
}

export default Message;
