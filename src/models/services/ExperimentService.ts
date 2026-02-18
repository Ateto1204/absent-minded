import ChatSuggestMode from "@/models/type/ChatSuggestMode";

interface SuggestionPresentedLog {
    event: "suggestionPresented";
    projectId?: string;
    comparisonId: string;
    timestamp: string;
    optionAMode: ChatSuggestMode;
    optionBMode: ChatSuggestMode;
}

interface SuggestionSelectedLog {
    event: "suggestionSelected";
    projectId?: string;
    comparisonId: string;
    optionId: "A" | "B";
    selectedMode: ChatSuggestMode;
    timestamp: string;
}

class ExperimentService {
    private static STORAGE_KEY = "aminded-experiment-choice-log";

    private static appendLog(log: SuggestionPresentedLog | SuggestionSelectedLog): void {
        if (typeof window === "undefined") return;
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            const logs = raw
                ? (JSON.parse(raw) as Array<SuggestionPresentedLog | SuggestionSelectedLog>)
                : [];
            logs.push(log);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(logs));
        } catch (error) {
            console.error("Failed to record experiment choice", error);
        }
    }

    static recordSuggestionPresented(log: Omit<SuggestionPresentedLog, "event">): void {
        this.appendLog({ event: "suggestionPresented", ...log });
    }

    static recordSuggestionSelected(log: Omit<SuggestionSelectedLog, "event">): void {
        this.appendLog({ event: "suggestionSelected", ...log });
    }
}

export default ExperimentService;
