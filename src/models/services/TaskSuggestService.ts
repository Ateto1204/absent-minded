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

export interface DualSuggestResponse {
    aiOnly: {
        parentId: string | null;
        depth: number;
        confidence: number;
        explanation: string;
    };
    hybrid: {
        parentId: string | null;
        depth: number;
        confidence: number;
        explanation: string;
    };
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

    static async suggestTaskLocationBoth(
        serverUri: string,
        accessToken: string,
        req: { projectId: string; task: { label: string; description?: string } }
    ): Promise<DualSuggestResponse> {
        const response = await fetch(`${serverUri}/api/suggestest`, {
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

        return await response.json();  // ✅ 回傳 DualSuggestResponse
    }

}

export default TaskSuggestService;
