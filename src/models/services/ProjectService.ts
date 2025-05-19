import Project from "@/models/entities/Project";

class ProjectService {
    private static STORAGE_KEY = "projects";

    private static delay<T>(result: T, ms = 300): Promise<T> {
        return new Promise((resolve) => setTimeout(() => resolve(result), ms));
    }

    static async getProjects(): Promise<Project[]> {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        const projects = raw ? (JSON.parse(raw) as Project[]) : [];
        return this.delay(projects);
    }

    static async addProject(project: Project): Promise<void> {
        const projects = await this.getProjects();
        projects.push(project);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
        return this.delay(undefined);
    }

    static async updateProject(updated: Project): Promise<void> {
        let projects = await this.getProjects();
        projects = projects.map((p) => (p.id === updated.id ? updated : p));
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
        return this.delay(undefined);
    }

    static async removeProject(id: string): Promise<void> {
        const projects = await this.getProjects();
        const filtered = projects.filter((p) => p.id !== id);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
        return this.delay(undefined);
    }
}

export default ProjectService;
