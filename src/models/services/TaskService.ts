import Task from "@/models/interfaces/task/Task";

class TaskService {
    private static STORAGE_KEY = "tasks";

    private static getLocal(): Task[] {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        return raw ? (JSON.parse(raw) as Task[]) : [];
    }
    private static setLocal(tasks: Task[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    }

    private static async request<T>(
        url: string,
        options: RequestInit & { accessToken: string }
    ): Promise<T> {
        const { accessToken, ...init } = options;
        const res = await fetch(url, {
            ...init,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                ...init.headers,
            },
        });
        if (!res.ok)
            throw new Error(`Request failed with status ${res.status}`);
        return res.status === 204
            ? (undefined as T)
            : ((await res.json()) as T);
    }

    static async getTasksByUser(
        accessToken: string,
        uri: string
    ): Promise<Task[]> {
        try {
            return await this.request<Task[]>(`${uri}/api/tasks`, {
                method: "GET",
                accessToken,
            });
        } catch (err) {
            console.error("GET /tasks 失敗，使用 local:", err);
            return this.getLocal();
        }
    }

    static async getTasksByProject(
        projectId: string,
        accessToken: string,
        uri: string
    ): Promise<Task[]> {
        try {
            return await this.request<Task[]>(
                `${uri}/api/tasks/project/${projectId}`,
                { method: "GET", accessToken }
            );
        } catch (err) {
            console.error("GET /tasks/project 失敗，使用 local:", err);
            return this.getLocal().filter((t) => t.project === projectId);
        }
    }

    static async addTasks(
        tasks: Task[],
        accessToken: string,
        uri: string
    ): Promise<void> {
        try {
            await this.request<void>(`${uri}/api/tasks`, {
                method: "POST",
                body: JSON.stringify(tasks),
                accessToken,
            });
        } catch (err) {
            console.error("POST /tasks 失敗，寫入 local:", err);
            const all = this.getLocal();
            this.setLocal([...all, ...tasks]);
        }
    }

    static async updateTasks(
        tasks: Task[],
        accessToken: string,
        uri: string
    ): Promise<void> {
        try {
            await this.request<void>(`${uri}/api/tasks`, {
                method: "PUT",
                body: JSON.stringify(tasks),
                accessToken,
            });
        } catch (err) {
            console.error("PUT /tasks 失敗，更新 local:", err);
            const merged = this.getLocal().map((t) => {
                const u = tasks.find((x) => x.id === t.id);
                return u ?? t;
            });
            this.setLocal(merged);
        }
    }

    static async removeTasks(
        ids: string[],
        accessToken: string,
        uri: string
    ): Promise<void> {
        try {
            await this.request<void>(`${uri}/api/tasks`, {
                method: "DELETE",
                body: JSON.stringify(ids),
                accessToken,
            });
        } catch (err) {
            console.error("DELETE /tasks 失敗，更新 local:", err);
            const remaining = this.getLocal().filter(
                (t) => !ids.includes(t.id)
            );
            this.setLocal(remaining);
        }
    }
}

export default TaskService;
