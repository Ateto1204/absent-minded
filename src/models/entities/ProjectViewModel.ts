import Project from "./Project";

interface ProjectViewModel {
    projects: Project[];
    currentProject: string;
    loading: boolean;
    success: boolean;
    error: string | null;
    toggleProject: (id: string) => void;
    addProject: (project: Project) => void;
    updateProject: (updated: Project) => void;
}

export default ProjectViewModel;
