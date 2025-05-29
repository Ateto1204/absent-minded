import { DataList } from "@radix-ui/themes";

const MessageBubble = ({
    text,
    sender,
}: {
    text: string;
    sender: "user" | "bot";
}) => {
    let jsonObj = null;
    if (
        sender === "bot" &&
        typeof text === "string" &&
        text.trim().startsWith("{") &&
        text.trim().endsWith("}")
    ) {
        try {
            jsonObj = JSON.parse(text);
        } catch {}
    }
    return (
        <div
            className={`flex items-end ${
                sender === "user" ? "justify-end" : "justify-start"
            } w-full`}
        >
            {jsonObj ? (
                <div className="bg-zinc-900 text-zinc-100 p-4 rounded-xl shadow border border-zinc-800 max-w-[90%]">
                    <DataList.Root>
                        {Object.entries(jsonObj.data).map(([k, v]) => (
                            <DataList.Item key={k} className="py-1">
                                <DataList.Label className="text-zinc-400">
                                    {k}
                                </DataList.Label>
                                <DataList.Value className="text-zinc-100">
                                    {String(v)}
                                </DataList.Value>
                            </DataList.Item>
                        ))}
                    </DataList.Root>
                </div>
            ) : (
                <div
                    className={`px-3 py-2 rounded-2xl shadow max-w-[70%] text-sm leading-snug ${
                        sender === "user"
                            ? "bg-blue-500 text-white rounded-br-none"
                            : "bg-gray-200 text-gray-900 rounded-bl-none"
                    }`}
                >
                    {text}
                </div>
            )}
        </div>
    );
};

export default MessageBubble;
