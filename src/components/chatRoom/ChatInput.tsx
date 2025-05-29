import { Button, TextField } from "@radix-ui/themes";

const ChatInput = ({
    value,
    onChange,
    onSend,
}: {
    value: string;
    onChange: (v: string) => void;
    onSend: () => void;
}) => (
    <div className="flex gap-2 p-3 border-t bg-white">
        <TextField.Root
            className="flex-1"
            placeholder="Type your message..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") onSend();
            }}
        />
        <Button onClick={onSend}>Send</Button>
    </div>
);

export default ChatInput;
