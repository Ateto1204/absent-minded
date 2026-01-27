export interface SuggestTaskRequest {
    projectId: string;
    task: {
        label: string;
        description?: string;
    };
}

export interface SuggestTaskResponse {
    parentId: string | null;
    depth: number;
    confidence: number;
    explanation: string;
}

class TaskSuggestService {
    static async suggestTaskLocation(
        serverUri: string,
        accessToken: string,
        req: SuggestTaskRequest
    ): Promise<SuggestTaskResponse> {
        const response = await fetch(`${serverUri}/api/suggest`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
            body: JSON.stringify(req),
        });

        const contentType = response.headers.get("content-type") || "";

        if (!response.ok) {
            const errText = contentType.includes("application/json")
                ? JSON.stringify(await response.json())
                : await response.text();
            throw new Error(
                `Suggest failed (${response.status}): ${errText}`
            );
        }

        if (!contentType.includes("application/json")) {
            throw new Error("Unexpected response type");
        }

        return await response.json();
    }
}

export default TaskSuggestService;
