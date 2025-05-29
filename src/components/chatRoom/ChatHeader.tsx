import { Button } from "@radix-ui/themes";

const ChatHeader = ({ onClose }: { onClose: () => void }) => (
    <div className="flex items-center justify-between px-4 py-2 border-b">
        <span className="font-medium">Absent‑Minded GPT</span>
        <Button color="gray" size="1" onClick={onClose}>
            ✕
        </Button>
    </div>
);

export default ChatHeader;
