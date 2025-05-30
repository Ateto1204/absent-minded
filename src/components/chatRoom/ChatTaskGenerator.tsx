import { Button } from "@radix-ui/themes";
import { useState } from "react";
import ChatRoom from "@/components/chatRoom/ChatRoom";

const ChatTaskGenerator = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>gpt +</Button>
            {open && <ChatRoom onClose={() => setOpen(false)} />}
        </>
    );
};

export default ChatTaskGenerator;
