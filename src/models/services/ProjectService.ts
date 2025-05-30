import Project from "@/models/interfaces/project/Project";

class ProjectService {
    private static STORAGE_KEY = "projects";

    private static delay<T>(result: T, ms = 300): Promise<T> {
        return new Promise((resolve) => setTimeout(() => resolve(result), ms));
    }

    static getAllProjects(): Project[] {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        const projects = raw ? (JSON.parse(raw) as Project[]) : [];
        return projects;
    }

    static async getProjects(user: string): Promise<Project[]> {
        const allProjects = ProjectService.getAllProjects();
        const projects = allProjects.filter((p) => p.user === user);
        return this.delay(projects);
    }

    static async addProject(project: Project): Promise<void> {
        const projects = ProjectService.getAllProjects();
        projects.push(project);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
        return this.delay(undefined);
    }

    static async updateProject(updated: Project): Promise<void> {
        let projects = ProjectService.getAllProjects();
        projects = projects.map((p) => (p.id === updated.id ? updated : p));
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
        return this.delay(undefined);
    }

    static async removeProject(id: string): Promise<void> {
        const projects = ProjectService.getAllProjects();
        const filtered = projects.filter((p) => p.id !== id);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
        return this.delay(undefined);
    }
}

export default ProjectService;
