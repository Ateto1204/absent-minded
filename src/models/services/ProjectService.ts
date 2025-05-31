import Project from "@/models/interfaces/project/Project";

class ProjectService {
    private static STORAGE_KEY = "projects";

    private static getLocal(): Project[] {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        return raw ? (JSON.parse(raw) as Project[]) : [];
    }

    private static setLocal(projects: Project[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
    }

    private static async request<T>(
        url: string,
        options: RequestInit & { accessToken: string }
    ): Promise<T> {
        const { accessToken, ...init } = options;
        const response = await fetch(url, {
            ...init,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                ...init.headers,
            },
        });
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        return response.status === 204
            ? (undefined as T)
            : ((await response.json()) as T);
    }

    static async getProjectsByUserId(
        accessToken: string,
        uri: string
    ): Promise<Project[]> {
        try {
            return await this.request<Project[]>(`${uri}/api/projects`, {
                method: "GET",
                accessToken,
            });
        } catch (err) {
            console.error(
                "Failed to fetch projects from API, fallback to local data:",
                err
            );
            return this.getLocal();
        }
    }

    static async addProject(
        project: Project,
        accessToken: string,
        uri: string
    ): Promise<void> {
        try {
            await this.request<Project>(`${uri}/api/projects`, {
                method: "POST",
                body: JSON.stringify(project),
                accessToken,
            });
        } catch (err) {
            console.error("Failed to add project to API, saving locally:", err);
            const projects = this.getLocal();
            projects.push(project);
            this.setLocal(projects);
        }
    }

    static async updateProject(
        updated: Project,
        accessToken: string,
        uri: string
    ): Promise<void> {
        try {
            await this.request<Project>(`${uri}/api/projects/${updated.id}`, {
                method: "PUT",
                body: JSON.stringify(updated),
                accessToken,
            });
        } catch (err) {
            console.error(
                "Failed to update project on API, updating local copy:",
                err
            );
            const projects = this.getLocal().map((p) =>
                p.id === updated.id ? updated : p
            );
            this.setLocal(projects);
        }
    }

    static async removeProject(
        id: string,
        accessToken: string,
        uri: string
    ): Promise<void> {
        try {
            await this.request<void>(`${uri}/api/projects/${id}`, {
                method: "DELETE",
                accessToken,
            });
        } catch (err) {
            console.error(
                "Failed to delete project on API, removing local copy:",
                err
            );
            const projects = this.getLocal().filter((p) => p.id !== id);
            this.setLocal(projects);
        }
    }
}

export default ProjectService;
