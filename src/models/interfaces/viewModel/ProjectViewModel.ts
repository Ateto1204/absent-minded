import Project from "@/models/interfaces/project/Project";

interface ProjectViewModel {
    projects: Project[];
    currentProject: Project | null;
    loading: boolean;
    success: boolean;
    error: string | null;
    toggleProject: (id: string) => void;
    addProject: (project: Project) => void;
    updateProjectName: (id: string, name: string) => void;
    deleteProject: (id: string) => void;
    setupRootTask: (id: string) => void;
    inviteParticipant: (projectId: string, email: string) => void;
    removeParticipant: (projectId: string, email: string) => void;
}

export default ProjectViewModel;
