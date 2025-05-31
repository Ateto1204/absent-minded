class ChatService {
    static async sendMessage(
        prompt: string,
        serverUri: string,
        accessToken: string
    ): Promise<string> {
        const response = await fetch(`${serverUri}/gpt`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
            body: JSON.stringify({ message: prompt }),
        });

        const contentType = response.headers.get("content-type") || "";
        if (!response.ok) {
            const errText = contentType.includes("application/json")
                ? JSON.stringify(await response.json())
                : await response.text();
            throw new Error(
                `Request failed with status ${response.status}: ${errText}`
            );
        }

        if (contentType.includes("application/json")) {
            const data = await response.json();
            return data.text || JSON.stringify(data);
        }
        return await response.text();
    }
}

export default ChatService;
